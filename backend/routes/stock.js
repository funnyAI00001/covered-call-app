const express = require("express");
const router = express.Router();
const axios = require("axios");
const multer = require("multer");
const csv = require("fast-csv");
const moment = require("moment");

const Expiration = require("../models/expiration");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

require("dotenv").config();

router.post("/getCoveredcallPremium", async (req, res) => {
  const { symbols } = req.body;
  const token = process.env.TOKEN || "";
  const expirations = await Expiration.find({});

  const now = moment();
  let closestDate = null;

  // First, find the first suitable date which satisfies the condition
  for (let item of expirations) {
    const date = moment(item.date, "M/D/YYYY");
    const difference = date.diff(now, "days");

    if (difference > 0 && difference > 8) {
      closestDate = item;
      break;
    }
  }

  if (closestDate === null) {
    // If not found proper expiry date
    res.status(400).json({ message: "Not found a proper expiry date!" });

    return;
  }

  // Find the most suitable expiry date
  for (let item of expirations) {
    const date1 = moment(item.date, "M/D/YYYY");
    const difference1 = date1.diff(now, "days");
    const date2 = moment(closestDate.date, "M/D/YYYY");
    const difference2 = date2.diff(now, "days");

    if (difference1 > 0 && difference1 > 8 && difference1 < difference2) {
      closestDate = item;
    }
  }

  const parts = closestDate["date"].split("/");
  const expiration_date = `${parts[2]}-${parts[0].padStart(
    2,
    "0"
  )}-${parts[1].padStart(2, "0")}`;

  // Data to be returned
  const sharePrices = [];
  const ATMs = [];
  const OTM5s = [];
  const OTM10s = [];
  const strikeATMs = [];
  const strikeOTM5s = [];
  const strikeOTM10s = [];
  const ROIs = [];
  const annualROIs = [];
  const OTM5ROIs = [];
  const OTM5annualROIs = [];
  const OTM10ROIs = [];
  const OTM10annualROIs = [];
  // END //

  for (let index = 0; index < symbols.length; index++) {
    const symbol = symbols[index];

    let response = null;

    try {
      response = await axios.get(
        "https://api.marketdata.app/v1/stocks/quotes/" + symbol,
        {
          params: {
            Accept: "application/json",
            token: token,
          },
        }
      );
    } catch (error) {
      console.log("Error occurred while fetching data:", error.message);
      res.status(500).json({ message: "Data not found for symbol" });
      return;
    }

    if (response.data.bid == 0.0) {
      res.status(500).json({ message: "Service not available" });
    }

    sharePrices.push(response.data.bid);

    let daysToExpirationDate = 1;
    const startDate = new Date(expiration_date);
    const current = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = Math.abs(current.getTime() - startDate.getTime());

    // Convert the time difference from milliseconds to days
    daysToExpirationDate = Math.ceil(timeDifference / (1000 * 3600 * 24));

    try {
      const respon = await axios.get(
        `https://api.marketdata.app/v1/options/chain/${symbol}/?expiration=${expiration_date}&side=call&token=${token}`
      );

      if (respon.data.s === "no_data") {
        res.status(400).json({ message: "Error in fetching options chain" });
        return;
      }
      const sharePrice = response.data.bid;
      const strike = respon.data.strike;
      const mid = respon.data.mid;

      let ATMindex = 0,
        OTM5index = 0,
        OTM10index = 0;

      for (let index = 1; index < strike.length; index++) {
        // finding ATM
        const diff1 = Math.abs(sharePrice - strike[ATMindex]);
        const diff2 = Math.abs(sharePrice - strike[index]);

        if (diff2 < diff1 && sharePrice < strike[index]) {
          ATMindex = index;
        }

        const diff3 = Math.abs(sharePrice * 1.05 - strike[OTM5index]);
        const diff4 = Math.abs(sharePrice * 1.05 - strike[index]);

        if (diff4 < diff3) {
          OTM5index = index;
        }

        const diff5 = Math.abs(sharePrice * 1.1 - strike[OTM10index]);
        const diff6 = Math.abs(sharePrice * 1.1 - strike[index]);

        if (diff6 < diff5) {
          OTM10index = index;
        }
      }

      const ATM = mid[ATMindex] * 100;
      const OTM5 = mid[OTM5index] * 100;
      const OTM10 = mid[OTM10index] * 100;
      const strikeATM = strike[ATMindex];
      const strikeOTM5 = strike[OTM5index];
      const strikeOTM10 = strike[OTM10index];
      const ROI = ATM / sharePrice;
      const AnnualROI =
        (Math.pow(1 + ROI / 100, 365 / daysToExpirationDate) - 1) * 100;
      const OTM5ROI = OTM5 / sharePrice;
      const OTM5AnnualROI =
        (Math.pow(1 + OTM5ROI / 100, 365 / daysToExpirationDate) - 1) * 100;
      const OTM10ROI = OTM10 / sharePrice;
      const OTM10AnnualROI =
        (Math.pow(1 + OTM10ROI / 100, 365 / daysToExpirationDate) - 1) * 100;

      ATMs.push(ATM.toFixed(0));
      OTM5s.push(OTM5.toFixed(0));
      OTM10s.push(OTM10.toFixed(0));
      strikeATMs.push(strikeATM);
      strikeOTM5s.push(strikeOTM5);
      strikeOTM10s.push(strikeOTM10);
      ROIs.push(ROI.toFixed(2));
      annualROIs.push(AnnualROI.toFixed(2));
      OTM5ROIs.push(OTM5ROI.toFixed(2));
      OTM5annualROIs.push(OTM5AnnualROI.toFixed(2));
      OTM10ROIs.push(OTM10ROI.toFixed(2));
      OTM10annualROIs.push(OTM10AnnualROI.toFixed(2));
    } catch (err) {
      console.log("Error in fetching options chain " + err.message);
      res.status(400).json({ message: "Error in fetching options chain" });

      return;
    }
  }

  res.json({
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
  });
});

router.get("/getExpirations", async (req, res) => {
  const expirations = await Expiration.find({});

  res.status(200).json({ expirations });
});

router.post(
  "/uploadExpirations",
  upload.single("expirations"),
  async (req, res) => {
    try {
      await Expiration.deleteMany({});
      const csvData = [];
      csv
        .parseString(req.file.buffer.toString(), { headers: true })
        .on("data", (row) => {
          csvData.push({
            date: row.date,
          });
        })
        .on("end", () => {
          // Save data to MongoDB

          Expiration.insertMany(csvData)
            .then(async () => {
              console.log("expirations has been successfully uploaded!");
              const expirations = await Expiration.find({});
              res.status(200).json({ expirations });
            })
            .catch((err) => {
              res.status(500).json({ message: err.message });
            });
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error processing the Excel file" });
    }
  }
);

module.exports = router;
