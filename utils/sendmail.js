const Mailjet = require('node-mailjet')

const mailjet = new Mailjet({
  apiKey: "359d4e2f84b792da57b4c94813a2eedd",
  apiSecret: "8f19b2496fc37818a4830ea011c13629"
});

module.exports.sendMail = async function(email, subject ,body)
{
  return await mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
            Email: "sahutrivendra1@gmail.com",
            Name: "Trivendra Kumar"
        },
        To: email,
        Subject: subject,  
        HTMLPart: body
      },
    ],
  })
}
