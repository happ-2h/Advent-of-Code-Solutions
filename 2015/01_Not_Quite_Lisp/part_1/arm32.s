@@@
@ Author: happ_2h https://github.com/happ-2h
@
@ Solution for Advent of Code 2015 Day 1.1
@
@ Notes:
@  Compiled and ran on Raspberry PI 1 B+
@  Solution stored in r0
@@@

    .global _start
_start:
  @ Open file in read-only mode
  mov     r7, #0x05
  ldr     r0, =filename
  mov     r1, #0
  mov     r2, #0
  svc     0

  @ Check if open returned -1; terminate if so
  cmn     r0, #1
  bmi     _exit

  @ Preserve fd for closing file
  str     r0, [sp, #-4]!

  @ Read file and store contents to buffer
  mov     r7, #0x03
  ldr     r1, =buffer
  ldr     r2, =len
  svc     0

  @ Check if read returned -1; terminate if so
  cmn     r0, #1
  bmi     _exit

  @ Restore fd for closing
  ldr     r0, [sp], #4

  @ Close file
  mov     r7, #0x06
  svc     0

  @ Check if close returned -1; terminate if so
  cmn     r0, #1
  bmi     _exit

  @ r0 should be 0 if close was successful
  @ r1 holds buffer
loop:
  ldrb    r2, [r1], #1 @ Load 1 character from buffer
  cmp     r2, #0x28    @ Compare to '('
  addeq   r0, #1       @ Ascend floor if r2 = '('
  cmp     r2, #0x29    @ Compare to ')'
  subeq   r0, #1       @ Descend floor if r2 = ')'
  cmp     r2, #0       @ Compare to null terminator
  beq     _exit        @ Exit if reached
  bal     loop         @ Repeat if not reached

_exit:
  mov     r7, #1
  svc     0

.data
filename: .asciz "input.txt"
buffer:   .space 7001
len = .-buffer