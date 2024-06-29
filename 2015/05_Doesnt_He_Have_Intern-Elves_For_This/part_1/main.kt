/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 5.1
 */

import java.io.File

fun main(args: Array<String>) {
  var niceCtr = 0

  File("../input.txt").readLines().forEach {
    // At least three vowels
    val vowels = Regex("[aeiou]").findAll(it).count() >= 3

    // 1 letter that appears twice in a row
    val repeated = "([a-z])\\1".toRegex().find(it)?.groups

    // Does not contain the strings ab, cd, pq, or xy
    val noContain = "(ab|cd|pq|xy)".toRegex().find(it)?.groups

    if (vowels == true && repeated != null && noContain == null) ++niceCtr
  }

  println(niceCtr)
}