/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 1.1
 *
 * Notes:
 *  Compiled and ran on Qualcomm Snapdragon 865 (Android OnePlus 8T)
 *  Solution stored in x0
 */
     .global _start
_start:
  // Open file in read-only mode
  mov     x8, #56       // syscall openat
  mov     x0, #-100     // Use CWD
  ldr     x1, =filename // Pointer to file name
  mov     x2, #0        // Read only
  svc     0

  // Check if file open failed (negative number returned)
  cmp     x0, #0
  blt     _exit

  // Save fd for closing file
  str     x0, [sp, #16]!

  // Read contents to buffer
  mov     x8, #63       // syscall read
  ldr     x1, =buffer   // pointer to buffer
  ldr     x2, =len      // Length of buffer
  svc     0

  // Check if read failed (negative number returned)
  cmp     x0, #0
  blt     _exit

  // Close file; all file operations complete
  mov     x8, #57       // syscall close
  ldr     x0, [sp], #16 // Restore fd
  svc     0

  // Check if close failed (non-zero value)
  cbnz    x0, _exit

  // x0 is zero if above didn't branch
  // Used for floor count

  ldr     x1, =buffer
  mov     x3, #0        // Current position
_loop:
  ldrb    w2, [x1], #1  // Load char from buffer
  cmp     w2, 0x0A      // Is char a newline
  beq     _exit         // Program done if so
  cmp     w2, '('       // If   '(' then increment floor
  bne     1f            // else ')' then decrement floor
  add     x0, x0, #1    // Increment floor
  b       2f            // Go to position check
1:
  sub     x0, x0, #1    // Decrement floor
2:
  cmn     x0, #1        // Check if basement reached
  bmi     _found        // End execution; solution found
  add     x3, x3, #1    // Increment position
  b _loop               // Check next char

_found:
  mov x0, x3            // Store solution in x0
/*
  Status:
    Negative number:     file operations failed
    Non-negative number: solution
 */
_exit:
  mov     x8, #93       // Exit syscall
  svc     0

  .data
filename: .asciz "../input.txt"
buffer  : .fill 7001, 1, 0
len     = .-buffer
