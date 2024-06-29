/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 2.2
 */

import java.io.File

fun main(args: Array<String>) {
  var ttlSqft: Int = 0

  File("../input.txt").readLines().forEach {
    // Convert string line to sorted integers
    val  dimensions: List<Int> =
      it.split('x')
        .sortedBy{ it.toInt() }
        .map{ it.toInt() }

    // Perimeter of smallest side
    ttlSqft += (dimensions[0] shl 1) + (dimensions[1] shl 1)

    // Feet required for bow
    ttlSqft += dimensions[0] * dimensions[1] * dimensions[2]
  }

  println(ttlSqft)
}