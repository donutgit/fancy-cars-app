const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
//apollo
const { ApolloServer } = require("apollo-server-express");
const schema = require("./graphql/schema");
const jwt = require("jsonwebtoken");
const { refreshTokens } = require("./auth");

var app = express();

app.use(bodyParser.json());
app.use(cors());
// DB Config
const uri = require("./config/database").mLabURI;
// Connect to Mongo
mongoose
  .connect(uri)
  .then(() => {
    console.log("mongodb connected"!!);
  })
  .catch(err => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// const passport = require("passport");
// const session = require("express-session");
// app.use(
//   session({
//     secret: "abcdefg",
//     resave: true,
//     saveUninitialized: false
//   })
// );
// require("./config/passport")(passport);
// app.use(passport.initialize());
// app.use(passport.session());
// load passport strategies
// const localSignupStrategy = require("./passport/local-signup");
// const localLoginStrategy = require("./passport/local-login");
// passport.use("local-signup", localSignupStrategy);
// passport.use("local-login", localLoginStrategy);
// pass the authenticaion checker middleware
// const authCheckMiddleware = require("./middleware/auth-check");
// app.use("/api", authCheckMiddleware);
// auth route
// const authRoute = require("./routes/auth");
// app.use("/auth", authRoute);
//----------------passport middleware-----------------

// ---GRAPHQL---
const SECRET = require("./config/jwt").accessTokenSecret;
const SECRET2 = require("./config/jwt").refreshTokenSecret;
const addUser = async (req, res, next) => {
  const token = req.headers["x-token"];
  //VERIFY TOKEN
  if (token) {
    try {
      jwt.verify(token, SECRET, (err, payload) => {
        req.user = payload.id;
      });
    } catch (err) {
      //IF NOT => CREATE NEW TOKENS AND SEND IN RES
      const refreshToken = req.headers["x-refresh-token"];
      const newTokens = await refreshTokens(
        token,
        refreshToken,
        SECRET,
        SECRET2
      );
      if (newTokens.token && newTokens.refreshToken) {
        console.log("-------Sending New Tokens-------");
        res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
        res.set("x-token", newTokens.token);
        res.set("x-refresh-token", newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};
app.use(addUser);
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      user: req.user,
      SECRET,
      SECRET2
    };
  }
});
server.applyMiddleware({ app });

//homepage
// const indexRouter = require("./routes/index");
// app.use("/", indexRouter);

if (process.env.NODE_ENV === "production" || true) {
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
