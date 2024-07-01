/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 22.1
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null){
  const infectedNodes = [];

  const carrier = {
    // Position of carrier in grid
    x:   0,
    y:   0,

    /**
     * Direction carrier is facing
     *
     * 0 = North
     * 1 = East
     * 2 = South
     * 3 = West
     **/
    dir: 0,

    infections: 0, // Total number of caused infections

    // Actions done after a tick
    burst: function() {
      const currNode = `${this.y},${this.x}`;

      // If current node is infected, turn right
      if (infectedNodes[currNode] != undefined && infectedNodes[currNode])
        this.dir = (this.dir+1)&3;
      // Otherwise, turn left
      else this.dir = (this.dir-1)&3;

      // If current node is clean, infect it
      if (infectedNodes[currNode] == undefined || !infectedNodes[currNode]) {
        infectedNodes[currNode] = true;
        ++this.infections;
      }
      // Otherwise, clean it
      else infectedNodes[currNode] = false;

      // Move forward based on direction
      switch(this.dir) {
        // North
        case 0: --this.y; break;
        // East
        case 1: ++this.x; break;
        // South
        case 2: ++this.y; break;
        // West
        case 3: --this.x; break;
        default:
          console.error(`Unknown direction ${this.dir}`);
          break;
      }
    }
  };

  // Set up initial infected nodes
  for (let y = 0, offset = input.length>>1; y < input.length; ++y) {
    for (let x = 0; x < input.length; ++x) {
      if (input[y][x] == '#') infectedNodes[`${y-offset},${x-offset}`] = true;
    }
  }

  // Perform actions of carrier
  for (let i = 0; i < 10_000; ++i) carrier.burst();

  console.log(carrier.infections);
}
else console.error("Failed to read input.txt");