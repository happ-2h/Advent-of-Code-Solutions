/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 2.1
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

    // Find surface area: 2*l*w + 2*w*h + 2*h*l
    ttlSqft += (
      dimensions[0] * dimensions[1] +
      dimensions[1] * dimensions[2] +
      dimensions[2] * dimensions[0]) shl 1

    // Add slack (area of smallest side)
    ttlSqft += dimensions[0] * dimensions[1]
  }

  println(ttlSqft)
}