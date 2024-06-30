/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 3.2
 */

#include <stdio.h>

#define FILE_ROWS 1902
#define FILE_COLS 3

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    char buf[0x15];
    int possibleTris = 0;
    int sides[FILE_ROWS][FILE_COLS];

    // Convert to 2d array
    size_t row = 0;
    while(fgets(buf, sizeof buf, ifile)) {
      sscanf(buf, "%d %d %d", &sides[row][0], &sides[row][1], &sides[row][2]);
      ++row;
    }
    fclose(ifile);
    ifile = NULL;

    for (size_t y = 0, i = 0; i < FILE_ROWS / 3; ++i, y+=3) {
      for (size_t x = 0; x < 3; ++x) {
        // Check for valid triangle vertically
        // - Sum of two sides > remaining side
        if (
          sides[y][x] + sides[y+1][x] > sides[y+2][x] &&
          sides[y][x] + sides[y+2][x] > sides[y+1][x] &&
          sides[y+1][x] + sides[y+2][x] > sides[y][x]
        ) ++possibleTris;
      }
    }

    fprintf(stdout, "%d\n", possibleTris);
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}