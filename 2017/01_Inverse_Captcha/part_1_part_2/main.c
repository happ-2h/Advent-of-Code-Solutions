/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 1.1 and 1.2
 */

#include <stdio.h>
#include <stdlib.h>

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    int ttl = 0;
    int* nums = NULL; // Numbers from input
    int offset = 1;   // Offset of next digit
    size_t len;       // Total numbers in file for allocation

    // Allocate memory for storing numbers
    fseek(ifile, 0L, SEEK_END);
    len = ftell(ifile);
    fseek(ifile, 0L, SEEK_SET);
    nums = malloc(sizeof(int) * len);

    // Read all numbers
    for (size_t i = 0; i < len; ++i)
      fscanf(ifile, "%1d", &nums[i]);

    offset = len>>1; // Remove this line for part 1

    // Add up total if consecutive numbers are equal
    // Circular checking: out-of-bounds checks wrap around
    for (size_t i = 0; i < len; ++i)
      if (nums[i] == nums[(i+offset)%len]) ttl += nums[i];

    fprintf(stdout, "%d\n", ttl);

    free(nums);
    nums = NULL;

    fclose(ifile);
    ifile = NULL;
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}