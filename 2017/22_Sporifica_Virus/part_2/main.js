/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 22.2
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

      // If current node is clean, turn left
      if (infectedNodes[currNode] == undefined || infectedNodes[currNode] == 'C')
        this.dir = (this.dir-1)&3;
      // If current node is weakend, do not turn
      else if (infectedNodes[currNode] == 'W');
      // If current node is infected, turn right
      else if (infectedNodes[currNode] == 'I') this.dir = (this.dir+1)&3;
      // If current node is flagged, reverse direction
      else if (infectedNodes[currNode] == 'F') this.dir = (this.dir+2)&3;

      // Modify state of the current node
      // - Clean becomes weakened
      if (infectedNodes[currNode] == undefined || infectedNodes[currNode] == 'C')
        infectedNodes[currNode] = 'W';
      // - Weakened becomes infected
      else if (infectedNodes[currNode] == 'W') {
        infectedNodes[currNode] = 'I';
        ++this.infections;
      }
      // - Infected becomes flagged
      else if (infectedNodes[currNode] == 'I') infectedNodes[currNode] = 'F';
      // - Flagged becomes clean
      else if (infectedNodes[currNode] == 'F') infectedNodes[currNode] = 'C';

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
      if (input[y][x] == '#') infectedNodes[`${y-offset},${x-offset}`] = 'I';
    }
  }

  // Perform actions of carrier
  for (let i = 0; i < 10_000_000; ++i) carrier.burst();

  console.log(carrier.infections);
}
else console.error("Failed to read input.txt");