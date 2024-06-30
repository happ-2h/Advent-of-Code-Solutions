/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 18.1 and 18.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const rows_part1 = 40;
  const rows_part2 = 400000;

  // Entire map
  const map = [
    [...input]
  ];
  // Single row
  const row = new Array(map[0].length).fill('.');

  // Generate map
  // NOTE change rows_part2 to rows_part1 for part 1
  for (let i = 0; i < rows_part2-1; ++i) {
    // Generate row
    for (let j = 0; j < map[0].length; ++j) {
      // Check for traps
      if (
        // Left and center tiles are traps, but right is not
        (map[i][j-1] != undefined && map[i][j-1] == '^') &&
         map[i][j]   == '^' &&
        (map[i][j+1] == undefined || map[i][j+1] == '.')
      ) row[j] = '^';
      else if (
        // Center and right are traps, but left is not
         map[i][j] == '^' &&
        (map[i][j+1] != undefined && map[i][j+1] == '^') &&
        (map[i][j-1] == undefined || map[i][j-1] == '.')
      ) row[j] = '^';
      else if (
        // Only left is a trap
        (map[i][j-1] != undefined && map[i][j-1] == '^') &&
         map[i][j] == '.' &&
        (map[i][j+1] == undefined || map[i][j+1] == '.')
      ) row[j] = '^';
      else if (
        // Only right is a trap
        (map[i][j+1] != undefined && map[i][j+1] == '^') &&
         map[i][j] == '.' &&
        (map[i][j-1] == undefined || map[i][j-1] == '.')
      ) row[j] = '^';
      // Else tile is safe
      else row[j] = '.';
    }

    map.push([...row]);
  }

  // Count total safe tiles
  let ctr = 0;
  map.forEach(m => {
    ctr += m.filter(c => c =='.').length;
  });

  console.log(ctr);
}
else console.error("Failed to read input.txt");