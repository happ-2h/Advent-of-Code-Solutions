/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 15.2
 */

// Starting values given from input
let genA = 591;
let genB = 393;

const values = [[], []]; // Holds values given by generators
                         // [0][] = Generator A
                         // [1][] = Generator B

let ttl = 0; // Keeps track of matching lowest 16-bits

// Simulate generators
for (let i = 0; i < 40_000_000; ++i) {
  genA = (genA*16807)%2147483647;
  genB = (genB*48271)%2147483647;

  // Handle new criteria
  // - Only save value if multiple of 4
  if (genA%4 == 0) values[0].push(genA);
  // - Only save value if multiple of 8
  if (genB%8 == 0) values[1].push(genB);
}

// Compare values for judging; limit 5 million pairs
for (let i = 0; i < 5_000_000; ++i)
  ttl += (values[0][i]&0xFFFF) == (values[1][i]&0xFFFF);


console.log(ttl);