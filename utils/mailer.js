//nodemailer needs a transport service using which it can send emails.
//In this example, I am using Gmail.

const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Mohammed Lamine <${process.env.EMAIL_FROM}>`;
    console.log(this.to + ',' + this.firstName + ',' + this.url + ',' + this.from);
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      /* Sendgrid */

      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };
    console.log('sending...');
    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the reactjs-books Family!');
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)');
  }
};

/* 
NOTES :

0- WE AVOID GMAIL FOR PRODUCTION BECAUSE OF :   
        1-500 MAILS /DAY LIMITATION
        2-W4LL MARKED AS SPAMMER

1- MAILTRAP TO AVOID SENDING TEST MESSAGES TO REAL EMAIL LIST
2- CREATE NEW INBOX  (ONLY ONE IN FREE ACCOUNT)
3- GET THE INBOX CREDENTIALS


*/
