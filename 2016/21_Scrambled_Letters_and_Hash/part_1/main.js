/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 21.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const scrambleStr = "abcdefgh".split('');

  /**
   * Swap letters at indexes x and y if arguments are integers
   * Swap letter x with y if arguments are characters
   *
   * @param {Integer | Character} x - index or letter x
   * @param {Integer | Character} y - index or letter y
   */
  const swap = (x, y) => {
    let ix = isNaN(x) ? scrambleStr.findIndex(el => el == x) : +x;
    let iy = isNaN(y) ? scrambleStr.findIndex(el => el == y) : +y;

    [scrambleStr[ix], scrambleStr[iy]] = [scrambleStr[iy], scrambleStr[ix]];
  };

  /**
   * if type=["left" | "right"]: Rotate string left or right n steps
   * If type="based":            Rotate right based on position of letter x
   *
   * @param {String} type - left/right or based on position of letter x
   * @param {Integer} x   - number of steps to rotate
   */
  const rotate = (type, x) => {
    if (type == "left") {
      for (let i = 0; i < +x; ++i) {
        let carry = scrambleStr[0]; // Save first letter

        // current letter = next letter
        for (let j = 0; j < scrambleStr.length-1; ++j)
          scrambleStr[j] = scrambleStr[j+1];

        // Restore first character to the end
        scrambleStr[scrambleStr.length-1] = carry;
      }
    }
    else if (type == "right") {
      for (let i = 0; i < +x; ++i) {
        let carry = scrambleStr[scrambleStr.length-1]; // Save last letter

        // Current letter = previous letter (backwards)
        for (let j = scrambleStr.length-1; j > 0; --j)
          scrambleStr[j] = scrambleStr[j-1];

        // Restore last character to beginning
        scrambleStr[0] = carry;
      }
    }
    else if (type == "based") {
      // Find index of x
      let ix = scrambleStr.findIndex(el => el == x);

      // Rotate right once + index number
      // Also, if index is at least 4, add one more shift
      ix = ix >= 4 ? ix + 2 : ix + 1;

      for (let i = 0; i < ix; ++i) {
        let carry = scrambleStr[scrambleStr.length-1]; // Save last letter

        // Current letter = previous letter (backwards)
        for (let j = scrambleStr.length-1; j > 0; --j)
          scrambleStr[j] = scrambleStr[j-1];

        // Restore last character to the beginning
        scrambleStr[0] = carry;
      }
    }
  };

  /**
   * Reverse, in order, the span of letters at
   * indexes x through y, inclusive
   *
   * @param {Integer} x - start of span of letters
   * @param {Integer} y - end of span of letters
   */
  const reverse = (x, y) => {
    // Swap at each end and progress inward after every step
    while (+x < +y) {
      [scrambleStr[+x], scrambleStr[+y]] = [scrambleStr[+y], scrambleStr[+x]];
      ++x;
      --y;
    }
  };

  /**
   * Letter at index x should be inserted at y
   *
   * @param {Integer} x - letter at index x to be moved
   * @param {Integer} y - index y to be inserted to
   */
  const move = (x, y) => {
    let temp = scrambleStr[+x];

    // Shift the string to make room for
    // letter that was removed
    if (+x < +y) {
      // Left shift
      for (let i = +x; i <= +y; ++i)
        scrambleStr[i] = scrambleStr[i+1];
    }
    else {
      // Right shift
      for (let i = +x; i > +y; --i)
        scrambleStr[i] = scrambleStr[i-1];
    }

    // Insert letter at y
    scrambleStr[+y] = temp;
  };

  // Parse input
  for (const str of input) {
    const parsedInput = str.split(' ');

    switch(parsedInput[0]) {
      case "swap":
        swap(parsedInput[2], parsedInput[5]);
        break;
      case "rotate":
        if (parsedInput[1] == "based")
          rotate(parsedInput[1], parsedInput[6]);
        else rotate(parsedInput[1], parsedInput[2]);
        break;
      case "reverse":
        reverse(parsedInput[2], parsedInput[4]);
        break;
      case "move":
        move(parsedInput[2], parsedInput[5]);
        break;
      default:
        console.error(`unknown command ${parsedInput[0]}`);
        break;
    }
  }

  console.log(scrambleStr.join(''));
}
else console.error("Failed to read input.txt");