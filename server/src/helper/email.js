const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
     
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

const emailWithNodeMailer = async (emailData)=>{
    try {
        const mailOptions = {
            from: process.env.SMTP_USERNAME, 
            to: emailData.email,
            subject: emailData.subject, 
            html:emailData.html, 
        }
        const info = await transporter.sendMail(mailOptions)
        console.log('Message sent: %s', info.response)
       
    } catch (error) {
        console.error('Error occured while sending email: ', error)
        throw error
    }
   

}

module.exports= emailWithNodeMailer

