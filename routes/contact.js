let express = require('express');
let router = express.Router();
const nodemailer = require("nodemailer");


router.post("/",async function (req,res) {
    let email = req.body.email
    let name = req.body.name
    let subject = req.body.subject
    let message = req.body.message

    // let testAccount =  await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "gator4219.hostgator.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "jarvis@bitsgroove.com", // generated ethereal user
            pass: "BitsGroove", // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: {
            name: 'Contact Form',
            address: 'jarvis@bitsgroove.com'
        },
        replyTo: email,
        to: "jarvis@bitsgroove.com",
        subject: subject,
        text: message,
    });

    console.log("Message sent: %s", info.messageId);

    //console.log(email,name,subject,message)
    return res.json({status: 1})
})

module.exports = router;
