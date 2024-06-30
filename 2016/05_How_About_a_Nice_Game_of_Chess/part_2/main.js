/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 5.2
 */

import { createHash } from "crypto";

const input = "uqwqemis";
let count = 0;

const pwd = new Array(8).fill('#');
let keepChecking = true;

while (keepChecking) {
  const hash = createHash("md5").update(input + count).digest("hex");

  if (hash.startsWith("00000")) {
    // Check if 6th character is in range [0, 7]
    if (hash[5] >= '0' && hash[5] <= '7') {
      // If the slot is vacant (indicated by '#'),
      pwd[+hash[5]] =
        pwd[+hash[5]] == '#' ?
          hash[6] :      // Fill it
          pwd[+hash[5]]; // Otherwise ignore it

      // If there are still vacant slots, keep on checking
      keepChecking = false;
      for (const c of pwd) {
        if (c == '#') {
          keepChecking = true;
          break;
        }
      }
    }
  }
  ++count;
}

console.log(pwd.join(""));