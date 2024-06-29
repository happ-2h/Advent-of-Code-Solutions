/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 4.1
 */

import { createHash } from 'crypto'

let input = "yzbqklnj";

let count = 0;

while(!createHash('md5').update(input + count).digest('hex').startsWith("00000"))
  ++count;

console.log(count);