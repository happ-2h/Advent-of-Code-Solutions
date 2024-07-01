/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 19.1 and 19.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null){
  const packet = {
    dir: 's',     // Always move south at first
    x: 0,
    y: 0,         // Always starts at the top
    letters: [],  // Holds letters it comes across
    isEnd: false, // Has packet reached the end?
    ttlSteps: 0,  // Total number of steps (part 2)

    move: function() {
      let nextx = this.x;
      let nexty = this.y;

      switch(this.dir) {
        case 'n': --nexty; break;
        case 'e': ++nextx; break;
        case 's': ++nexty; break;
        case 'w': --nextx; break;
        default:
          console.error(`Unknown direction ${packet.dir}. Terminating...`);
          packet.isEnd = true;
          break;
      }

      // Trying to go beyond the map? Terminate program
      if (
        nexty >= input.length    || nexty < 0 ||
        nextx >= input[0].length || nextx < 0
      ) this.isEnd = true;
      // Check what the packet is stepping on
      else {
        // Nowhere else to go? Terminate program
        if (input[nexty][nextx] == ' ') this.isEnd = true;

        // '+'? Must change direction
        else if (input[nexty][nextx] == '+')
          this.getNewDir(nextx, nexty);

        // Letter? Save it
        else if (
          char = input[nexty][nextx], // Assumed always capital
          char >= 'A' &&
          char <= 'Z'
        ) this.letters.push(char);
      }

      // Update position
      this.x = nextx;
      this.y = nexty;

      ++this.ttlSteps;
    },

    getNewDir: function(nx, ny) {
      // North
      if (
        this.dir != 's' &&        // Prevent going backwards
        ny-1 >= 0 &&              // Bounds check
        input[ny-1][nx] == '|'
      ) this.dir = 'n';
      // East
      else if (
        this.dir != 'w' &&        // Prevent going backwards
        nx+1 < input[0].length && // Bounds check
        input[ny][nx+1] == '-'
      ) this.dir = 'e';
      // South
      else if (
        this.dir != 'n' &&        // Prevent going backwards
        ny+1 < input.length &&    // Bounds check
        input[ny+1][nx] == '|'
      ) this.dir = 's';
      // West
      else if (
        this.dir != 'e' &&        // Prevent going backwards
        nx-1 >=0 &&               // Bounds check
        input[ny][nx-1] == '-'
      ) this.dir = 'w';
    }
  };

  // Get starting point
  packet.x = input[0].indexOf('|');

  while(!packet.isEnd) packet.move();

  console.log(packet.letters.join('')); // Part 1
  console.log(packet.ttlSteps);         // Part 2
}
else console.error("Failed to read input.txt");