/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 11.1 and 11.2
 */

// Part 1: floor 1 = 3
const floors = [7, 4, 4, 0];

/**
 * Calculates steps required to bring n items
 * to the next floor (directly above)
 *
 * @param {Integer} n - number of items
 *
 * @returns {Integer} - number of steps it takes to elevate all items
 */
const stepsRequired = (n) => {
  if (n <= 0) return 0;
  else if (n == 1 || n == 2) return 1;
  else return (n-2)*2 + 1; // Total pairs of two (n-2); excluding the first item
                           // Each pair takes 2 steps (*2)
                           // Plus first item which takes one step only (+1)
};

let ttlSteps = 0;
for (let i = 0; i < floors.length-1; ++i) {
  ttlSteps += stepsRequired(floors[i]); // Add up total steps
  floors[i+1] += floors[i];             // Move the items up
}

console.log(ttlSteps);