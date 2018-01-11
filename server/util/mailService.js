// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
// TODO extract sendgrid API key
sgMail.setApiKey('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');

// TODO: remove hardcoded url
// TODO: extract "from" email to constants
// TODO: error handling
const sendForgotPasswordEmail = (token, email) => {
    const msg = {
        to: email,
        from: 'team@zabushant.com',
        subject: 'Password Recovery',
        text: 'Click here to reset your password',
        html: `<strong>
                    <a href="http://localhost:3000/forgot-password/${token}">Click here!</a>
                </strong>`
    };
    sgMail.send(msg);

};

module.exports = {
    sendForgotPasswordEmail
};