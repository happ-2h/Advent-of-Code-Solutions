/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 3.1
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct VEC2D_STRUCT {
  int x;
  int y;
} vec2d_t;

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    vec2d_t* coords = NULL; // Holds all visited coordinates
    vec2d_t santa = {0, 0}; // Santa's coordinates

    // Allocate memory for number of moves
    fseek(ifile, 0L, SEEK_END);
    const size_t nMoves = ftell(ifile);
    coords = malloc(sizeof(vec2d_t) * nMoves);
    fseek(ifile, 0L, SEEK_SET);

    coords[0] = santa; // Save starting point

    char ch = 0x20;
    size_t i = 0; // Current index of coords array
    while((ch = getc(ifile)) != EOF) {
      switch(ch) {
        case '^': --santa.y; break;
        case 'v': ++santa.y; break;
        case '<': --santa.x; break;
        case '>': ++santa.x; break;
        default: break;
      }

      coords[++i] = santa;
    }

    fclose(ifile);
    ifile = NULL;

    int uniqHouses = 0;
    for (i = 0; i < nMoves; ++i) {
      bool isUnique = true;

      // Check for unique entries
      for (size_t j = i+1; j < nMoves && isUnique; ++j) {
        if (coords[i].x == coords[j].x && coords[i].y == coords[j].y) {
          isUnique = false;
          break;
        }
      }
      if (isUnique) ++uniqHouses;
    }

    fprintf(stdout, "%d\n", uniqHouses);

    free(coords);
    coords = NULL;
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}