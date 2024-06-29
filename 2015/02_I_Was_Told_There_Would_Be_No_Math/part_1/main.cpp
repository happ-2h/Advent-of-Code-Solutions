/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 2.1
 */

#include <algorithm>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <vector>

int main(int argc, char const *argv[]) {
  // Read input
  std::ifstream ifile("../input.txt");

  if (!ifile) {
    std::cout << "Failed to read input.txt\n";
    return 1;
  }
  else {
    std::vector<std::vector<int>> convertedInput{};

    // Extract data from file
    std::string line{};
    while(std::getline(ifile, line)) {
      int l{}, w{}, h{};             // Length, width, height
      std::vector<int> tmp_v{};      // Store l,w,h in an array
      std::string tmp_s{};           // Get data from file as string
      std::stringstream input(line); // Get line from file for parsing

      // Extract and store the data
      std::getline(input, tmp_s, 'x');
      l = std::atoi(tmp_s.c_str());
      tmp_v.push_back(l);
      std::getline(input, tmp_s, 'x');
      w = std::atoi(tmp_s.c_str());
      tmp_v.push_back(w);
      std::getline(input, tmp_s, 'x');
      h = std::atoi(tmp_s.c_str());
      tmp_v.push_back(h);

      // Sort for calculating slack
      std::sort(tmp_v.begin(), tmp_v.end());

      convertedInput.push_back(tmp_v);

      tmp_s = "";
      line  = "";
    }
    ifile.close();
    // End extraction

    int ttlSqft{};

    for (const auto& v : convertedInput) {
      // Find surface area 2*l*w + 2*w*h + 2*h*l
      ttlSqft += (
        v[0] * v[1] +
        v[1] * v[2] +
        v[2] * v[0]
      ) << 1;

      // Slack (area of smallest side)
      ttlSqft += v[0] * v[1];
    }

    std::cout << ttlSqft << '\n';
  }

  return 0;
}