import { GET_COVEREDCALLPREMIUM } from "../actions/types";

const initialState = {
  sharePrices: [],
  ATMs: [],
  OTM5s: [],
  OTM10s: [],
  strikeATMs: [],
  ROIs: [],
  annualROIs: [],
  OTM5ROIs: [],
  OTM5annualROIs: [],
  OTM10ROIs: [],
  OTM10annualROIs: [],
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
        ROIs,
        annualROIs,
        OTM5ROIs,
        OTM5annualROIs,
        OTM10ROIs,
        OTM10annualROIs,
      } = action.payload;

      return {
        ...state,
        sharePrices: sharePrices,
        ATMs: ATMs,
        OTM5s: OTM5s,
        OTM10s: OTM10s,
        strikeATMs: strikeATMs,
        ROIs: ROIs,
        annualROIs: annualROIs,
        OTM5ROIs: OTM5ROIs,
        OTM5annualROIs: OTM5annualROIs,
        OTM10ROIs: OTM10ROIs,
        OTM10annualROIs: OTM10annualROIs,
      };

    default:
      return state;
  }
};

export default stockReducer;
