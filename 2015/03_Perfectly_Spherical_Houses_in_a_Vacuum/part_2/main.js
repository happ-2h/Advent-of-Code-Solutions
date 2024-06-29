/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 3.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split("");
} catch(err) {
  console.error(err);
}

if (input !== null) {
  // Coordinates
  const santa = { x: 0, y: 0 };
  const robot = { x: 0, y: 0 };

  const visited = new Set();
  // Save starting point
  visited.add(JSON.stringify(santa));
  visited.add(JSON.stringify(robot));

  for (let i = 0; i < input.length; ++i) {
    switch(input[i]) {
      // Even: Santa moves, odd: robot moves
      case "^":
        i&1 ? --robot.y : --santa.y;
        break;
      case "v":
        i&1 ? ++robot.y : ++santa.y;
        break;
      case "<":
        i&1 ? --robot.x : --santa.x;
        break;
      case ">":
        i&1 ? ++robot.x : ++santa.x;
        break;
    }
    i&1 ? visited.add(JSON.stringify(robot)) : visited.add(JSON.stringify(santa));
  }

  console.log(visited.size);
}
else console.error("Failed to read input.txt");