/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 2.2
 */

#include <stdio.h>

typedef struct VEC2D_STRUCT {
  int x;
  int y;
} vec2d_t;

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    char line[550]; // Line buffer
    char code[6] = {' ', ' ', ' ', ' ', ' ', '\0'}; // Final code
    size_t code_i = 0; // Index for appending keypad key
    vec2d_t pos = {0, 2}; // Start at '5'

    const char keypad[][5] = {
      {'0', '0', '1', '0', '0'},
      {'0', '2', '3', '4', '0'},
      {'5', '6', '7', '8', '9'},
      {'0', 'A', 'B', 'C', '0'},
      {'0', '0', 'D', '0', '0'}
    };

    while(fgets(line, sizeof line, ifile)) {
      for(char* pch = line; *pch != '\0'; ++pch) {
        // If in array and diamond bounds, move
        switch(*pch) {
          case 'U':
            if (
              pos.y-1 >= 0 &&
              keypad[pos.y-1][pos.x] != '0'
            ) --pos.y;
            break;
          case 'D':
            if (
              pos.y+1 < sizeof(keypad) / sizeof(keypad[0]) &&
              keypad[pos.y+1][pos.x] != '0'
            ) ++pos.y;
            break;
          case 'L':
            if (
                pos.x-1 >= 0 &&
                keypad[pos.y][pos.x-1] != '0'
              ) --pos.x;
            break;
          case 'R':
            if (
                pos.x+1 < sizeof(keypad[0]) / sizeof(keypad[0][0]) &&
                keypad[pos.y][pos.x+1] != '0'
              ) ++pos.x;
            break;
          default: break;
        }
      }

      // Save key
      code[code_i++] = keypad[pos.y][pos.x];
    }

    fclose(ifile);
    ifile = NULL;

    fprintf(stdout, "%s\n", code);
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}