/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 16.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const giftSue = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
  };

  /**
   *
   * @param {String} prop - property of Sue
   * @param {String} val  - value of the propert
   *
   * @returns {Boolean}   - true if new condition is met
   *                        false otherwise
   */
  const retroencabulator = (prop, val) => {
    switch(prop) {
      case "cats":
      case "trees":
        return +val > giftSue[prop];
      case "pomeranians":
      case "goldfish":
        return +val < giftSue[prop];
      default: return +val == giftSue[prop];
    }
  };

  let sue = -1;
  for (const str of input) {
    // Every Sue has 3 properties
    const parsedInput = str.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/);

    if (
      retroencabulator(parsedInput[2], parsedInput[3]) &&
      retroencabulator(parsedInput[4], parsedInput[5]) &&
      retroencabulator(parsedInput[6], parsedInput[7])
    ) {
      sue = parsedInput[1];
      break; // Every Sue is unique so we can stop checking
    }
  }

  console.log(sue);
}
else console.error("Failed to read input.txt");