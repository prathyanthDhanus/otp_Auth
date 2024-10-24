
const {generateOtpDb,verifyOtpDb} = require("./services/db");

module.exports = {
    //otp generate
     generateOtp : async(req,res)=>{
        const {phoneNumber} = req?.body;
        console.log(phoneNumber)
        const otp = await generateOtpDb(phoneNumber);
        return res.status(200).json({
            status: "success",
            message: "Otp send successfully",
            data: otp,
          });
     },
     //otp verification
     verifyOtp :async(req,res)=>{
        const {otp,phoneNumber} = req.body;
        const otpVerify = await verifyOtpDb(otp,phoneNumber);
        return res.status(200).json({
            status: "success",
            message: "Otp verified successfully",
            data: otpVerify,
          });
     }
}