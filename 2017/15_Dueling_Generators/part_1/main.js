/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 15.1
 */

// Starting values given from input
let genA = 591;
let genB = 393;

let ttl = 0; // Keeps track of matching lowest 16-bits

// Simulate generators
for (let i = 0; i < 40_000_000; ++i) {
  genA = (genA*16807)%2147483647;
  genB = (genB*48271)%2147483647;

  // If lower 16-bits match, increase total
  ttl += (genA&0xFFFF) == (genB&0xFFFF);
}

console.log(ttl);