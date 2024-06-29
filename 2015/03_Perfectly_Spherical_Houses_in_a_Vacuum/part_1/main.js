/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 3.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split("");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const santa = { x: 0, y: 0};        // Coordinates
  const visited = new Set();          // Houses visited (unique)
  visited.add(JSON.stringify(santa)); // Save starting point

  while(input.length > 0) {
    const dir = input.shift();

    switch(dir) {
      case "^": --santa.y; break;
      case "v": ++santa.y; break;
      case "<": --santa.x; break;
      case ">": ++santa.x; break;
    }

    visited.add(JSON.stringify(santa));
  }

  console.log(visited.size);
}
else console.error("Failed to read input.txt");