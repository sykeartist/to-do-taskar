
const { default: mongoose } = require('mongoose')
const Mongoose= require('mongoose')
const otpSchema= new mongoose.Schema(
    {
     email:{ type: String},
     otp: {type: String},
     status:{type:Number, default:0},
     createdDate: {type:Date, default: Date.now}
    },
    {versionKey: false}
)

const otpModel= mongoose.model("otps", otpSchema)
module.exports= otpModel