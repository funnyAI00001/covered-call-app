import {
  GET_COVEREDCALLPREMIUM,
  OPTIONS_NOT_FOUND_ERROR,
  SYMBOL_NOT_FOUND_ERROR,
  SERVICE_UNAVAILABLE_ERROR,
  GET_EXPIRATIONS,
  SERVER_ERROR,
} from "../actions/types";

const initialState = {
  sharePrices: [],
  ATMs: [],
  OTM5s: [],
  OTM10s: [],
  strikeATMs: [],
  strikeOTM5s: [],
  strikeOTM10s: [],
  ROIs: [],
  annualROIs: [],
  OTM5ROIs: [],
  OTM5annualROIs: [],
  OTM10ROIs: [],
  OTM10annualROIs: [],
  symbol_not_found_error_message: false,
  options_not_found_error: false,
  service_error: false,
  expirations: [],
  expiration_date: "",
  server_error: false,
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COVEREDCALLPREMIUM:
      const {
        sharePrices,
        ATMs,
        OTM5s,
        OTM10s,
        strikeATMs,
        strikeOTM5s,
        strikeOTM10s,
        ROIs,
        annualROIs,
        OTM5ROIs,
        OTM5annualROIs,
        OTM10ROIs,
        OTM10annualROIs,
        expiration_date,
      } = action.payload;

      return {
        ...state,
        sharePrices: sharePrices,
        ATMs: ATMs,
        OTM5s: OTM5s,
        OTM10s: OTM10s,
        strikeATMs: strikeATMs,
        strikeOTM5s: strikeOTM5s,
        strikeOTM10s: strikeOTM10s,
        ROIs: ROIs,
        annualROIs: annualROIs,
        OTM5ROIs: OTM5ROIs,
        OTM5annualROIs: OTM5annualROIs,
        OTM10ROIs: OTM10ROIs,
        OTM10annualROIs: OTM10annualROIs,
        expiration_date: expiration_date,
      };

    case SYMBOL_NOT_FOUND_ERROR:
      return {
        ...state,
        symbol_not_found_error_message: action.payload.message,
      };

    case OPTIONS_NOT_FOUND_ERROR:
      return {
        ...state,
        options_not_found_error: action.payload.message,
      };

    case GET_EXPIRATIONS:
      return {
        ...state,
        expirations: action.payload.expirations,
      };

    case SERVICE_UNAVAILABLE_ERROR:
      return {
        ...state,
        service_error: action.payload.message,
      };

    case SERVER_ERROR:
      return {
        ...state,
        server_error: action.payload.message,
      };

    default:
      return state;
  }
};

export default stockReducer;
