/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 9.1 and 9.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split("\n");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  // Used to convert string data to numerical data
  // for the adjacency matrix
  const cityIndex = new Map([
    ["Faerun",        0],
    ["Norrath",       1],
    ["Tristram",      2],
    ["AlphaCentauri", 3],
    ["Arbre",         4],
    ["Snowdin",       5],
    ["Tambi",         6],
    ["Straylight",    7]
  ]);

  // Adjacency matrix to hold distance relations
  const adjMatrix = new Array(cityIndex.size).fill(0)
    .map(() => new Array(cityIndex.size).fill(0));

  // Fill adjacency matrix with data
  for (const str of input) {
    const data = str.split(/[\s=]+/);

    adjMatrix[cityIndex.get(data[0])][cityIndex.get(data[2])] = +data[3];
    adjMatrix[cityIndex.get(data[2])][cityIndex.get(data[0])] = +data[3];
  }

  const sums = [];  // Holds sums of all possible paths
  let weights = []; // Holds weights for final addition
                    // Purpose unused, but logic breaks if removed

  /**
   * Sums up all possible paths of
   * a given root node.
   *
   * @param {Number} root    - The root of the current node
   * @param {Number} curr    - The current node
   * @param {Array}  visited - Keeps track of visited nodes
   * @param {Number} sum     - Holds the sum of examined weights
   */
  const findPaths = (root, curr, visited, sum) => {
    if (visited[curr]) return; // If we visited a node already, leave. Never hit.

    visited[curr] = true;
    sum += adjMatrix[root][curr]; // Add up the weight
    weights.push(adjMatrix[root][curr]);

    // For every node we need to visit
    for (let i = 0; i < visited.length; ++i) {
      // If we havent visited, visit a child
      if (!visited[i]) findPaths(curr, i, [...visited], sum);
    }

    // Leave out 0
    // NOTE: Without weights.length > 0, it would push single weight values
    if (sum > 0 && weights.length > 0) {
      sums.push(sum);
      weights = [];
    }
  }; // End findPaths

  // Find path for every node
  for (let i = 0; i < adjMatrix.length; ++i)
    findPaths(i, i, new Array(adjMatrix.length).fill(false), 0);

  // Part 1, find the shortest path
  console.log(sums.sort((a, b) => a - b)[0]);

  // Part 2, find the longest path
  console.log(sums.sort((a, b) => a - b)[sums.length-1]);
}
else console.error("Failed to read input.txt");