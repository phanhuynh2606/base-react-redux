export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const UPDATE_ACCESS_TOKEN = "UPDATE_ACCESS_TOKEN";
export const UPDATE_USER = "UPDATE_USER";

export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};
export const doLogout = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};
export const updateAccessToken = (access_token, refresh_token) => {
  return {
    type: UPDATE_ACCESS_TOKEN,
    payload: { access_token, refresh_token },
  };
};
export const updateInforProfile = (image,username) => {
  return {
    type: UPDATE_USER,
    payload: { image,username },
  };
};
