import { NexmoConfiguration } from 'src/app/sms';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const nexmoConfig: NexmoConfiguration = {
  apiKey: "decc1d50",
  apiSecret: "BypfLPHRs8mOnMLP"
}

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyBDhKtUOW79fMaMuT47BGvqMx37C51mMlo",
    authDomain: "sms-app-8ea41.firebaseapp.com",
    databaseURL: "https://sms-app-8ea41.firebaseio.com",
    projectId: "sms-app-8ea41",
    storageBucket: "sms-app-8ea41.appspot.com",
    messagingSenderId: "541348955227",
    appId: "1:541348955227:web:e65f503f61ac9784cfab7e"
  },
  nexmoConfig

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
