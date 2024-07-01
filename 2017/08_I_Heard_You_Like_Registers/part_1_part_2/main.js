/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 8.1 and 8.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const registers = new Map();
  let maxVal = Number.MIN_SAFE_INTEGER; // Part 2. Holds highest value ever held

  for (let instr of input) {
    instr = instr.split(' ');

    // If new register encountered, set to 0
    if (!registers.has(instr[0])) registers.set(instr[0], 0);
    if (!registers.has(instr[4])) registers.set(instr[4], 0);

    // Run command
    let regToTest = registers.get(instr[4]);
    let shouldIncDec = false;

    switch(instr[5]) {
      case ">":
        shouldIncDec = regToTest > +instr[6];
        break;
      case "<":
        shouldIncDec = regToTest < +instr[6];
        break;
      case ">=":
        shouldIncDec = regToTest >= +instr[6];
        break;
      case "<=":
        shouldIncDec = regToTest <= +instr[6];
        break;
      case "==":
        shouldIncDec = regToTest == +instr[6];
        break;
      case "!=":
        shouldIncDec = regToTest != +instr[6];
        break;
      default:
        console.error(`Unknown operator ${instr[5]}`);
        break;
    }

    if (shouldIncDec) {
      registers.set(
        instr[0],
        instr[1] == "inc" ?
          registers.get(instr[0]) + +instr[2] :
          registers.get(instr[0]) - +instr[2]
      );

      if (registers.get(instr[0]) > maxVal) maxVal = registers.get(instr[0]);
    }
  }

  // Part 1
  console.log(Math.max(...registers.values()));

  // Part 2
  console.log(maxVal);
}
else console.error("Failed to read input.txt");