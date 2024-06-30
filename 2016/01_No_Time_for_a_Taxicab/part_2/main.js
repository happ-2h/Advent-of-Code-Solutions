/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 1.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split(", ");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const visited = []; // Stores visited coordinates
  let found = false;  // Was a duplicate found

  const person = {
    coords: { x: 0, y: 0 },
    facing: 0,
    step: function(dir, n) {
      // Clamp it to 0-3
      this.facing =
        dir == 'L' ?
          (this.facing + 3)&3 : // Left is three 90 degree turns
          (this.facing + 1)&3;  // Right is one 90 degree turn

      // Move person
      // Keep track of EVERY coordinate
      for (let i = 0; i < n; ++i) {
        switch(this.facing) {
          case 0: // North
            --this.coords.y;
            break;
          case 1: // East
            ++this.coords.x;
            break;
          case 2: // South
            ++this.coords.y;
            break;
          case 3: // West
            --this.coords.x;
            break;
          default: // Unknown
            console.log(`Unknown direction ${this.facing}`);
            break;
        }

        // Find the duplicate
        for (const v of visited) {
          if (v.x == this.coords.x && v.y == this.coords.y) {
            console.log(Math.abs(v.x) + Math.abs(v.y));
            found = true;
            return;
          }
        }
        visited.push({...this.coords});
      }
    }
  };

  for (const dir of input) {
    //          R or L, distance to move
    person.step(dir[0], +dir.substring(1));

    if (found) break;
  }
}
else console.error("Failed to read input.txt");