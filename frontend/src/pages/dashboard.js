import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Typography,
  Box,
  TextField,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import { useSelector, connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

// import CoveredCallPremiumsTable from "../components/stock/coveredCallPremiumsTable";
import CoveredCallReturnsTable from "../components/stock/coveredCallReturnsTable";
import LoadingOverlay from "../components/dialog/loadingOverlay";
import CustomAlert from "../components/customAlert";
import PremiumEncourage from "../components/dialog/premiumEncourage";

import { getCoveredCallPremium } from "../actions/stockAction";
import { getExpirations } from "../actions/stockAction";

const Dashboard = ({
  sharePrices,
  ATMs,
  OTM5s,
  OTM10s,
  ROIs,
  OTM5ROIs,
  OTM10ROIs,
  annualROIs,
  OTM5annualROIs,
  OTM10annualROIs,
  getCoveredCallPremium,
  expiration_date,
  expirations,
  strikeATMs,
  strikeOTM5s,
  strikeOTM10s,
}) => {
  const theme = useTheme();
  const [selectedButton, setSelectedButton] = useState("ATM");
  const [gotFirstResult, setGotFirstResult] = useState(false);
  const [firstCalculate, setFirstCalculate] = useState(false);
  const [selectedROIs, setSelectedROIs] = useState([]);
  const [selectedAnnualROIs, setSelectedAnnualROIs] = useState([]);
  const [premium, setPremium] = useState([]);
  const [strikePrices, setStrikePrices] = useState([]);
  const [openNoExpirationError, setOpenNoExpirationError] = useState(false);
  const [openPremiumDialog, setOpenPremiumDialog] = useState(false);

  const service_error = useSelector((state) => state.stock.service_error);
  const server_error = useSelector((state) => state.stock.server_error);
  const symbol_error = useSelector(
    (state) => state.stock.symbol_not_found_error_message
  );
  const option_error = useSelector(
    (state) => state.stock.options_not_found_error
  );

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  let symbolParam = urlParams.get("symbol");

  if (symbolParam === null) {
    symbolParam = "";
  }

  const [symbols, setSymbols] = useState([symbolParam]);

  useEffect(() => {
    if (ATMs.length > 0) {
      setGotFirstResult(true);
    } else {
      setGotFirstResult(false);
    }
  }, [ATMs]);

  // set tab of the coveredCallReturnstable as ATM whenever calculation result is updated
  useEffect(() => {
    setSelectedROIs(ROIs);
    setSelectedAnnualROIs(annualROIs);
    setPremium(ATMs);
    setStrikePrices(strikeATMs);
    handleButtonClick("ATM"); //eslint-disable-next-line
  }, [ROIs, annualROIs, ATMs, strikeATMs]);

  // add symbols
  const addField = () => {
    if (symbols.length >= 3) {
      setOpenPremiumDialog(true);
      return;
    }

    setSymbols([...symbols, ""]);
  };

  const handleSymbolChange = (e, index) => {
    const input = e.target.value.toUpperCase(); // Convert input text to uppercase
    const onlyUppercase = input.replace(/[^A-Z]/g, ""); // Remove any characters that are not uppercase letters
    const values = [...symbols];
    values[index] = onlyUppercase;
    setSymbols(values);
  };

  const handleCalculate = () => {
    const filteredSymbols = symbols.filter((item) => item !== "");

    setSymbols(filteredSymbols);

    if (expirations.length === 0) {
      setOpenNoExpirationError(true);

      setTimeout(() => {
        setOpenNoExpirationError(false);
      }, 2000);

      return;
    }

    const data = {
      symbols: filteredSymbols,
    };

    setFirstCalculate(true);
    getCoveredCallPremium(data, firstCalculateSuccess);
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);

    switch (buttonName) {
      case "ATM":
        setSelectedROIs(ROIs);
        setSelectedAnnualROIs(annualROIs);
        setStrikePrices(strikeATMs);
        setPremium(ATMs);

        break;

      case "5%OTM":
        setSelectedROIs(OTM5ROIs);
        setSelectedAnnualROIs(OTM5annualROIs);
        setStrikePrices(strikeOTM5s);
        setPremium(OTM5s);

        break;

      case "10%OTM":
        setSelectedROIs(OTM10ROIs);
        setSelectedAnnualROIs(OTM10annualROIs);
        setStrikePrices(strikeOTM10s);
        setPremium(OTM10s);

        break;

      default:
        break;
    }
  };

  const firstCalculateSuccess = () => {
    setFirstCalculate(false);
  };

  const handleDeleteSymbol = (index) => {
    const cutSymbols = [...symbols];
    cutSymbols.splice(index, 1);

    setSymbols(cutSymbols);
  };

  const openPremium = () => {
    setOpenPremiumDialog(true);
  };

  return (
    <div
      sx={{
        background: "white !important",
        "& .MuiButton-root": {
          backgroundColor: theme.palette.text.third,
        },
        "& .MuiButton-root:hover": {
          color: "grey",
        },
      }}
    >
      <Helmet>
        <script key="function" id="facebook-pixel-script">{`
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1316474689231501');
                fbq('track', 'PageView');
            `}</script>
        <noscript key="image" id="facebook-pixel-image">
          {`<img
            height="1"
            width="1"
            style="display:none"
            src="https://www.facebook.com/tr?id=1316474689231501&ev=PageView&noscript=1"
          />`}
        </noscript>
      </Helmet>
      {/* section 1 */}
      <section>
        <Typography variant="h3" color="text.third" textAlign="center" mt={4}>
          {/* COVERD */}
        </Typography>
        <Typography variant="h3" color="text.third" textAlign="center" mx={2}>
          Stock Market Profit Accelerator
        </Typography>

        <Typography
          variant="body1"
          color="white"
          textAlign="center"
          mt={3}
          paddingX={2}
        >
          How much could your stock portfolio earn today by selling covered
          calls?
        </Typography>
        <Typography
          variant="body1"
          color="white"
          textAlign="center"
          paddingX={1}
        >
          Enter your biggest portfolio positions below to see current options
          premiums.{" "}
        </Typography>
        <fieldset
          style={{
            width: "40%",
            margin: "auto",
            borderColor: theme.palette.text.third,
            borderRadius: 5,
            marginTop: "3vh",
          }}
        >
          <Box
            textAlign="center"
            sx={{
              width: "80vw",
              "@media (min-width: 600px)": {
                width: "auto", // Set to auto for screens wider than 600px
              },
            }}
          >
            <Typography variant="body1" color="white" mt={1.5}>
              Enter stock ticker symbol
            </Typography>
            {symbols.map((symbol, index) => (
              <Grid container display="flex" alignItems="center" key={index}>
                <Grid item xs={2} sm={3} textAlign="right">
                  <Typography variant="body1" color="white" paddingRight={1}>
                    {index + 1}
                    {"."}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sm={6}
                  sx={{ "& .MuiInputBase-input": { color: "black" } }}
                >
                  <TextField
                    key={index}
                    value={symbol}
                    autoComplete="off"
                    onChange={(e) => handleSymbolChange(e, index)}
                    variant="outlined"
                    sx={{
                      marginTop: 2,
                      marginBottom: 2,
                      background: "white",
                      borderRadius: "10px",
                    }}
                    inputProps={{
                      autoComplete: "new-email",
                    }}
                    style={{ color: "black !important" }}
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={3}
                  sx={{ paddingRight: { xs: 0, md: 3 } }}
                >
                  {index !== 0 && (
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleDeleteSymbol(index);
                      }}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
            <div>
              <IconButton
                aria-label="add"
                onClick={addField}
                size="large"
                style={{ marginY: 2 }}
              >
                <AddCircleIcon />
              </IconButton>
            </div>
          </Box>
          <Box display="" mx="25%" my="" textAlign="center"></Box>
        </fieldset>
        <Box display="" mx="" my="" textAlign="center">
          <Button
            sx={{
              margin: "auto",
              marginTop: 2,
              backgroundColor: `${theme.palette.text.third} !important`,
              color: "white",
              "&:hover": {
                color: "grey",
              },
            }}
            onClick={handleCalculate}
          >
            Calculate
          </Button>
        </Box>
      </section>

      {/* Section 2 */}
      {gotFirstResult && (
        <section>
          <Box
            display="flex"
            marginTop={3}
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h4"
              color="text.third"
              textAlign="center"
              marginRight={2}
            >
              Assumptions
            </Typography>
            <img
              src="/info.png"
              width={18}
              alt="info"
              onClick={() => openPremium()}
            ></img>
          </Box>
          <fieldset
            style={{
              width: "40%",
              margin: "auto",
              borderColor: theme.palette.text.third,
              borderRadius: 5,
              marginTop: "3vh",
            }}
          >
            <Box
              textAlign="center"
              sx={{
                width: "80vw",
                "@media (min-width: 600px)": {
                  width: "auto", // Set to auto for screens wider than 600px
                },
              }}
            >
              <ul style={{ textAlign: "left", fontSize: 18 }}>
                <li>Selling Covered Calls</li>
                <li>At The Money (ATM)</li>
                <li>5% Out of The Money (5% OTM)</li>
                <li>10% Out of The Money (10% OTM)</li>
                <li>Must hold 100 shares per call option sold</li>
              </ul>
            </Box>
          </fieldset>
          {/* <Typography variant="h4" color="text.third" textAlign="center" mt={6}>
            Covered Call Premiums
          </Typography>

          <CoveredCallPremiumsTable
            symbols={symbols}
            ATMs={ATMs}
            sharePrices={sharePrices}
            OTM5s={OTM5s}
            OTM10s={OTM10s}
            expiration_date={expiration_date}
          /> */}
          <Box
            display="flex"
            justifyContent="center"
            mt={3}
            mb={10}
            sx={{
              "& .MuiButton-root": {
                color: "white",
                borderColor: theme.palette.text.third,
                background: theme.palette.text.third,
              },
              "& .MuiButton-root:hover": {
                color: "grey",
              },
            }}
          >
            <Button
              sx={{
                marginRight: 2,
              }}
              onClick={() => openPremium()}
            >
              Select Expiry Date
            </Button>
            <Button onClick={() => openPremium()}>Adjust % OTM</Button>
          </Box>
        </section>
      )}

      {/* Section 3 */}
      {gotFirstResult && (
        <section>
          <Typography
            variant="h4"
            color="text.third"
            textAlign="center"
            mt={5}
            mb={4}
          >
            Covered Call Premiums and % Returns{" "}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mx={2}
            my={2}
            sx={{
              "& .MuiButton-root": {
                backgroundColor: "transparent",
                color: "white",
                border: `1px solid ${theme.palette.text.third}`,
                paddingY: 0,
                paddingX: 2,
                height: 60,
              },
              "& .selected": {
                backgroundColor: `${theme.palette.text.third} !important`,
              },
            }}
            gap={2}
          >
            <Button
              className={selectedButton === "ATM" ? "selected" : ""}
              onClick={() => handleButtonClick("ATM")}
            >
              ATM <br></br> {""}
            </Button>
            <Button
              className={selectedButton === "5%OTM" ? "selected" : ""}
              onClick={() => handleButtonClick("5%OTM")}
            >
              5% <br /> OTM
            </Button>
            <Button
              className={selectedButton === "10%OTM" ? "selected" : ""}
              onClick={() => handleButtonClick("10%OTM")}
            >
              10% <br /> OTM
            </Button>
            <img
              src="/info.png"
              width={18}
              height={18}
              alt="info"
              onClick={() => openPremium()}
            ></img>
          </Box>
          <CoveredCallReturnsTable
            symbols={symbols}
            ROIs={selectedROIs}
            annualROIs={selectedAnnualROIs}
            premium={premium}
            strikePrices={strikePrices}
          />

          <fieldset
            style={{
              width: "40%",
              margin: "auto",
              borderColor: theme.palette.text.third,
              borderRadius: 5,
              marginTop: "3vh",
            }}
          >
            <Box
              textAlign="left"
              padding={2}
              sx={{
                width: "80vw",
                "@media (min-width: 600px)": {
                  width: "auto", // Set to auto for screens wider than 600px
                },
              }}
            >
              <Typography variant="body1" color="white" textAlign="left">
                Your results:
              </Typography>
              <br></br>
              If you hold 100 shares of{" "}
              <span style={{ color: theme.palette.text.third }}>
                {symbols[0]}
              </span>
              , you can collect{" "}
              <span style={{ color: theme.palette.text.third }}>
                ${ATMs[0]}{" "}
              </span>
              in premium today. To do this, you would sell 1 call option per 100
              shares with{" "}
              <span style={{ color: theme.palette.text.third }}>
                {expiration_date}
              </span>{" "}
              expiry, at{" "}
              <span style={{ color: theme.palette.text.third }}>
                ${strikeATMs[0]}{" "}
              </span>
              strike.
            </Box>
          </fieldset>

          <Box
            sx={{
              textAlign: "center",
              "& .MuiButton-root": {
                backgroundColor: theme.palette.text.third,
                color: "white",
                marginTop: 2,
              },
              "& .MuiButton-root:hover": {
                color: "grey",
              },
            }}
          >
            <Button onClick={() => openPremium()}>Create Shortlist</Button>
            <br></br>
            <Button onClick={() => openPremium()}>Export Table to PDF</Button>
            <br></br>
            <Button onClick={() => setGotFirstResult(false)}>Back</Button>
          </Box>
        </section>
      )}

      {firstCalculate && (
        <LoadingOverlay text="Calculating..." color="success" />
      )}

      {/* Symbol not found error */}
      <CustomAlert
        openState={symbol_error}
        severity="warning"
        text="Ticker entered does not exist"
      />

      {/* Option not found error */}
      <CustomAlert
        openState={option_error}
        severity="warning"
        text="No options available for ticker!"
      />

      {/* Service not available error */}
      <CustomAlert
        openState={service_error}
        severity="warning"
        text="Some tickers will not work on trading holidays. On the paid version, you can plan your trades also on trading holidays!"
      />

      {/* Server error */}
      <CustomAlert
        openState={server_error}
        severity="warning"
        text="Server Error!"
      />

      {/* Expiration not found error */}
      <CustomAlert
        openState={openNoExpirationError}
        severity="warning"
        text="Please upload expiration dates in the expiration page!"
      />

      <PremiumEncourage
        open={openPremiumDialog}
        onClose={() => setOpenPremiumDialog(false)}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getCoveredCallPremium: (data, callback) =>
    dispatch(getCoveredCallPremium(data, callback)),
  getExpirations: () => dispatch(getExpirations()),
});

const mapStateToProps = (state) => ({
  sharePrices: state.stock.sharePrices,
  ATMs: state.stock.ATMs,
  OTM5s: state.stock.OTM5s,
  OTM10s: state.stock.OTM10s,
  strikeATMs: state.stock.strikeATMs,
  strikeOTM5s: state.stock.strikeOTM5s,
  strikeOTM10s: state.stock.strikeOTM10s,
  ROIs: state.stock.ROIs,
  annualROIs: state.stock.annualROIs,
  OTM5ROIs: state.stock.OTM5ROIs,
  OTM5annualROIs: state.stock.OTM5annualROIs,
  OTM10ROIs: state.stock.OTM10ROIs,
  OTM10annualROIs: state.stock.OTM10annualROIs,
  expiration_date: state.stock.expiration_date,
  expirations: state.stock.expirations,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
