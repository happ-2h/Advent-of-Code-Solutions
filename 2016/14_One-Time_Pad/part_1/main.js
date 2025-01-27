/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 14.1
 */
const input = "cuanljph";

let nKeys = 0; // Number of keys for 64 limit
let i     = 0; // Integer index of current hash

for (; i < 99999 && nKeys < 64; ++i) {
  let hash = require("crypto").createHash('md5').update(input+i).digest("hex");

  const consecutive3 = hash.match(`(.)\\1{2}`);

  if (consecutive3) {
    for (let j = i + 1; j <= 1000 + i; ++j) {
      hash = require("crypto").createHash('md5').update(input+j).digest("hex");
      const consecutive5 = hash.match(`(${consecutive3[1]})\\1{4}`);

      if (consecutive5) ++nKeys;
    }
  }
}

console.log(i-1);
