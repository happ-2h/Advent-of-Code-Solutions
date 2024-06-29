/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 1.1
 */

#include <stdio.h>

#define BUF_LEN 0x2000

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    int floor = 0; // Start at floor 0

    char ch = ' ';
    while((ch = fgetc(ifile)) != EOF)
      /*
        '(' = ascend floor
        ')' = descend floor
      */
      floor = ch == '(' ? floor + 1 : floor - 1;

    fprintf(stdout, "%d\n", floor);

    fclose(ifile);
    ifile = NULL;
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}
