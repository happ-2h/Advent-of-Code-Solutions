/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 8.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split("\n");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let ctr = 0;

  input.forEach(str => {
    //     Literal    - code representation
    ctr += str.length - eval(str).length;
  });

  console.log(ctr);
}
else console.error("Failed to read input.txt");