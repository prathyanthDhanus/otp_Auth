const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const otpController = require("../otp/controller");

router

.post("/generate",tryCatch(otpController.generateOtp))
.post("/verify",tryCatch(otpController.verifyOtp))

module.exports= router;