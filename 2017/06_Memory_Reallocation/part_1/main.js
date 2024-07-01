/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 6.1
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\t');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  /**
   * @brief Finds the bank with the most number of blocks
   *
   * @param {Integer Array} banks - memory banks with the number
   *                                of blocks each can hold
   *
   * @returns {Integer}           - memory bank with the most blocks
   */
  const largestBank = banks => {
    let maxI = 0;

    for (let i = 1; i < banks.length; ++i) {
      if (+banks[i] != +banks[maxI] && +banks[i] > +banks[maxI])
        maxI = i;
    }

    return maxI;
  };

  /**
   * @brief Redistributes blocks to other banks
   *
   * @param {Integer} start       - bank number to start at
   * @param {Integer Array} banks - memory banks with the number
   *                                of blocks each can hold
   */
  const redistribute = (start, banks) => {
    let nBlocks = +banks[start];

    // Wrap if last bank is chosen
    let i = start + 1 >= banks.length ? 0 : start + 1;

    // Distribute blocks amongst banks
    while(nBlocks > 0) {
      if (+banks[start] > 0) {
        ++banks[i];
        --banks[start];
        // Wrap if last bank is reached
        i = i + 1 >= banks.length ? 0 : i + 1;
      }
      --nBlocks;
    }
  };

  const cache = new Set();
  let found = false;

  while(!found) {
    redistribute(largestBank(input), input);
    // Check if new formation is in Set
    if (cache.has(input.join(','))) found = true;

    cache.add(input.join(',')); // Save formation
  }

  // Add 1 to make up the terminating cycle
  console.log(cache.size + 1);
}
else console.error("Failed to read input.txt");