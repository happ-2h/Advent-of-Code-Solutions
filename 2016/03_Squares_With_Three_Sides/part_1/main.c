/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 3.1
 */

#include <stdio.h>

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    char buf[0x20];
    int sides[3];
    int possibleTris = 0;

    while(fgets(buf, sizeof buf, ifile)) {
      sscanf(buf, "%d %d %d", &sides[0], &sides[1], &sides[2]);

      // Check for valid triangle
      // - Sum of two sides > remaining side
      if (
        (sides[0] + sides[1]) > sides[2] &&
        (sides[0] + sides[2]) > sides[1] &&
        (sides[1] + sides[2]) > sides[0]
      ) ++possibleTris;
    }

    fprintf(stdout, "%d\n", possibleTris);

    fclose(ifile);
    ifile = NULL;
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}