/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 7.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  /**
   * Compares Supernet and Hypernet strings
   * and determines if SSL is supported
   *
   * @param {String} sStr - Supernet string
   * @param {String} hStr - Hypernet string
   *
   * @returns {Boolean}   - true if supports SSL
   *                        false otherwise
   */
  const cmpAgainst = (sStr, hStr) => {
    for (let i = 0; i < sStr.length-2; ++i) {
      // if ABA
      if (
        sStr[i] == sStr[i+2] &&
        sStr[i] != sStr[i+1]
      ) {
        // Find BAB in hypernet sequence
        for (let j = 0; j < hStr.length-2; ++j) {
          if (
            hStr[j] == sStr[i+1] &&
            hStr[j+2] == hStr[j] &&
            hStr[j+1] == sStr[i]
          ) return true; // Supports SSL
        } // End for j to hStr
      } // End if ABA
    } // End for i to sStr

    // Doesn't support SSL
    return false;
  };

  let supportCtr = 0;

  for (const str of input) {
    const parsedInput = str.split(/\[(.*?)\]/);
    let isSupported = false; // If is supported, break inner loop

    // Even strings are supernet sequences
    for (let i = 0; i < parsedInput.length; i+=2) {
      // Odd strings are hypernet sequences
      for (let j = 1; j < parsedInput.length; j+=2) {
          if (cmpAgainst(parsedInput[i], parsedInput[j])) {
            ++supportCtr;
            isSupported = true;
            break;
          }
      }
      if (isSupported) break;
    }
  }

  console.log(supportCtr);
}
else console.error("Failed to read input.txt");