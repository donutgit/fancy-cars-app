//Authenticate a user and ave token in local storage
export const authenticateUser = (token, refToken, exp) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("refreshToken", refToken);
  localStorage.setItem("expires_in", exp);
};
//Check if a user is authenticated - check if a token is saved in Local Storage
export const isUserAuthenticated = () => {
  console.log("checking if user auth");
  const token = getAccessToken();
  const refToken = getRefreshToken();
  // const exp = getExpireTime();
  // && Date.now() / 1000 < exp
  if (token && refToken) {
    return true;
  }
  return false;
};

//Deauthenticate a user. Remove a token from Local Storage.
export const deauthenticateUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expires_in");
};
//Get a token value.
export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");
export const getExpireTime = () => localStorage.getItem("expires_in");
