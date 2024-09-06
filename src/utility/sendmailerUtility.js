const nodemailer = require('nodemailer')
require('dotenv').config();

const sendEmailerUtility= async(Emailto, EmailSubject, EmailText)=>{

    const transporter= nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:"shamsuddinniloy170@gmail.com",
            pass: " zuwc jdvx iijr qsoi"
        },
    })
    let mailOption={
        from: '" Todo Taskar"<shamsuddinniloy170@gmail.com>',
        to: Emailto,
        subject: EmailSubject,
        text: EmailText,
    }
    return await transporter.sendMail(mailOption)
}

module.exports= sendEmailerUtility