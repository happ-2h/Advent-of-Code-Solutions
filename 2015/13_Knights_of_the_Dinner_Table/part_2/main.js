/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 13.2
 */

let input = null;

try {
  input = require('fs').readFileSync('../input.txt', 'utf-8').split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const people = new Map(); // Holds all people and their happiness units

  // Converts person's name to a number
  const pplI = new Map([
    ["Alice",   0],
    ["Bob",     1],
    ["Carol",   2],
    ["David",   3],
    ["Eric",    4],
    ["Frank",   5],
    ["George",  6],
    ["Mallory", 7],
    ["Myself",  8] // Added myself
  ]);
  // Converts a number to a person's name
  const iPpl = [
    "Alice", "Bob"  , "Carol" , "David",
    "Eric" , "Frank", "George", "Mallory",
    "Myself" // Added myself
  ];

  for (const str of input) {
    // Remove redundant info
    let parsed =
      str.replace(" would", "").replace(" happiness units by sitting next to", "").replace(".", "").split(" ");

    // Build the relation map
    people.set(parsed[0], {...people.get(parsed[0]), [parsed[3]]: parsed[1] == "gain" ? parsed[2] : '-'+parsed[2]});
  }

  // Added myself to people relations and the Map
  people.forEach((val, key, map) => {
    people.set(key, {...val, "Myself": "0"});
  });
  iPpl.forEach(person => {
    if (person === "Myself") return;

    people.set("Myself", {...people.get("Myself"), [person]: "0"});
  });

  const sums = [];         // Holds sum of each arrangement
  const arrangements = []; // Holds all possible arrangements

  /**
   * Creates all permutations based on an anchor
   *
   * @param {String} anchor  - The chosen anchor as the start point
   * @param {String} curr    - Current node it's working on
   * @param {Array}  arr     - Holds current arrangement
   * @param {Array}  visited - Holds which node has been visited
   */
  const possibleArrangements = (anchor, curr, arr, visited) => {
    visited[pplI.get(curr)] = true;

    if(curr !== anchor)arr.push(curr);

    for (let i = 0; i < visited.length; ++i)
      if (!visited[i]) possibleArrangements(anchor, iPpl[i], [...arr], [...visited]);

    arr.unshift(anchor); // Add the anchor to the beginning

    // Only want completed arrangements
    if (arr.length >= visited.length) {
      arrangements.push(arr);
      arr = [];
    }
  };

  /**
   * Adds up all happiness units based on seating arrangement

   * @param {Array} arrs - Array of arrangements
   */
  const calculateArrangements = (arrs) => {
    let sum = 0; // Holds total sum of each arrangement

    for (const arr of arrs) {
      for (let i = 0; i < arr.length; ++i) {
        if (i < arr.length-1) {
          sum += +people.get(arr[i])[arr[i+1]]; // Forward value  (a to b)
          sum += +people.get(arr[i+1])[arr[i]]; // Backward value (b to a)
        }
        else {
          sum += +people.get(arr[i])[arr[0]]; // Last to first
          sum += +people.get(arr[0])[arr[i]]; // First to last
        }
      }

      sums.push(sum);
      sum = 0;
    }
  };

  possibleArrangements("Alice", "Alice", new Array(), new Array(people.size).fill(false));

  calculateArrangements(arrangements);
  console.log(sums.sort((a, b) => b - a)[0]); // Retrieve the greatest value
}
else console.error("Failed to read input.txt");