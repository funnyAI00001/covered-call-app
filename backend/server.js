const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");

require("dotenv").config();
let mongoConnectionUrl = "mongodb://127.0.0.1:27017/stock_app";

if (process.env.NODE_ENV === "production") {
  mongoConnectionUrl =
    "mongodb+srv://ctori0816:QwBaTtsIJcRJLTOM@cluster0.psaminp.mongodb.net/stock_app";
}

mongoose
  .connect(mongoConnectionUrl, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/stock", require("./routes/stock"));

app.use("/images", express.static(path.join(__dirname, "images")));

// Your code
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../frontend", "build", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
console.log(process.env.NODE_ENV);
