/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 11.1 and 11.2
 */

const input = "hepxcrrq";

/**
 * Checks if password has one increasing straight of
 * at least three letters (abc, bcd, cde, ..., xyz)
 *
 * @param {String} passw - password to check
 *
 * @returns {Boolean}    - true if password has one increasing straight
 *                         false otherwise
 */
const hasStraight = passw => {
  // Checks if consecutive characters are +1 of the previous
  for (let i = 0; i < passw.length-2; ++i) {
    if (passw[i].charCodeAt(0)   == passw[i+1].charCodeAt(0)-1 &&
        passw[i+1].charCodeAt(0) == passw[i+2].charCodeAt(0)-1)
      return true;
  }

  return false;
};

/**
 * Checks if given password is valid based on criteria
 *
 * @param {String} passwd - password to check
 *
 * @returns {Boolean}     - true if password fits criteria
 *                          false otherwise
 */
const isValid = passwd => {
  return hasStraight(passwd) &&          // At least 3 consecutive letters
    !(/[iol]/.test(passwd))  &&          // Does not contain 'i', 'o', or 'l'
    passwd.match(/(.)\1/g)?.length >= 2; // Two different, non-overlapping pairs of letters
};

/**
 * Increments the last character of a given string
 *
 * If the last character is 'z', it overflows to 'a' and
 * is carried to the character previous and repeats the process
 *
 * @param {String} passwd - string to increment the last character of
 *
 * @returns {Character}   - incremented character
 */
const incChar = passwd => {
  const currentChar = passwd.slice(-1); // Get last character

  // If the character is 'z', "overflow" to 'a' and carry, then check carry
  if (currentChar == 'z') return incChar(passwd.slice(0,-1)) + 'a';

  // Otherwise, return the string without the last character + incremented last character
  return passwd.slice(0,-1) + (String.fromCharCode(currentChar.charCodeAt(0) + 1));
};

let solution = input;

// Part 1
while(!isValid(solution))
  solution = incChar(solution);

console.log(solution);

// Part 2
solution = incChar(solution);

while(!isValid(solution))
  solution = incChar(solution);

console.log(solution);