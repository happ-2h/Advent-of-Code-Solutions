/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 3.2
 */

import java.io.File

data class Vec2d(var x: Int, var y: Int)

fun main(args: Array<String>) {
  val path = File("../input.txt").readText()

  // Keep track of Cartesian coordinates
  val santa: Vec2d = Vec2d(0, 0)
  val robot: Vec2d = Vec2d(0, 0)

  // Save starting point
  val visited: MutableSet<String> = mutableSetOf(santa.toString())

  // Move based on input
  for (i in 0 until path.length) {
    // Even: Santa moves. Odd: robot moves
    when (path[i]) {
      '^' -> if (i and 1 == 0) --robot.y else --santa.y
      'v' -> if (i and 1 == 0) ++robot.y else ++santa.y
      '<' -> if (i and 1 == 0) --robot.x else --santa.x
      '>' -> if (i and 1 == 0) ++robot.x else ++santa.x
    }

    // Save result (unique)
    visited.add(if (i and 1 == 0) robot.toString() else santa.toString())
  }

  println(visited.size)
}