/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 2.1
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * @brief Finds largest number in the given array.
 *        Assumes elements are positive integers.
 *
 * @param arr - array to find the largest number in
 * @param n   - number of elements in the array (length)
 *
 * @returns the largest number in the given array
 */
int max(int arr[], size_t n) {
  int maxN = -1;
  for (size_t i = 0; i < n; ++i)
    if (arr[i] > maxN) maxN = arr[i];

  return maxN;
}

/**
 * @brief Finds smallest number in the given array.
 *        Assumes elements are positive integers less than 10,000.
 *
 * @param arr - array to find the smallest number in
 * @param n   - number of elements in the array (length)
 *
 * @returns the smallest number in the given array
 */
int min(int arr[], size_t n) {
  int minN = 10000;
  for (size_t i = 0; i < n; ++i)
    if (arr[i] < minN) minN = arr[i];

  return minN;
}

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    char buf[0xFF];   // File line buffer
    int checksum = 0; // Final checksum

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
      // Total up checksum
      checksum += max(nums, 0x10) - min(nums, 0x10);
    }

    fprintf(stdout, "%d\n", checksum);

    fclose(ifile);

  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}