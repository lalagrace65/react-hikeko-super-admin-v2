const nodemailer = require('nodemailer');
require('dotenv').config();

exports.generateOTP = () => {
    let otp = '';
    for (let i = 0; i < 3; i++) {
        const randVal= Math.round(Math.random() * 10);
        otp = otp + randVal;
    }
    return otp;
};

exports.mailTransport = () => nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
        debug: true,
      });

exports.generateEmailTemplate = code => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
          @media screen and (max-width: 620px) {
            h1{
              font-family: 'Lato', sans-serif;
              font-size: 20px;
              padding: 5px;
            }
          }
        </style>
      </head>
      <body>
        <div>
          <div style = "max-width: 620px; margin 0 auto; font-family;
          sans-serif; color: #272727;">
              <h1 style="background-color: #f6f6f6; padding: 10px; text-align: center;
              color: #272727;">
                We are delighted to welcome you to Hikeko!
              </h1>
              <p>Please verify your email account by entering the code:</p>
              <p style="width:80px; margin: 0 auto; background-color: #f6f6f6; 
              font-weight: bold; text-align: center; border-radius: 5px; font-size: 20px;">
                ${code}   
              </p>
          </div>
        </div>
      </body>
    </html>      
  `;
};

exports.plainEmailTemplate = (heading, message) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
          @media screen and (max-width: 620px) {
            h1{
              font-family: 'Lato', sans-serif;
              font-size: 20px;
              padding: 5px;
            }
          }
        </style>
      </head>
      <body>
        <div>
          <div style = "max-width: 620px; margin 0 auto; font-family;
          sans-serif; color: #272727;">
              <h1 style="background-color: #f6f6f6; padding: 10px; text-align: center;
              color: #272727;">
                ${heading}
              </h1>
              <p style="color: #272727; text-align: center;">
                ${message}   
              </p>
          </div>
        </div>
      </body>
    </html>
      
  `
}