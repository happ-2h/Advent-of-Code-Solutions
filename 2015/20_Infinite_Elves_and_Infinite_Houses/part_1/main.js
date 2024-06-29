/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 20.1
 */

const input = 29000000;

/*
 * We can divide by 10 since houses greater than input/10
 * will, by default, be greater than our input
 */
const houses = new Array(input/10).fill(1); // 1 ((1*10)/10) is the start of the series

// Find the lowest house number of the house to get at
// least as many presents as the number in input
for (let elf = 2; elf < input/10; ++elf) {
  // We can jump to form common factors e.g. 2+2+2+2...
  for (let house = elf-1; house < input/10; house += elf)
    houses[house] += elf;

  // Solution found? done
  if (houses[elf-1] >= input/10) {
    console.log(elf);
    break;
  }
}