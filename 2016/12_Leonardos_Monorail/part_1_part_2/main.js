/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 12.1 and 12.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  // Part 2: set register c to 1
  const registers = {a:0, b:0, c:1, d:0};
  let pc = 0;

  const instructions = {
    // Copies x (integer or register) into y (destination register)
    cpy: (x, y) => {
      registers[y] = isNaN(x) ? registers[x] : +x;
      ++pc;
    },
    // Increase value of register 'x' by one
    inc: (x) => {
      ++registers[x];
      ++pc;
    },
    // Decrease value of register 'x' by one
    dec: (x) => {
      --registers[x];
      ++pc;
    },
    // Jumps y away if x is not zero
    jnz: (x, y) => {
      pc = ((isNaN(x)) ? registers[x] : x) ? pc + +y : pc + 1;
    }
  };

  while(pc < input.length) {
    const parsedInput = input[pc].split(" ");

    switch(parsedInput[0]) {
      case "cpy":
      case "jnz":
        instructions[parsedInput[0]](parsedInput[1], parsedInput[2]);
        break;
      case "inc":
      case "dec":
        instructions[parsedInput[0]](parsedInput[1]);
        break;
      default:
        console.error(`Unknown instruction ${parsedInput[0]}`);
        break;
    }
  }

  console.log(registers['a']);
}
else console.error("Failed to read input.txt");