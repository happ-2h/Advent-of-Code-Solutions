/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 1.2
 */

#include <fstream>
#include <iostream>
#include <sstream>

int main(int argc, char const *argv[]) {
  // Read input
  std::ifstream ifile("../input.txt");

  if (!ifile) {
    std::cout << "Failed to read input.txt\n";
    return 1;
  }
  else {
    std::stringstream input;
    input << ifile.rdbuf();
    ifile.close();

    int floor{0};  // Start at floor 0
    int pos{0};    // Current position

    for (const char c : input.str()) {

      /*
        '(' = ascend floor
        ')' = descend floor
      */
      floor = c == '(' ? floor + 1 : floor - 1;

      ++pos;

      // We've hit the basement
      if (floor < 0) break;
    }

    std::cout << pos << '\n';
  }

  return 0;
}