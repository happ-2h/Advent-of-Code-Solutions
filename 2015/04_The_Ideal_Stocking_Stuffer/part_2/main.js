/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 4.2
 */

import { createHash } from 'crypto'

let input = "yzbqklnj";

let count = 0;

// 6 zeroes
while(!createHash('md5').update(input + count).digest('hex').startsWith("000000"))
  ++count;

console.log(count);