/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 4.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  for (const str of input) {
    const [_, name, secID] = str.match(/([a-z\-]+)\-(\d+)/);
    const CHAR_CODE_backtick = 'a'.charCodeAt() - 1;
    let decryptedMsg = "";

    // Decrypt room names
    for (const c of name) {
      // dashes = spaces
      if (c == '-')
        decryptedMsg += ' ';
      // decrypt character
      else {
        // Keep within a-z
        const decryptedChar = (((c.charCodeAt() - CHAR_CODE_backtick) + +secID%26) % 26) + CHAR_CODE_backtick;
        // Append character
        decryptedMsg += String.fromCharCode(decryptedChar);
      }
    }

    // Room name is not exact, so we look for key words
    if (decryptedMsg.match(/(north)|(pole)|(objects)/i)) {
      console.log(secID);
      break;
    }
  }
}
else console.error("Failed to read input.txt");