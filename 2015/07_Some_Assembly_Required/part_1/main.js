/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 7.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split("\n");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const wires = new Map(); // Holds {wire => instruction} from input
  const cache = [];        // Holds signal value of wires as [wire: value]

  // Parse input
  for (str of input) {
    const instr = str.split("->");
    wires.set(instr[1].trim(), instr[0].trim()); // {wire => instruction}
    cache[instr[1].trim()] = instr[0].trim();    // [wire: instruction]
  }

  const findSignal = (wire) => {
    // Base cases
    // - If the value of wire is a number, return that number (no further solving required)
    if (!isNaN(cache[wire])) return cache[wire];
    // - If the instruction has a raw number, return that number
    else if (!isNaN(parseInt(wire))) return parseInt(wire);

    const splitInput = wires.get(wire).split(" ");

    // Solve the wire's equation
    if (wires.get(wire).includes("AND")) {
      cache[wire] = findSignal(splitInput[0]) & findSignal(splitInput[2]);
      return cache[wire];
    }
    else if (wires.get(wire).includes("OR")) {
      cache[wire] = findSignal(splitInput[0]) | findSignal(splitInput[2]);
      return cache[wire];
    }
    else if (wires.get(wire).includes("NOT")) {
      cache[wire] = ~findSignal(splitInput[1]) & 0xFFFF; // 16-bit only
      return cache[wire];
    }
    else if (wires.get(wire).includes("LSHIFT")) {
      cache[wire] = findSignal(splitInput[0]) << findSignal(splitInput[2]);
      return cache[wire];
    }
    else if (wires.get(wire).includes("RSHIFT")) {
      cache[wire] = findSignal(splitInput[0]) >> findSignal(splitInput[2]);
      return cache[wire];
    }
    // Equation was an assignment
    else return findSignal(splitInput[0]);
  };

  console.log(findSignal('a'));
}
else console.error("Failed to read input.txt");