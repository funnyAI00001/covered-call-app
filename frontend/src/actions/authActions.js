import axios from "axios";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGIN_FAILURE,
  USER_LOAD,
  LOG_OUT,
} from "./types";
import { backendUrl } from "../config/url";

export const registerUser = (user, history) => async (dispatch) => {
  try {
    await axios.post(backendUrl + "/api/auth/register", user);

    dispatch({
      type: REGISTER_SUCCESS,
    });

    history("/login");
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = (user, history) => (dispatch) => {
  if (user.email === "" || user.password === "") {
    dispatch({
      type: LOGIN_FAILURE,
      payload: { error: "Please fill out all fields!" },
    });

    return;
  }
  axios
    .post(backendUrl + "/api/auth/login", user)
    .then((res) => {
      const { token, user, courts } = res.data;

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, user, courts },
      });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      history("/dashboard");
    })
    .catch((err) => {
      let error = "";

      if (err.response === undefined) {
        // Server error
        error = err.message;
      } else {
        error = err.response.data.message;
      }

      dispatch({
        type: LOGIN_FAILURE,
        payload: { error },
      });
    });
};

export const loadUser = () => (dispatch) => {
  dispatch({
    type: USER_LOAD,
  });
};

export const logOut = (history) => (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });

  history("/login");
};
