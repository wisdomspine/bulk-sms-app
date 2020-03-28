const axios = require("axios");
// const Nexmo = require('nexmo')

// const nexmo = new Nexmo({
//   apiKey: "decc1d50",
//   apiSecret: "BypfLPHRs8mOnMLP"
// })

// const from = "spinneret"
// const to = "2348160606990"
// const text = 'A text message sent using the Nexmo SMS API'

// nexmo.message.sendSms(from, to, text, (err, responseData) => {
//     if (err) {
//         console.log(err);
//     } else {
//         if(responseData.messages[0]['status'] === "0") {
//             console.log("Message sent successfully.");
//         } else {
//             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//         }
//     }
// })

// import { request } from "http";
// /*  
//     This is a wrapper class with type support for sending messages via nexmo api
// */
// import { NexmoConfiguration } from '.';

// const HOST = "rest.nexmo.com";
// const PATH = "/sms/json";

// function test() {
//     const data ={
//         api_key: "decc1d50",
//         api_secret: "BypfLPHRs8mOnMLP",
//         from: "spins",
//         to: "2348160606990",
//         text: "body.smooth"
//     };
//     const options = {
//         method: "POST",
//         host: HOST,
//         path: PATH,
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           "Content-Length": data.length
//         },
//         json: true
//     }

//     const promise = new Promise((resolve, reject) => {
//         const req= axios.default({
//             method: "POST",
//             data,
//             responseType: "json",
//             url:"https://rest.nexmo.com/sms/json" ,
//             // headers: {
//             //     "Content-length": JSON.stringify(data).length,
//             //     "Content-Type": "application/x-www-form-urlencoded"
//             // }
//         }).then(d => {
//             const data = d;
//             console.log(data.data);

//         }).catch(console.error)

//     })

//     return promise ;   
// }

// test().then(console.log).catch(console.log)