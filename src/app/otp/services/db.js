    const AppError = require("../../../utils/appError");
    const { sendSms } = require("../../../utils/twilio");
    const userModel = require("../../user/model/userModel");
    const otpStore = require("../../../utils/otpStore");
    module.exports = {
    // otp generate
    generateOtpDb: async (phoneNumber) => {
        const isSent = await sendSms(phoneNumber);

        if (isSent) {
        return phoneNumber;
        }
        throw new AppError(
        "Field validation error:Phone number validation failed",
        "Phone number validation failed",
        403
        );
    },
    //otp verification
    verifyOtpDb: async (otp, phoneNumber) => {
        const storedOtpData = otpStore[phoneNumber];
       const verifyOtp = storedOtpData?.otp == otp;
        if (!verifyOtp) {
        throw new AppError(
            "Field validation error:Wrong OTP",
            "Wrong OTP",
            400
        );
        }
        const user = new userModel({
        phoneNumber: phoneNumber,
        });
        await user.save();
    },
    };
