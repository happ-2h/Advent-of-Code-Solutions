/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 25.1
 */

#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_INSTRUCTIONS 0x20
#define MAX_PATTERN_LENGTH 10

typedef struct INSTR_STRUCT {
  char type[4];
  char x[0xF];  // Argument x
  char y[0xF];  // Argument y
} instr_t;
instr_t instructions[MAX_INSTRUCTIONS];

int registers[] = { 0, 0, 0, 0 };
int pc = 0;

// Holds out signals
int pattern[MAX_PATTERN_LENGTH];
int patternPos = 0;

/**
 * Loads a file and parses instructions in file
 *
 * @param {String} filename - name of file to parse
 *
 * @returns {Boolean}       - true if file read succeded
 *                            false on failure
 */
bool loadFile(const char* filename);

/**
 * Initializes registers, program counter, and out signals container
 *
 * @param {Integer} a - value to initialize register a
 */
void init(int a);
void run(); // Runs interpreter

void cpy(); // Copies x (integer or register) into y (destination register)
void inc(); // Increase value of register 'x' by one
void dec(); // Decrease value of register 'x' by one
void jnz(); // Jumps y away if x is not zero

/**
 * Transmits x (integer or register value) as the
 * next value for the clock signal
 *
 * Checks if signal is 0,1,0,1,0,1...
 *
 * @returns {Integer} - -1 bad pattern
 *                       0 pattern not done
 *                       1 good pattern
*/
int out();

int main(int argc, char const *argv[]) {
  if (loadFile("../input.txt")) {
    run();
  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}

bool loadFile(const char* filename) {
  FILE* ifile = fopen(filename, "r");
  int pos = 0; // Orders instructions based on input

  if (ifile) {
    // Initialize instructions
    for (size_t i = 0; i < MAX_INSTRUCTIONS; ++i) strncpy(instructions[i].type, "nop\0", 4);

    // Parse input
    while(fscanf(ifile, "%4s", instructions[pos].type) != EOF) {
      if ( // Two argument instruction
        strncmp(instructions[pos].type, "cpy", 3) == 0 ||
        strncmp(instructions[pos].type, "jnz", 3) == 0
      ) {
        fscanf(ifile, "%s", instructions[pos].x);
        fscanf(ifile, "%s", instructions[pos].y);
      }
      else { // One argument instruction
        fscanf(ifile, "%s", instructions[pos].x);
        // For safety; never used
        instructions[pos].y[0] = 'Q';
        instructions[pos].y[1] = '\0';
      }

      ++pos;
    }

    fclose(ifile);
    ifile = NULL;
  }
  else return false; // File read fail

  // File read success
  return true;
}

void init(int a) {
  registers[0] = a;
  registers[1] = 0;
  registers[2] = 0;
  registers[3] = 0;
  pc = 0;

  for (size_t i = 0; i < MAX_PATTERN_LENGTH; ++i) pattern[i] = -1;
  patternPos = 0;
}

void run() {
  int curr_a = 0; // Current initial value in register a
  init(curr_a);

  bool running = true;

  while(running) {
    // Check instruction type and run appropriate method
    if      (strncmp(instructions[pc].type, "cpy", 3) == 0) cpy();
    else if (strncmp(instructions[pc].type, "inc", 3) == 0) inc();
    else if (strncmp(instructions[pc].type, "dec", 3) == 0) dec();
    else if (strncmp(instructions[pc].type, "jnz", 3) == 0) jnz();
    else if (strncmp(instructions[pc].type, "out", 3) == 0) {
      int res = out(); // Hold result

      // Bad pattern
      if (res == -1)
        // Increment register a and rerun
        init(++curr_a);
      // Good pattern
      else if (res == 1)
        // End execution
        running = false;
      // Continue normal flow
      else ++pc;
    }
    // End program if came across NOP
    else if (strncmp(instructions[pc].type, "nop", 3) == 0) running = false;
    // Unknown command, end program
    else {
      fprintf(stdout, "Unknown command %s. Exiting...\n", instructions[pc].type);
      running = false;
    }
  }

  fprintf(stdout, "%d\n", curr_a);
}

void cpy() {
  // Is register
  if (isalpha(instructions[pc].x[0]))
    registers[instructions[pc].y[0] - 'a'] = registers[instructions[pc].x[0] - 'a'];
  // Is integer literal
  else
    registers[instructions[pc].y[0] - 'a'] = strtol(instructions[pc].x, NULL, 10);
  ++pc;
}

void inc() {
  ++registers[instructions[pc].x[0] - 'a'];
  ++pc;
}

void dec() {
  --registers[instructions[pc].x[0] - 'a'];
  ++pc;
}

void jnz() {
  if (
    (isalpha(instructions[pc].x[0]) &&              // Is register
    registers[instructions[pc].x[0] - 'a'] != 0) || // And value is not 0
    strtol(instructions[pc].x, NULL, 10) != 0       // Or is integer literal and not 0
  ) pc += strtol(instructions[pc].y, NULL, 10);     // Jump y steps
  // Otherwise continue normal flow
  else ++pc;
}

int out() {
  // Append out signal
  pattern[patternPos++] = registers[instructions[pc].x[0] - 'a'];

  // If reached MAX_PATTERN_LENGTH, check if valid signal
  if (patternPos >= MAX_PATTERN_LENGTH) {
    for (size_t i = 0; i < MAX_PATTERN_LENGTH; i += 2) {
      // Desire 0,1,0,1,0,1...
      if (pattern[i] != 0 || pattern[i+1] != 1)
        return -1; // Bad pattern
    }

    return 1; // Good pattern
  }

  return 0; // Not done generating pattern
}