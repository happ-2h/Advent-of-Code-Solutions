/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 16.1 and 16.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split(',');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let programs = [..."abcdefghijklmnop"];

  // Makes x programs move from the end to the front
  const spin = x =>
    programs.unshift(...programs.splice(-x));

  // Swap programs at positions a and b
  const exchange = (a, b) =>
    [programs[a], programs[b]] = [programs[b], programs[a]];

  // Swap programs named a and b
  const partner = (a, b) =>
    exchange(programs.indexOf(a), programs.indexOf(b));

  const cache = programs.join(''); // For checking if cycle repeats

  // Process input
  for (let i = 0; i < 1_000_000_000; ++i) {
    for (const cmd of input) {
      switch(cmd[0]) {
        case 's':
          spin(+cmd.slice(1, cmd.length));
          break;
        case 'x':
          const xtmp = cmd.slice(1, cmd.length).split('/');
          exchange(+xtmp[0], +xtmp[1]);
          break;
        case 'p':
          const ptmp = cmd.slice(1, cmd.length).split('/');
          partner(ptmp[0], ptmp[1]);
          break;
        default:
          console.error(`Unknown command: ${cmd[0]}`);
          break;
      }
    }

    // Part 1
    if (i == 0) console.log(programs.join(''));

    // Skip repetitions
    if (programs.join('') == cache) i += (((1_000_000_000/(i+1))-1)|0) * (i+1);
  }

  // Part 2
  console.log(programs.join(''));
}
else console.error("Failed to read input.txt");