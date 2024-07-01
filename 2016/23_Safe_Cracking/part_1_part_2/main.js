/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 23.1 and 23.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
    // Part 1 a = 7, Part 2 a = 12
    const registers = { a:7, b:0, c:0, d:0 };
    let pc = 0;

    const parsedInput = [];
    input.forEach(str => parsedInput.push(str.split(" ")));

    const instructions = {
      // Copies x (integer or register) into y (destination register)
      cpy: (x, y) => {
        if (isNaN(y))
          registers[y] = isNaN(x) ? registers[x] : +x;
        ++pc;
      },
      // Increase value of register 'x' by one
      inc: (x) => {
        if (isNaN(x)) ++registers[x];
        ++pc;
      },
      // Decrease value of register 'x' by one
      dec: (x) => {
        if (isNaN(x)) --registers[x];
        ++pc;
      },
      // Jumps y away if x is not zero
      jnz: (x, y) => {
        if (
          (isNaN(x) && registers[x] != 0) ||
          (!isNaN(x) && +x != 0)
        ) {
          pc = isNaN(y) ? registers[y] + pc : +y + pc;
        }
        else ++pc;
      },
      // Toggles instruction x away
      tgl: (x) => {
        const away = isNaN(x) ? registers[x] + pc : +x + pc; // Get offset

        if (
          // In bounds of program
          away < parsedInput.length &&
          away >= 0
        ) {
          // One argument instruction
          if (parsedInput[away].length == 2) {
            parsedInput[away][0] =
              parsedInput[away][0] == "inc" ? "dec" : "inc";
          }
          // Two argument instructions
          else if (parsedInput[away].length == 3) {
            parsedInput[away][0] =
              parsedInput[away][0] == "jnz" ? "cpy" : "jnz";
          }
        }

        ++pc;
      }
    };

    while(pc < input.length && pc >= 0) {
      const currInst = parsedInput[pc];

      switch(currInst[0]) {
        case "cpy":
        case "jnz":
          instructions[currInst[0]](currInst[1], currInst[2]);
          break;
        case "inc":
        case "dec":
        case "tgl":
          instructions[currInst[0]](currInst[1]);
          break;
        default:
          console.error(`Unknown instruction ${currInst[0]}`);
          break;
      }
    }

    console.log(registers['a']);
}
else console.error("Failed to read input.txt");