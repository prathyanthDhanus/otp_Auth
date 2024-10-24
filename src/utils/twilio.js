require("dotenv").config(); // Load environment variables from .env

// Twilio client initialization
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const otpStore = require("./otpStore");

module.exports = {
  sendSms: async (phoneNumber, name) => {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP

    try {
      const info = await client.messages.create({
        body: `Hi ${name}, your OTP is: ${otp}.`,
        from: '+17203252821', // Your Twilio number
        to: phoneNumber
      });

      if (info.status.includes("queued")) {
        // Store OTP in memory for validation, with a timeout of 5 minutes (300000 ms)
        otpStore[phoneNumber] = { otp, expiresAt: Date.now() + 300000 };
        setTimeout(() => delete otpStore[phoneNumber], 300000); // Remove OTP after 5 minutes
        console.log(`OTP for ${phoneNumber} is: ${otp}`);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      return false;
    }
  }
};
