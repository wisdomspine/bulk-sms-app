const lib = require ("libphonenumber-js");
const {parseDigits} = lib;

//  import { parseIncompletePhoneNumber, formatIncompletePhoneNumber } from "libphonenumber-js";
const nu = "08160606990";

console.log(parseDigits('+234 8160 606990'));