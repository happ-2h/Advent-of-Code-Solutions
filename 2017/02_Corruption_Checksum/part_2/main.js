/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 2.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let ttl = 0;

  for (const str of input) {
    const vals = str.split('\t').sort((a, b) => +b - +a);

    // Find evenly divisible values and total their quotient up
    for (let i = 0; i < vals.length-1; ++i) {
      for (let j = i+1; j < vals.length; ++j)
        if (+vals[i]%+vals[j] == 0) ttl += +vals[i] / +vals[j];
    }
  }

  console.log(ttl);
}
else console.error("Failed to read input.txt");