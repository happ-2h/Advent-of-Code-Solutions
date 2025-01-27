/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 17.1 and 17.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split("\n");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  /**
   * @brief Get number of combinations that fit in amoutn of liters
   *
   * @param {Number} liters - Total liters
   * @param {Number} start  - Beginning of container list
   * @param {Number} end    - End of container list
   *
   * @returns Number of combinations of containersthat fit exactly in "liters"
   */
  const nCombos = (liters, start, end) => {
    const container = +input[start];

    if (end < 0)           return 0;
    else if (liters === 0) return 1;
    else if (start === input.length || liters < 0) return 0;

    return nCombos(liters, start + 1, end) +
           nCombos(liters-container, start+1, end-1);
  };

  // Part 1
  console.log(nCombos(150, 0, input.length));

  // Part 2
  let diff = 0;
  let end  = 0;
  while(!(diff = nCombos(150, 0, ++end)));

  console.log(diff);
}
else console.error("Failed to read input.txt");