const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

const otpRoute = require("./src/app/otp/route")
app.use("/api/otp",otpRoute);



module.exports = app;