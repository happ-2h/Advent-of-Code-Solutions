/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 10.1 and 10.2
 */

const input = "3113322113";

let curr  = null; // Holds current number
let next  = null; // Holds next number
let final = "";   // Holds final result of subsequences
let ctr   = 0;    // Counter for consecutive numbers

const sequences = [input]; // Holds every generated sequence

// Part 1: Find the 40th sequence
// Part 2: Find the 50th sequence
for (let j = 0; j < 50; ++j) {
  // For every sequence
  for (let i = 0; i < sequences[j].length; ++i) {
    curr = sequences[j][i]; // Get the current number

    ++ctr; // Increase the counter

    // If there is no repetition in the next iteration, we are done counting
    if (!(i+1 < sequences[j].length && curr == sequences[j][i+1])) {
      final += ""+ctr+curr;
      ctr = 0;
    }
  }

  sequences.push(final); // Save the sequence
  final = "";            // Reset the pattern
}

console.log(sequences[sequences.length-1].length);