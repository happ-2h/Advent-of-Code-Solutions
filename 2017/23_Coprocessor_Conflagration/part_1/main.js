/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 23.1
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null){
  // Start at 0
  const registers = {
    'a': 0,
    'b': 0,
    'c': 0,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0,
    'h': 0
  };

  let pc = 0;         // Program Counter
  let running = true; // Is program running?
  let mulExec = 0;    // How many times has "mul" been executed

  /**
   * @brief Sets register x to the value of y.
   *
   * @param {Character} x           - register to set value to
   * @param {Character | Integer} y - register or literal value to
   *                                  assign to register x
   */
  const set = (x, y) => {
    registers[x] = isNaN(y) ? registers[y] : +y;
    ++pc;
  };
  /**
   * @brief Decreases register x by the value of y.
   *
   * @param {Character} x           - register to decrease
   * @param {Character | Integer} y - register or literal value to
   *                                  increase register x by
   */
  const sub = (x, y) => {
    registers[x] -= isNaN(y) ? registers[y] : +y;
    ++pc;
  };
  /**
   * @brief Sets register x to the result of multiplying the
   *        value contained in register x by the value of y.
   *
   * @param {Character} x           - register to multiply
   * @param {Character | Integer} y - register or literal value to
   *                                  multiply register x by
   */
  const mul = (x, y) => {
    ++mulExec;
    registers[x] *= isNaN(y) ? registers[y] : +y;
    ++pc;
  };
  /**
   * @brief Jumps with an offset of the value of y,
   *        but only if the value of x is not zero.
   *
   * @param {Character | Integer} x - value to check against
   * @param {Integer} y             - offset
   */
  const jnz = (x, y) => {
    if (
      (isNaN(x) && registers[x] != 0) ||
      (!isNaN(x) && +x != 0)
    ) pc += isNaN(y) ? registers[y] : +y;
    else ++pc;
  };

  while(running) {
    // If out of bounds, terminate program
    if (pc >= input.length || pc < 0) break;

    const instr = input[pc].split(' ');

    switch(instr[0]) {
      case "set":
        set(instr[1], instr[2]);
        break;
      case "sub":
        sub(instr[1], instr[2]);
        break;
      case "mul":
        mul(instr[1], instr[2]);
        break;
      case "jnz":
        jnz(instr[1], instr[2]);
        break;
      default:
        console.error(`Unknown instruction ${instr[0]}. Terminating...`);
        running = false;
        break;
    }
  }

  console.log(mulExec);
}
else console.error("Failed to read input.txt");