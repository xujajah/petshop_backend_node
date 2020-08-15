let express = require('express');
let router = express.Router();

require('dotenv').config();
const nodemailer = require("nodemailer");


router.post("/",async function (req,res) {
    let email = req.body.email
    let name = req.body.name
    let subject = req.body.subject
    let message = req.body.message

    // let testAccount =  await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.email, // generated ethereal user
            pass: process.env.pass, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: {
            name: 'BluePaws Contact Form',
            address: 'blue.paws.petshop@gmail.com'
        },
        replyTo: email,
        to: "blue.paws.petshop@gmail.com",
        subject: subject,
        text: message,
    });

    console.log("Message sent: %s", info.messageId);

    //console.log(email,name,subject,message)
    return res.json({status: 1})
})

module.exports = router;
