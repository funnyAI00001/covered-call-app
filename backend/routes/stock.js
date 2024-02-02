const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post("/getCoveredcallPremium", async (req, res) => {
  const { symbols } = req.body;

  let currentDate = new Date();
  let formattedDate = null;
  const token = process.env.TOKEN || "";

  // data to be returned
  const sharePrices = [];
  const expiration_date = "2024-02-16";
  const ATMs = [];
  const OTM5s = [];
  const OTM10s = [];
  const strikeATMs = [];
  const ROIs = [];
  const annualROIs = [];
  const OTM5ROIs = [];
  const OTM5annualROIs = [];
  const OTM10ROIs = [];
  const OTM10annualROIs = [];
  //

  for (let index = 0; index < symbols.length; index++) {
    const symbol = symbols[index];

    let attempts = 0;
    let response = null;

    while (attempts < 7) {
      currentDate.setDate(currentDate.getDate() - 1);
      formattedDate = currentDate.toISOString().split("T")[0];

      try {
        response = await axios.get(
          "https://api.polygon.io/v1/open-close/" +
            symbol +
            "/" +
            formattedDate,
          {
            params: {
              adjusted: true,
              apiKey: "cPRbYkKamxX36Bg5ceDmzHmWn5KVLm2k",
            },
          }
        );
        break;
      } catch (error) {
        console.log("Error occurred while fetching data:", error.message);
        attempts++;
      }
    }

    if (attempts === 7 && !response) {
      console.log("Data not found for symbol:", symbol);
      res.status(500).json({ message: "Data not found for symbol: " + symbol });
      return;
    }

    sharePrices.push(response.data.afterHours);
    currentDate.setDate(currentDate.getDate() + 1); // if the request is successful, add date 1 day for the next symbol

    let numOfExpirations = 15;
    const currentYear = new Date().getFullYear();

    // get expiration dates
    await axios
      .get("https://api.marketdata.app/v1/options/expirations/" + symbol)
      .then((res) => {
        const expirations = res.data.expirations;
        numOfExpirations = expirations.filter((item) =>
          item.includes(currentYear)
        ).length;
      })
      .catch((err) => {
        console.log(err.message + "expiration");
        // res.json({ message: "Error in fetching expirations" });
      });

    await axios
      .get(
        `https://api.marketdata.app/v1/options/chain/${symbol}/?expiration=${expiration_date}&side=call&token=${token}`
      )
      .then((res) => {
        const sharePrice = response.data.afterHours;
        const strike = res.data.strike;
        const mid = res.data.mid;

        let ATMindex = 0,
          OTM5index = 0,
          OTM10index = 0;

        for (let index = 1; index < strike.length; index++) {
          // finding ATM
          const diff1 = Math.abs(sharePrice - strike[ATMindex]);
          const diff2 = Math.abs(sharePrice - strike[index]);

          if (diff2 < diff1) {
            ATMindex = index;
          }

          const diff3 = Math.abs(sharePrice * 1.05 - strike[ATMindex]);
          const diff4 = Math.abs(sharePrice * 1.05 - strike[index]);

          if (diff4 < diff3) {
            OTM5index = index;
          }

          const diff5 = Math.abs(sharePrice * 1.1 - strike[ATMindex]);
          const diff6 = Math.abs(sharePrice * 1.1 - strike[index]);

          if (diff6 < diff5) {
            OTM10index = index;
          }
        }

        const ATM = mid[ATMindex] * 100;
        const OTM5 = mid[OTM5index] * 100;
        const OTM10 = mid[OTM10index] * 100;
        const strikeATM = strike[ATMindex];
        const ROI = ATM / sharePrice;
        const AnnualROI =
          (Math.pow(1 + ROI / 100, 365 / numOfExpirations) - 1) *
          100;
        const OTM5ROI = OTM5 / sharePrice;
        const OTM5AnnualROI =
          (Math.pow(1 + OTM5ROI / 100, 365 / numOfExpirations) - 1) *
          100;
        const OTM10ROI = OTM10 / sharePrice;
        const OTM10AnnualROI =
          (Math.pow(1 + OTM10ROI / 100, 365 / numOfExpirations) -
            1) *
          100;

        ATMs.push(ATM.toFixed(0));
        OTM5s.push(OTM5);
        OTM10s.push(OTM10);
        strikeATMs.push(strikeATM);
        ROIs.push(ROI.toFixed(2));
        annualROIs.push(AnnualROI.toFixed(2));
        OTM5ROIs.push(OTM5ROI.toFixed(2));
        OTM5annualROIs.push(OTM5AnnualROI.toFixed(2));
        OTM10ROIs.push(OTM10ROI.toFixed(2));
        OTM10annualROIs.push(OTM10AnnualROI.toFixed(2));
      })
      .catch((err) => {
        console.log("Error in fetching options chain " + err.message);
        res.json({ message: "Error in fetching options chain" });
      });
  }

  res.json({
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
  });
});

module.exports = router;
