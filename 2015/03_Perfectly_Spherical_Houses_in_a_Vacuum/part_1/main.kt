/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 3.1
 */

import java.io.File

// Keep track of Cartesian coordinates
data class Santa(var x: Int, var y: Int)

fun main(args: Array<String>) {
  val path = File("../input.txt").readText()

  // Create and save starting point
  val santa: Santa = Santa(0, 0)
  val visited: MutableSet<String> = mutableSetOf(santa.toString())

  // Move based on input
  path.forEach {
    when(it) {
      '^' -> --santa.y
      'v' -> ++santa.y
      '<' -> --santa.x
      '>' -> ++santa.x
      else -> println("Unknown $it")
    }

    // Save result (unique)
    visited.add(santa.toString())
  }

  println(visited.size)
}