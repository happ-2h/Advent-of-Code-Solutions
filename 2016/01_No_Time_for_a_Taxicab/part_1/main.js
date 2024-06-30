/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 1.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split(", ");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const person = {
    coords: { x: 0, y: 0 },
    facing: 0, // Facing cardinal direction
    step: function(dir, n) {
      // Clamp it to 0-3
      this.facing =
        dir == 'L' ?
          (this.facing + 3)&3 : // Left is three 90 degree turns
          (this.facing + 1)&3;  // Right is one 90 degree turn

      // Move person
      switch(this.facing) {
        case 0: // North
          this.coords.y -= n;
          break;
        case 1: // East
          this.coords.x += n;
          break;
        case 2: // South
          this.coords.y += n;
          break;
        case 3: // West
          this.coords.x -= n;
          break;
        default: // Unknown
          console.log(`Unknown direction ${this.facing}`);
          break;
      }
    }
  };

  for (const dir of input)
    //          R or L, distance to move
    person.step(dir[0], +dir.substring(1));

  const distance = Math.abs(person.coords.x) + Math.abs(person.coords.y);

  console.log(distance);
}
else console.error("Failed to read input.txt");