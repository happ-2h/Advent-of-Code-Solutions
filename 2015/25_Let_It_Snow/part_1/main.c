/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 25.1
 */

#include <stdio.h>

int main(int argc, char const *argv[]) {
  int row = 1;
  int col = 1;
  long prevCode = 20151125;

  // Coordinates based on input
  while (row != 2947 || col != 3029) {
    prevCode = (prevCode * 252533) % 33554393;

    if (row == 1) {
      row = col + 1; // Go down
      col = 1;       // Stay on column 1
    }
    else {
      ++col; // Go right
      --row; // Go up
    }
  }

  fprintf(stdout, "%ld\n", prevCode);

  return 0;
}