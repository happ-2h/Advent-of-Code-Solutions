/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 11.1 and 11.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const step = {
    q: 0, // Column
    r: 0, // Row
    s: 0  // Diagonal
  };

  let furthestDist = 0;

  // Distance formula on hexagonal (cube) coordinates
  const dist = () =>
    (Math.abs(step.q) + Math.abs(step.r) + Math.abs(step.s))>>1;

  // Simulate walk
  input.split(',').forEach(dir => {
    switch(dir) {
      case 'n':
        --step.r;
        ++step.s;
        break;
      case "ne":
        ++step.q;
        --step.r;
        break;
      case "se":
        ++step.q;
        --step.s;
        break;
      case 's':
        --step.s;
        ++step.r;
        break;
      case "sw":
        --step.q;
        ++step.r;
        break;
      case "nw":
        --step.q;
        ++step.s;
        break;
      default:
        console.error(`Unknown direction ${dir}`);
        break;
    }

    // Get furthest distance
    let currDist = dist();
    furthestDist = furthestDist < currDist ? currDist : furthestDist;
  });

  // Part 1 final distance
  console.log(dist());

  // Part 2 furthest distance
  console.log(furthestDist);
}
else console.error("Failed to read input.txt");