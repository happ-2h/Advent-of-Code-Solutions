/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 9.1
 */
let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let len = 0;

  for (let i = 0; i < input.length; ++i) {
    const c = input[i];

    if (c === '(') {
      let nums = [0, 0];
      let numsi = 0;

      // Parse two digits seperated by 'x'
      while(input[++i] !== ')') {
        if (input[i] === 'x') ++numsi;
        else nums[numsi] = nums[numsi] * 10 + +input[i];
      }

      len += nums[0] * nums[1];
      i   += nums[0]; // Skip decompressed characters
    }
    else if (c >= 'A' && c <= 'Z') ++len;
  }

  console.log(len);
}
else console.error("Failed to read input.txt");