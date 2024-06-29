/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 3.1
 *
 * NOTE:
 *   Set not working; converting to string got closer
 *   but not correct answer
 */

#include <fstream>
#include <iostream>
#include <set>
#include <sstream>

struct vec2D_t {
  int x{0};
  int y{0};
} santa;
inline bool operator<(const vec2D_t& a, const vec2D_t& b) {
  return ( (a.x < b.x) || (a.y < b.y) );
}

int main(int argc, char const *argv[]) {
  std::fstream ifile("../input.txt");

  if (!ifile) {
    std::cout << "Failed to read input.txt";
    return 1;
  }
  else {
    std::stringstream input{};
    input << ifile.rdbuf();
    ifile.close();

    std::set<vec2D_t> visited;
    visited.insert(santa);

    for (const char dir : input.str()) {
      switch(dir) {
        case '^': --santa.y; break;
        case 'v': ++santa.y; break;
        case '<': --santa.x; break;
        case '>': ++santa.x; break;
        default: break;
      }

      visited.insert(santa);
    }

    std::cout << visited.size() << '\n';
  }

  return 0;
}