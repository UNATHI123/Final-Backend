const express =require('express');
const app =express.Router();
const nodemailer =require('nodemailer');
require("dotenv").config();
const user =require("./user.Routes")


app.get('/',(req, res)=>{
    res.send({message:"For Contact only POST method accepted"})
})


app.post('/',(req,res)=>{
let  {text ,email,tel,textarea} = req.body;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

const mailOptions = {
  from: user,
  to: 'uqolweni@gmail.com',
  subject: 'New Contact from Portfolio',
  text: `${text} has contacted you 
  
  please contact them back on ${tel} and ${email}
  ${textarea}`
};

transporter.sendMail(mailOptions,(error, info)=>{
  if (error) {
    console.log(error);
    res.status(400).send({msg:"Email not sent " + error})
  } 
  else {
    console.log('Email sent: ' + info.response);
    res.send({msg:"Email sent successfull"})
  }
}); 
})
 module.exports =app