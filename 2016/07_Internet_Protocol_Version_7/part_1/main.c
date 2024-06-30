/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 7.1
 */

#include <stdbool.h>
#include <stdio.h>

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    char buf[0xFF];
    int supportCtr = 0;

    while (fgets(buf, sizeof buf, ifile)) {
      bool isABBA     = false;
      bool isHypernet = false;

      // Stop check if remaining characters < 4
      for (const char* p_buf = buf; p_buf[3] != '\0'; ++p_buf) {
        if (*p_buf == '[')      isHypernet = true;  // Entered hypernet string
        else if (*p_buf == ']') isHypernet = false; // Left hypernet string

        if (p_buf[0] == p_buf[3] && p_buf[1] == p_buf[2] && p_buf[0] != p_buf[1]) {
          // If hypernet and ABBA, don't count it and move on
          if (isHypernet) {
            isABBA = false;
            break;
          }
          // Otherwise count it
          else isABBA = true;
        }
      }

      supportCtr += isABBA;
    }

    fprintf(stdout, "%d\n", supportCtr);

    fclose(ifile);
    ifile = NULL;
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}