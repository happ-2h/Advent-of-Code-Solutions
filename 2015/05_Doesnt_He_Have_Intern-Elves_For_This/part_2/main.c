/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 5.2
 *
 * Regex-less approach
 */

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * Checks if a string contains a pair of any two letters that
 * appears at least twice in the string without overlapping
 *
 * @param str: string to check
 *
 * @returns - true if string has two pairs of letters twice without overlapping
 *            false otherwise
*/
bool hasTwoPairs(const char* str);

/**
 * Checks if a string contains at least one letter which repeats
 * with exactly one letter between them
 *
 * @param str: string to check
 *
 * @returns - true if string has repeated letters with one between them
 *            false otherwise
*/
bool hasRepeatLetterAndInbetween(const char* str);

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    int niceStrings = 0;
    char buf[0xFF];

    // Check if string fits criteria
    while(fgets(buf, 0xFF, ifile)) {
      niceStrings =
        hasTwoPairs(buf)         &&
        hasRepeatLetterAndInbetween(buf)
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

bool hasTwoPairs(const char* str) {
  char pair[2];

  for (size_t i = 0; i < strlen(str)-1; ++i) {
    pair[0] = str[i];
    pair[1] = str[i + 1];

    // Check for another pair of the same characters
    for (size_t j = i + 2; j < strlen(str)-1; ++j) {
      if (pair[0] == str[j] && pair[1] == str[j + 1]) return true;
    }
  }

  return false;
}

bool hasRepeatLetterAndInbetween(const char* str) {
  // Check if character 2 more positions of current is the same (aaa is valid)
  for (size_t i = 0; i < strlen(str)-2; ++i)
    if (str[i] == str[i + 2]) return true;

  return false;
}