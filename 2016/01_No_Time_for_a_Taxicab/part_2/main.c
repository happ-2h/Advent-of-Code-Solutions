/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 1.2
 */

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "linkedlist.h"

struct PERSON_STRUCT {
  int coords[2]; // 0: x, 1: y
  int facing;    // Facing cardinal direction
} person;

/**
 * Simulates steps based on input
 *
 * @param dir - Direction to face as 'R' (right) or 'L' (left)
 * @param n   - Number of steps forward
 *
 * @returns   - true if duplicate found
 *              false otherwise
*/
bool person_step(char dir, int n);

LinkedList_t* visited = NULL; // Holds visited coordinates

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    char buf[684];
    bool found = false; // Did we find a duplicate?

    visited = LinkedList_new();

    // Get file contents
    fgets(buf, sizeof buf, ifile);

    // Parse the file
    char* pch = strtok(buf, ",");
    while(pch != NULL && !found) {
      found = person_step(pch[0], strtol(&pch[1], NULL, 10));
      pch = strtok(NULL, ", ");
    }

    // Calculate then print results
    const int distance = abs(person.coords[0]) + abs(person.coords[1]);

    fprintf(stdout, "%d\n", distance);

    LinkedList_destroy(visited);
    fclose(ifile);
    ifile = NULL;
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}

bool person_step(char dir, int n) {
  // Clamp it to 0-3
  person.facing =
    dir == 'L' ?
      (person.facing + 3)&3 : // Left is three 90 degree turns
      (person.facing + 1)&3;  // Right is one 90 degree turn

  // Move person and keep track of every coordinate
  for (int i = 0; i < n; ++i) {
    switch(person.facing) {
      case 0: // North
        --person.coords[1];
        break;
      case 1: // East
        ++person.coords[0];
        break;
      case 2: // South
        ++person.coords[1];
        break;
      case 3: // West
        --person.coords[0];
        break;
      default: // Unknown
        fprintf(stderr, "Unknown direction %d", person.facing);
        break;
    }

    // Find the duplicate
    for (node_t* head = visited->head; head != NULL; head = head->next) {
      if (head->data[0] == person.coords[0] && head->data[1] == person.coords[1])
        return true; // Duplicate found
    }

    // Save coordinate for later checks
    visited->append(visited, person.coords);
  }

  // No duplicate found
  return false;
}