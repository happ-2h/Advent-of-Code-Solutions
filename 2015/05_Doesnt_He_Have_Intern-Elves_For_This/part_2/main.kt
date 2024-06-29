/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 5.2
 */

import java.io.File

fun main(args: Array<String>) {
  var niceCtr = 0

  File("../input.txt").readLines().forEach {
    // Contains pair of any two letters that appears at least twice in the string without overlapping
    val pair = "([a-z]{2})[a-z]*\\1".toRegex().find(it)?.groups

    // Contains at least one letter which repeats with exactly one letter between them
    val repeat = "([a-z])[a-z]\\1".toRegex().find(it)?.groups

    if (pair != null && repeat != null) ++niceCtr
  }

  println(niceCtr)
}