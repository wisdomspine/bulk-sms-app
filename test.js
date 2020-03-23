const Nexmo = require('nexmo')

const nexmo = new Nexmo({
  apiKey: "decc1d50",
  apiSecret: "BypfLPHRs8mOnMLP"
})

const from = "spinneret"
const to = "2348160606990"
const text = 'A text message sent using the Nexmo SMS API'

nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})