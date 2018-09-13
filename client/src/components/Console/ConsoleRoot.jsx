const drawerWidth = 240;

const ConsoleDrawerStyles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: "100vh",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  "appBar-left": {
    marginLeft: drawerWidth
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: "64px",
    overflow: "auto",
    position: "relative"
  },
  drawerContent: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center"
  }
});

export default ConsoleDrawerStyles;