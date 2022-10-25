// # Log
// a fancy terminal logger tool

import colors from "colors";

/**
 * # log
 * prints the message with the TS and all that depending on the type provided
 *
 * @param {String} message
 * @param {Number} type
 *
 * @returns logs the message
 */
export default function log(message: string, type = 0): void {
  const ts = colors.yellow(`[${new Date().toString().split(" GMT")[0]}] `);
  let status = "";

  switch (type) {
    case 1:
      status = colors.red("[-] ");
      break;
    case 2:
      status = colors.green("[+] ");
      break;
    case 3:
      status = colors.blue("[*] ");
      break;
    default:
      status = colors.cyan("[?] ");
      break;
  }

  console.log(ts + status + message);
}
