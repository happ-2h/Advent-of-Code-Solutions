/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 1.1
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct PERSON_STRUCT {
  int coords[2]; // 0: x, 1: y
  int facing;    // Facing cardinal direction
} person;

/**
 * Simulates steps based on input
 *
 * @param dir - Direction to face as 'R' (right) or 'L' (left)
 * @param n   - Number of steps forward
*/
void person_step(char dir, int n);

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    // Get file contents
    char buf[684];
    fgets(buf, sizeof buf, ifile);

    // Parse the file
    char* pch = strtok(buf, ",");
    while(pch != NULL) {
      person_step(pch[0], strtol(&pch[1], NULL, 10));
      pch = strtok(NULL, ", ");
    }

    // Calculate then print result
    const int distance = abs(person.coords[0]) + abs(person.coords[1]);

    fprintf(stdout, "%d\n", distance);

    fclose(ifile);
    ifile = NULL;
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}

void person_step(char dir, int n) {
  // Clamp it to 0-3
  person.facing =
    dir == 'L' ?
      (person.facing + 3)&3 : // Left is three 90 degree turns
      (person.facing + 1)&3;  // Right is one 90 degree turn

  // Move person
  switch(person.facing) {
    case 0: // North
      person.coords[1] -= n;
      break;
    case 1: // East
      person.coords[0] += n;
      break;
    case 2: // South
      person.coords[1] += n;
      break;
    case 3: // West
      person.coords[0] -= n;
      break;
    default: // Unknown
      fprintf(stderr, "Unknown direction %d", person.facing);
      break;
  }
}