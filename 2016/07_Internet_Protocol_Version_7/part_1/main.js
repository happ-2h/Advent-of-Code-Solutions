/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 7.1
 *
 * FIXME
 *   More counted than it should
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const isABBA = (str) => {
    // Check if has reverse pair
    const regRes = str.match(/([a-z])([a-z])\2\1/g);

    if (regRes) {
      // Check if different characters
      if (regRes[0][0] != regRes[0][1]) {
        return true;
      }
    }
    // No ABBA pattern
    return false;
  };

  let supportCtr = 0;

  for (const str of input) {
    const splitInput = str.split(/\[(.*?)\]/);
    let strOut = ""; // Ouside brackets
    let strIn = "";  // Inside brackets

    // Concatenate strings
    for (let i = 0; i < splitInput.length; ++i) {
      // Even: outside brackets
      if ((i&1) == 0) {
        strOut += splitInput[i];
      }
      // Odd: inside brackets
      else {
        strIn += splitInput[i];
      }
    }

    // Validate IPv7
    if (!isABBA(strIn) && isABBA(strOut)) ++supportCtr;
  }

  console.log(supportCtr);
}
else console.error("Failed to read input.txt");