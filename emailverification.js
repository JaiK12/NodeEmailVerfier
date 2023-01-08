const nodemailer = require('nodemailer');
const directTransport = require('nodemailer-direct-transport');
const prompt = require('prompt-sync');

//host email the one that sends
//In the blank space of from host enter your email address domain in the from enter the email address

const fromhost =`` ;const from = '' + '@' + fromhost;

console.log('Email will be sent from:');
console.log(from, '\n');

//Asking for the users email address
const to = prompt('Enter your email address').trim();

//Generate random otp
const trueVerificationCode = Math.round(Math.random() * (10e5 - 1)).toString();

//Crate email transport
const transport = nodemailer.createTransport(directTransport({
  name: fromhost
}));

//Send the email
transport.sendMail({
  from, to,
  subject: 'Verify your email address',
  html:`
         <div style="width:100%;display:flex;flex-direction:column;justify-content:center;
         align-items:center;background:lightblue;padding:50px;box-sizing:border-box;">
         <h1>Verify your email address</h1>
         <p>The verifier has tried to verify your email address "${to}".
         If this wasn't you, ignore and delete this email. Otherwise, the verification code is bellow:</p>
         <div style="padding:50px;background:lightgray;border-radius:10px;font-size:30px;
         font-family:monospace;">${trueVerificationCode}</div></div>

        `
}, (err, data) => {
  if(err){
    console.error('There was an error:', err);
    
  } else{
    console.log('\nVerfication email sent, check your inbox\n');
    const userVerificationCode = prompt('Enter your verification code ');
    if(userVerificationCode == trueVerificationCode){
      console.log('Email address verified');      
    } else{
      console.log('code incorrect');     
    }
    

    
 } 
});
