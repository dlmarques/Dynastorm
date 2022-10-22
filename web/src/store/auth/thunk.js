import { authActions } from "./auth";

export const logout = (dispatch) => {
  sessionStorage.removeItem("authToken");
  if (!sessionStorage.getItem("authToken")) {
    dispatch(authActions.logout());
  }
};
