/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 5.1
 */

import { createHash } from "crypto";

const input = "uqwqemis";
let count = 0;
let pwd = "";

while(pwd.length < 8) {
  let hash = createHash("md5").update(input + count).digest("hex");

  /*
   * If hash starts with "00000", the 6th character
   * is the next character of the password
   */
  if (hash.startsWith("00000")) pwd += hash[5];
  ++count;
}

console.log(pwd);