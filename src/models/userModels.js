// create start

const mongoose= require("mongoose")
const userSchema= new mongoose.Schema(
    {
        fullName: {type: String}, 
        email: {type: String, required: true, unique: true},
        password: String,
        phone: Number,
        address: String,
        age: Number,
        profilePicture: { type: String},
        createdDate: { type: Date, defualt: Date.now},
    },
    {
        versionKey: false
    }
)


// create end


const usersModel= mongoose. model("users", userSchema)

module.exports= usersModel