/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 2.2
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * @brief Compare function for qsort. Descending sort.
 *
 * @param a - first argument to comapre against
 * @param b - second argument to compare against
 *
 * @returns negative integer value if a > b
 *          positive integer value if a < b
 *          zero                   if a = b
 */
int cmp_desc(const void* a, const void* b) {
  int arg1 = *(const int*)a;
  int arg2 = *(const int*)b;

  return (arg1 < arg2) - (arg1 > arg2);
}

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    char buf[0xFF]; // File line buffer
    int ttl = 0;    // Summed up quotients

    // Parse file
    while(fgets(buf, 0xFF, ifile)) {
      char* pch = strtok(buf, "\t");

      int nums[0x10]; // Holds individual numbers in each line
      size_t index = 0;

      // Get individual numbers
      while(pch != NULL) {
        nums[index++] = strtol(pch, NULL, 10);
        pch = strtok(NULL, "\t");
      }

      // Sort descending for proper remainder checking
      qsort(nums, 0x10, sizeof(int), cmp_desc);

      // Find evenly divisible values and sum up their quotient
      for (size_t i = 0; i < 0x10-1; ++i) {
        for (size_t j = i+1; j < 0x10; ++j)
          if (nums[i]%nums[j] == 0) ttl += nums[i] / nums[j];
      }
    }

    fprintf(stdout, "%d\n", ttl);

    fclose(ifile);
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}