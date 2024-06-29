/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 23.1 and 23.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", 'utf-8').split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const regs = {
    a: 0,     // Part 1: a = 0
    b: 0
  };
  regs.a = 1; // Part 2: a = 1

  let pc = 0; // Program counter

  // Instructions
  const instructions = {
    hlf: r => regs[r] >>= 1,                  // Half
    tpl: r => regs[r] += regs[r] << 1,        // Triple
    inc: r => ++regs[r],                      // Increment
    jmp: o => pc += o,                        // Jump to offset
    jie: (r, o) => pc += regs[r]&1 ? 1 : o,   // Jump if even
    jio: (r, o) => pc += regs[r] == 1 ? o : 1 // Jump if one
  };

  while (pc < input.length) {
    const inst = input[pc].match(/([a-z]+)/g); // Get instruction, register
    const num  = input[pc].match(/(-?\d+)/g);  // Get any present number

    if (inst != null && instructions[inst[0]] != undefined) {
      switch(inst[0]) {
        case "hlf":
        case "tpl":
        case "inc":
          instructions[inst[0]](inst[1]);
          ++pc;
          break;
        case "jmp":
          instructions[inst[0]](+num[0]);
          break;
        case "jie":
        case "jio":
          instructions[inst[0]](inst[1], +num[0]);
          break;
        default:
          console.error(`Bad instruction ${inst[0]}`);
          break;
      }
    }
    else {
      console.error(inst !== null ? `Bad instruction: ${inst[0]}` : `Empty instruction`);
      break;
    }
  }

  console.log(regs);
}
else console.error("Failed to read input.txt");