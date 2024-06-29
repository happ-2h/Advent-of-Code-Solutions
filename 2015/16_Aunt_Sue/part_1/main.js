/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 16.1
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

  let sue = -1;
  for (const str of input) {
    // Every Sue has 3 properties
    const parsedInput = str.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/);

    if (
      giftSue[parsedInput[2]] == parsedInput[3] &&
      giftSue[parsedInput[4]] == parsedInput[5] &&
      giftSue[parsedInput[6]] == parsedInput[7]
    ) {
      sue = parsedInput[1];
      break; // Every Sue is unique so we can stop checking
    }
  }

  console.log(sue);
}
else console.error("Failed to read input.txt");