const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "soulmiguel@gmail.com",
  from: "soulmiguel@gmail.com", // Use the email address or domain you verified above
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>"
};

const allowCors = fn => async (request, response) => {
  response.setHeader("Access-Control-Allow-Credentials", true);
  response.setHeader("Access-Control-Allow-Origin", "*");
  // another option
  // response.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  response.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (request.method === "OPTIONS") {
    response.status(200).end();
    return;
  }
  return await fn(request, response);
};

const handler = async function(request, response) {
  sgMail
    .send(msg)
    .then(res => {
      response.statusCode = 200;
      response.setHeader("Content-Type", `application/json`);
      response.end(JSON.stringify({ message: "sended!", return: res }));
    })
    .catch(error => {
      console.error();
      response.statusCode = 500;
      response.setHeader("Content-Type", `application/json`);
      response.end(JSON.stringify({ message: "error!", error: error }));
    });
};

module.exports = allowCors(handler);
