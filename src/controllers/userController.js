const { Query } = require("mongoose")
const usersModel= require("../models/userModels")
const otpModel= require('../models/otpModel')
const sendEmailUtility= require('../utility/sendmailerUtility')
var jwt= require("jsonwebtoken")



// userCreate

exports.registration= async (req, res)=>{
    try{
        const data= req.body
        console.log("Data received", data)
        // data.email= req.body.email 
        const result= await usersModel.create(data)
        res.status(200).json({
            status:"success",
            massage:" user created successfully", 
            data: result})
    }
    catch(error){
        res. status(200).json({ 
            status:'failed', 
            masssage: error.massage
        })
    }
}
// userCreate end



// login

exports.logIn= async(req, res)=>{
    try{
        const reqBody= req.body
        let user= await usersModel.findOne({
            email: reqBody.email
        })

        if(!user){
            return res.status(200).json ({
                status:'fail', 
                message:'user not found'
            })
        }
        
        if(user.password !== reqBody.password){
            return res.status(200).json({
                status:'failed', 
                message:'wrong password'
            })
        }

        else{

            let payload= {
                exp: Math.floor(Date.now()/100)*(60*60),
                data:user.email
            }

            let token= jwt.sign(payload, "123456789")
            const responsData= {
                email: user.email,
                name: user.name,
                // firstName: user.firstName,
                // lastName: user.lastName,
                photo: user.profilePicture
            }
            res.status(200).json({
                status:'success', 
                data: responsData, token: token
            })

        }
    }

    catch(error){
        res.status(200).json({
            status:'failed', 
            message:error.message
        })
    }
}


// login end

// profileDetails

exports.profileDetails= async (req, res)=>{
    try{
        let email= req.headers.email
        let query={email: email}
        const user= await usersModel.findOne(query)
        res.status(200).json({
            status:'success', 
            data: user, 
        })
    }
    catch(error){
        res.status(200).json({
            status:'failed', 
            message:error.message
        })
    }
}

// profileDetails end


// profile update


exports.profileUpdate= async(req, res)=>{

    try{
        let email= req.headers.email
        let reqBody= req.body
        let query= {email: email}
        const user= await usersModel.updateOne(query, reqBody)
        res.status(200).json ({ 
            status: "success", 
            data: user
        })
    }
    catch(error){
        res.status(200).json({
            status:'failed',
            message: error.message
        })
    }
}


// profile update


// simpleRead

exports.getAllUsers= async(req, res)=>{
    try{
        const query={}
        const project= {
            _id: 0, name:1, email:1, phone:1, age:1, gender:1
        }
        const result= await usersModel.find(query,)

        res.status(200).json ({
            status:'success', 
            message:"users fatched successfully", 
            data: result
        })
    }
    catch(error){
        res. status(200).json ({
            status:'failed', 
            message: error.massage
        })
    }
}

// simpleRead end


// update

exports.upateUser= async (req, res)=>{

    const id= req.params.id
    const updateData= req.body
    const query= {_id:id}

    try{
        const result= await usersModel.updateOne(query, updateData)
        res.status(200).json({
            status:"success", 
            data:result
        })
    }
    catch(error){
        res. status(200).json({
            status:'failed', 
            message:error.message
        })
    }
}

// update end


// delete 

exports.deleteUser= async ( req, res)=>{
    const id= req.params.id
    const query= {_id: id}
    try{
        const result= await usersModel.deleteOne(query)
        res.status(200).json({ 
            status:'success', 
            data: result
        })
    }
    catch(error){
        res.status(200).json({ 
            status:' failed', 
            message: error.message
        })
    }
}

// delete end




// emailverify
exports.emailVerify= async (req, res)=>{
    try{
        let email= req.params.email
        let query= { email: email}
        let otp= Math.floor (100000+Math.random()*900000)
        const user= await usersModel.findOne(query)
        if(!user){
            return res. status(200).json ({status:"fail", message: "user not found"})
        }
        else{
            let createOtp= await otpModel.create({email: email, otp: otp})
            let sendEmail= sendEmailUtility(email, "todo-taskar password verification", `your otp is ${otp}`)
            res.status(200).json({ status: 'success', message: "otp sended successfully"})
        }
    }
    catch(error){
        res.status(200).json({ 
            status:' failed', 
            message: error.message
        })
    }
}
// emailverify end

// otpverify
exports.otpVerify= async (req, res)=>{
    try{
        let email= req.params.email
        let otp= req.params.otp
        let status= 0
        let updateStatus= 1

        let otpCheck= await otpModel.aggregate(
            [
                {$match: {email, otp: otp}},
                {$count: "total"}
            ]
        )
        if(otpCheck.length>0){
            let updateOtp= await otpModel.updateOne(
                { email: email,
                otp: otp,
                status: status},
                {
                    email: email,
                    otp: otp,
                    status: updateStatus
                }
            )
            res.status(200).json({ status: "success", data:"otp verified successfully"})
        }
        else{
            res.status(200).json({status:"failed", data: " invalid"})
        }
    }
    catch(error){
        res.status(400).json({ 
            status:' failed', 
            message: error.message
        })
    }
}
// otpverify end

// resetpassword
exports.resetPassword= async (req, res)=>{
    try{
        let email= req.body.email
        let otp= req.body.otp
        let updatePassword= req.body.password
        let updateStatus=1

        let otpCheck= await otpModel.aggregate([
            {$match:{email, otp:otp, status: updateStatus}},
            {$count: "total"}
        ])
        if(otpCheck.length>0){
            let passwordUpdate= await usersModel.updateOne(
                {email: email},
                {password: updatePassword}
            )
            res.status(200).json({status:"success", data: "password reset sucessfully"})
        }
        else{
            res.status(200).json({ status: "failed", data:"invalid otp"})
        }
    }
    catch(error){
        res.status(200).json({ 
            status:' failed', 
            message: error.message
        })
    }
}
// resetpassword end

