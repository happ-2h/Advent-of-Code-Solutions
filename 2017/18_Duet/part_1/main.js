/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 18.1
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null){
  // Should start with 0
  const registers = {
    'i': 0,
    'a': 0,
    'p': 0,
    'b': 0,
    'f': 0
  };

  let pc = 0;         // Program Counter
  let freq = 0;       // Sound frequency
  let running = true; // Is program running?

  /**
   * @brief Plays a sound with a frequency equal to the value of x.
   *
   * @param {Character} x - register to get value from
   */
  const snd = x => {
    freq = isNaN(x) ? registers[x] : +x;
    ++pc;
  };
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
   * @brief Increases register x by the value of y.
   *
   * @param {Character} x           - register to increase
   * @param {Character | Integer} y - register or literal value to
   *                                  increase register x by
   */
  const add = (x, y) => {
    registers[x] += isNaN(y) ? registers[y] : +y;
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
    registers[x] *= isNaN(y) ? registers[y] : +y;
    ++pc;
  };
  /**
   * @brief Sets register x to the remainder of dividing the value
   *        contained in register x by the value of y.
   *
   * @param {Character} x           - register to store remainder
   * @param {Character | Integer} y - register or literal value to
   *                                  divide against register x
   */
  const mod = (x, y) => {
    registers[x] %= isNaN(y) ? registers[y] : +y;
    ++pc;
  };
  /**
   * @brief Recovers the frequency of the last sound played,
   *        but only when the value of x is not zero.
   *
   * @param {Character} x - value to check against
   */
  const rcv = x => {
    if (registers[x] == 0) return;

    // Only need first RCV occurence for solution
    console.log(freq); // Solution found
    running = false;   // End execution
    ++pc;
  };
  /**
   * @brief Jumps with an offset of the value of y,
   *        but only if the value of x is greater than zero.
   *
   * @param {Character | Integer} x - value to check against
   * @param {Integer} y             - offset
   */
  const jgz = (x, y) => {
    if (
      (isNaN(x) && registers[x] > 0) ||
      (!isNaN(x) && +x > 0)
    ) pc += isNaN(y) ? registers[y] : +y;
    else ++pc;
  };

  while(running) {
    // If out of bounds, terminate program
    if (pc >= input.length || pc < 0) break;

    else {
      const instr = input[pc].split(' ');

      switch(instr[0]) {
        case "snd":
          snd(instr[1]);
          break;
        case "set":
          set(instr[1], instr[2]);
          break;
        case "add":
          add(instr[1], instr[2]);
          break;
        case "mul":
          mul(instr[1], instr[2]);
          break;
        case "mod":
          mod(instr[1], instr[2]);
          break;
        case "rcv":
          rcv(instr[1]);
          break;
        case "jgz":
          jgz(instr[1], instr[2]);
          break;
        default:
          console.error(`Unknown instruction ${instr[0]}. Terminating...`);
          running = false;
          break;
      }
    }
  }
}
else console.error("Failed to read input.txt");