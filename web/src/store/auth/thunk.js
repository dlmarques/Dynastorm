import { authActions } from "./auth";

export const logout = (dispatch) => {
  localStorage.removeItem("authToken");
  if (!localStorage.getItem("authToken")) {
    dispatch(authActions.logout());
  }
};
