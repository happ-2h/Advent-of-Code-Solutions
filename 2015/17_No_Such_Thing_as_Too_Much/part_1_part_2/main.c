/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 17.1 and 17.2
 */
#include <stdio.h>

#define MAX_CONTAINERS 0x20

/**
   * @brief Get number of combinations that fit in amoutn of liters
   *
   * @param liters:     Total liters
   * @param start:      Beginning of container list
   * @param end:        End of container list
   * @param containers: Pointer to list of container sizes
   * @param n:          Number of elements in the container list
   *
   * @returns Number of combinations of containersthat fit exactly in "liters"
   */
int nCombos(int liters, int start, int end, const int* const containers, const size_t n) {
  if (end < 0)          return 0;
  else if (liters == 0) return 1;
  else if (start == n || liters < 0) return 0;

  return nCombos(liters, start + 1, end, containers, n) +
         nCombos(liters - containers[start], start + 1, end - 1, containers, n);
}

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    int containers[MAX_CONTAINERS];
    int liters = 0;
    int i = 0;

    // Get input
    while (fscanf(ifile, "%d", &liters) != EOF)
      containers[i++] = liters;

    // Part 1
    printf("%d\n", nCombos(150, 0, i, containers, i));

    // Part 2
    int diff = 0;
    int end  = 0;
    while(!(diff = nCombos(150, 0, ++end, containers, i)));

    printf("%d\n", diff);

    fclose(ifile);
    ifile = NULL;
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}
