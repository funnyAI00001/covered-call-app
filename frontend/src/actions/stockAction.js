import axios from "axios";
import {
  GET_COVEREDCALLPREMIUM,
  SYMBOL_NOT_FOUND_ERROR,
  OPTIONS_NOT_FOUND_ERROR,
  GET_EXPIRATIONS,
} from "./types";
import { backendUrl } from "../config/url";

export const getCoveredCallPremium = (data, callback) => async (dispatch) => {
  try {
    await axios
      .post(backendUrl + "/api/stock/getCoveredcallPremium", data)
      .then((res) => {
        const {
          sharePrices,
          ATMs,
          OTM5s,
          OTM10s,
          strikeATMs,
          ROIs,
          annualROIs,
          OTM5ROIs,
          OTM5annualROIs,
          OTM10ROIs,
          OTM10annualROIs,
          expiration_date,
        } = res.data;

        dispatch({
          type: GET_COVEREDCALLPREMIUM,
          payload: {
            sharePrices,
            ATMs,
            OTM5s,
            OTM10s,
            strikeATMs,
            ROIs,
            annualROIs,
            OTM5ROIs,
            OTM5annualROIs,
            OTM10ROIs,
            OTM10annualROIs,
            expiration_date,
          },
        });

        callback && callback();
      })
      .catch((err) => {
        if (err.response !== undefined) {
          console.log(err.response.data.message);
          if (err.response.data.message === "Data not found for symbol") {
            dispatch({
              type: SYMBOL_NOT_FOUND_ERROR,
              payload: { message: "Ticker entered does not exist" },
            });

            setTimeout(() => {
              dispatch({
                type: SYMBOL_NOT_FOUND_ERROR,
                payload: { message: null },
              });
            }, 3000);
          } else if (
            err.response.data.message === "Error in fetching options chain"
          ) {
            dispatch({
              type: OPTIONS_NOT_FOUND_ERROR,
              payload: { message: "No options available for ticker" },
            });

            setTimeout(() => {
              dispatch({
                type: OPTIONS_NOT_FOUND_ERROR,
                payload: { message: null },
              });
            }, 3000);
          }
        } else {
          console.log("server error");
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const getExpirations = () => async (dispatch) => {
  try {
    const res = await axios.get(backendUrl + "/api/stock/getExpirations");

    dispatch({
      type: GET_EXPIRATIONS,
      payload: { expirations: res.data.expirations },
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadExpirations = (data) => async (dispatch) => {
  axios
    .post(backendUrl + "/api/stock/uploadExpirations", data)
    .then((res) => {
      const { expirations } = res.data;

      dispatch({
        type: GET_EXPIRATIONS,
        payload: { expirations },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
