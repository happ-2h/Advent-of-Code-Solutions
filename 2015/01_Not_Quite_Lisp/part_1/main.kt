/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 1.1
 */

import java.io.File

fun main(args: Array<String>) {
  var floor = 0 // Start at floor 0

  /*
    '(' = ascend floor
    ')' = descend floor
   */
  File("../input.txt").readLines()[0]
    .forEach { floor = if (it == '(') floor + 1 else floor - 1 }

  println(floor)
}