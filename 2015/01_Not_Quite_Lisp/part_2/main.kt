/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 1.2
 */

import java.io.File

fun main(args: Array<String>) {
  var floor = 0 // Start at floor 0
  var pos   = 0 // Current position


  File("../input.txt").readLines()[0]
    .forEach outer@ {
      // We've hit the basement
      if (floor == -1) return@outer

      /*
        '(' = ascend floor
        ')' = descend floor
       */
      floor = if (it == '(') floor + 1 else floor - 1
      ++pos
    }

  println(pos)
}