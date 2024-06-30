/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 6.1 and 6.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let messageP1 = ""; // Message for part 1
  let messageP2 = ""; // Message for part 2

  for (let x = 0; x < input[0].length; ++x) {
    let freq = new Array(26).fill(0); // Frequency of each character

    // Add up frequencies
    for (let y = 0; y < input.length; ++y)
      ++freq[(input[y][x].charCodeAt() - 'a'.charCodeAt())];


    // Find index with greatest and least letter frequency
    let max = 0;
    let min = 0;
    for (let i = 0; i < freq.length; ++i) {
      if (freq[i] > freq[max]) max = i; // Part 1: greatest
      if (freq[i] < freq[min]) min = i; // Part 2: least
    }

    // Append character to message
    messageP1 += String.fromCharCode(97 + max);
    messageP2 += String.fromCharCode(97 + min);

  }

  console.log(messageP1);
  console.log(messageP2);
}
else console.error("Failed to read input.txt");