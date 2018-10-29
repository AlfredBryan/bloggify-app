var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
 
router.post('/mail', function (req, res) {
 
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secureConnection: false,
        port: 587,
        auth: {
            user: 'bryan.alfred212@gmail.com',
            pass: 'xopaid101'
        }
    });
 
    // setup email data with unicode symbols
    var mailOptions = {
        from: req.body.name,
        to: 'alfred.chimereze@gmail.com',
        subject: 'Query',
        text: req.body.name + '\n' +
            req.body.email + '\n\n' +
            req.body.message
    };
 
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.send(info.responseCode)
    });
});
module.exports = router;