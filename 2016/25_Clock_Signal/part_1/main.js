/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 25.1
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
    const registers = { a:0, b:0, c:0, d:0 };
    let pc = 0;

    let outSignals = [];      // Holds out signals
    const outSignalsMax = 10; // Maximum signals to check

    let endExec = false;      // Determines when to end interpreter execution

    const parsedInput = [];
    input.forEach(str => parsedInput.push(str.split(" ")));

    const instructions = {
      // Copies x (integer or register) into y (destination register)
      cpy: (x, y) => {
        // If y is a register, execute instruction
        // Otherwise skip
        if (isNaN(y))
          registers[y] = isNaN(x) ? registers[x] : +x;
        ++pc;
      },
      // Increase value of register 'x' by one
      inc: (x) => {
        // If x is a register, execute instruction
        // Otherwise skip
        if (isNaN(x)) ++registers[x];
        ++pc;
      },
      // Decrease value of register 'x' by one
      dec: (x) => {
        // If x is a register, execute instruction
        // Otherwise skip
        if (isNaN(x)) --registers[x];
        ++pc;
      },
      // Jumps y away if x is not zero
      jnz: (x, y) => {
        if (
          (isNaN(x) && registers[x] != 0) || // If x is a register and value is not 0
          (!isNaN(x) && +x != 0)             // Or x is an integer that is not 0
        ) pc = isNaN(y) ? registers[y] + pc : +y + pc; // Jump y steps
        // Otherwise continue normal flow
        else ++pc;
      },
      // Transmits x (integer or register value) as the next value for the clock signal
      out: (x) => {
        // Append out signal
        outSignals.push(isNaN(x) ? registers[x] : +x);

        // If reached outSignalsMax, check if valid signal
        if (outSignals.length >= outSignalsMax) {
          for (let i = 0; i < outSignals.length; i += 2) {
            // Desire 0,1,0,1,0,1...
            if (outSignals[i] != 0 || outSignals[i+1] != 1)
              return false; // Bad pattern
          }
          // Answer found; end execution
          endExec = true;
        }

        return true; // Not done generating pattern
      }
    };

    // Current initial value in register a
    let curr_a = 0;

    while(pc < input.length && pc >= 0 && !endExec) {
      const currInst = parsedInput[pc];

      // Check instruction type and run appropriate method
      switch(currInst[0]) {
        case "cpy":
        case "jnz":
          instructions[currInst[0]](currInst[1], currInst[2]);
          break;
        case "inc":
        case "dec":
          instructions[currInst[0]](currInst[1]);
          break;
        case "out":
          // If bad pattern, initialize everything with new initial
          // register a value
          if (!instructions[currInst[0]](currInst[1])) {
            outSignals = [];
            pc = 0;
            registers.a = ++curr_a;
            registers.b = 0;
            registers.c = 0;
            registers.d = 0;
          }
          // Otherwise contiue flow
          else ++pc;
          break;
        default:
          console.error(`Unknown instruction ${currInst[0]}`);
          break;
      }
    }

    console.log(curr_a);
}
else console.error("Failed to read input.txt");