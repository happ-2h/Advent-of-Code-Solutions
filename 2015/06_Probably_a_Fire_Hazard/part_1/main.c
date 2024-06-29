/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 6.1
 */

#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Each bit in an 8-bit integer is treated as a light
#define N_LIGHTS (1000*1000) >> 3

typedef struct POINT_STRUCT {
  int x;
  int y;
} point_t;

uint8_t lights[N_LIGHTS];

/**
 * Executes the given instruction
 *
 * @param cmd: command to execute [on | off | toggle]
 * @param p1:  starting point/coordinates (x, y)
 * @param p2:  ending point/coordinates (x, y)
 */
void execute(const char* cmd, const char* p1, const char* p2);

/**
 * Helper function that converts a string
 * (in "x,y" format) to integers for point_t
 *
 * @param point: data structure to fill x,y data
 * @param str:   string to extract data from
 */
void getPoints(point_t* const point, const char* str);

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    // Initialize the array
    for (size_t i = 0; i < N_LIGHTS; ++i) lights[i] = 0x00;

    // Hold data from the input file
    char buf[0xFF]; // Input buffer
    char cmd[8];    // Command
    char p1[8];     // Point 1
    char p2[8];     // Point 2

    // Parse input
    while (fscanf(ifile, "%254s", buf) != EOF) {
      if (strcmp(buf, "turn") == 0) {
        fscanf(ifile, "%3s", cmd);
        fscanf(ifile, "%7s", p1);
        fscanf(ifile, "%254s", buf); // "through" [[ignored]]
        fscanf(ifile, "%7s", p2);

        execute(cmd, p1, p2);
      }
      else if (strcmp(buf, "toggle") == 0) {
        strncpy(cmd, buf, 8);        // Save "toggle" literal
        fscanf(ifile, "%7s", p1);
        fscanf(ifile, "%254s", buf); // "through" [[ignored]]
        fscanf(ifile, "%7s", p2);

        execute(cmd, p1, p2);
      }
      else fprintf(stderr, "%s %s\n", "Bad command: ", buf);
    }

    // Count bits
    int nBits = 0;
    for (size_t i = 0; i < N_LIGHTS; ++i) {
      for (; lights[i]; lights[i] >>= 1)
        nBits += (lights[i] & 1);
    }

    printf("%d\n", nBits);

    fclose(ifile);
    ifile = NULL;
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}

void getPoints(point_t* const point, const char* str) {
  char* pTemp;
  pTemp = strtok(str, ",");
  point->x = strtol(pTemp, NULL, 10);
  pTemp = strtok(NULL, ",");
  point->y = strtol(pTemp, NULL, 10);
}

void execute(const char* cmd, const char* p1, const char* p2) {
  point_t pt1;
  point_t pt2;

  getPoints(&pt1, p1);
  getPoints(&pt2, p2);

  for (int x = pt1.x; x <= pt2.x; ++x) {
    for (int y = pt1.y; y <= pt2.y; ++y) {
      size_t bit = x+y*1000; // 2D index as 1D

      // Turn on light; do nothing if already on
      if (strcmp(cmd, "on") == 0)
        lights[bit>>3] |= (1<<(7-bit&0x7));

      // Turn off light; do nothing if already off
      else if (strcmp(cmd, "off") == 0) {
        uint8_t mask = 0xFF ^ (1<<(7-bit&0x7)); // Manual unsigned flipping (NOT)
        lights[bit>>3] &= mask;
      }

      // Turn on a light if it's off; turn off a light if it's on
      else if (strcmp(cmd, "toggle") == 0)
        lights[bit>>3] ^= (1<<(7-bit&0x7));

      else fprintf(stderr, "Unknown command %s\n", cmd);
    }
  }
}