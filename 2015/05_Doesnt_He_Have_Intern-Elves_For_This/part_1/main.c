/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 5.1
 *
 * Regex-less approach
 */

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * Checks if a string has at least three vowels
 *
 * @param str: string to check
 *
 * @returns - true if string has at least three vowels
 *            false otherwise
*/
bool hasThreeVowels(const char* str);

/**
 * Checks if a string contains at least one letter that
 * appears twice in a row
 *
 * @param str: string to check
 *
 * @returns - true if string has two of the same consecutive characters
 *            false otherwise
*/
bool hasOneLetterTwiceInRow(const char* str);

/**
 * Checks if a string has the pairs 'ab', 'cd', 'pq', or 'xy'
 *
 * @param str: string to check
 *
 * @returns - true if a pair has been found
 *            false otherwise
*/
bool hasPairsAbCdPqXy(const char* str);

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    int niceStrings = 0;
    char buf[0xFF];

    // Check if string fits criteria
    while(fgets(buf, sizeof buf, ifile)) {
      niceStrings =
        hasThreeVowels(buf)         &&
        hasOneLetterTwiceInRow(buf) &&
        !hasPairsAbCdPqXy(buf)
          ? niceStrings + 1 : niceStrings;
    }

    fprintf(stdout, "%d\n", niceStrings);

    fclose(ifile);
    ifile = NULL;
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}

bool hasThreeVowels(const char* str) {
  int nVowels = 0;

  // Add up all the vowels and stop when we have 3
  for (size_t i = 0; i < strlen(str) && nVowels < 3; ++i) {
    if (
      str[i] == 'a' ||
      str[i] == 'e' ||
      str[i] == 'i' ||
      str[i] == 'o' ||
      str[i] == 'u'
    ) ++nVowels;
  }

  return nVowels >= 3;
}

bool hasOneLetterTwiceInRow(const char* str) {
  // Check if current letter is the same as the next
  for (size_t i = 0; i < strlen(str)-1; ++i)
    if (str[i] == str[i+1]) return true;

  return false;
}

bool hasPairsAbCdPqXy(const char* str) {
  // Check for pairs 'ab', 'cd', 'pq', or 'xy'
  for (size_t i = 0; i < strlen(str)-1; ++i) {
    if (
      (str[i] == 'a' && str[i+1] == 'b') ||
      (str[i] == 'c' && str[i+1] == 'd') ||
      (str[i] == 'p' && str[i+1] == 'q') ||
      (str[i] == 'x' && str[i+1] == 'y')
    )  return true;
  }

  return false;
}