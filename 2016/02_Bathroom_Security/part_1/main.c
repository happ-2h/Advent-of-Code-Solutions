/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 2.1
 */

#include <stdio.h>

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    char line[550];  // Stream buffer
    int code = 0;    // Final code
    int current = 5; // Current key

    // Parse file
    while(fgets(line, sizeof line, ifile)) {
      // Parse line
      for(char* pch = line; *pch != '\0'; ++pch) {
        switch(*pch) {
          case 'U':
            // 1 2 3 can't go up
            current = current < 4 ? current : current - 3;
            break;
          case 'D':
            // 7 8 9 can't go down
            current = current > 6 ? current : current + 3;
            break;
          case 'L':
            // 1 4 7 can't go left
            if (current != 1 && current != 4 && current != 7)
              --current;
            break;
          case 'R':
            // 3 6 9 can't go right
            if (current%3) ++current;
            break;
          case '\n': break; // Ignore newline
          default: // Unknown
            fprintf(stdout, "Unknown instruction %c\n", *pch);
            break;
        }
      }

      // Append current key to final code
      code = code * 10 + current;
    }

    fclose(ifile);
    ifile = NULL;

    fprintf(stdout, "%d\n", code);
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}