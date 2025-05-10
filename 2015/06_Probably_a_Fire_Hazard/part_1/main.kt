/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 6.1
 */
import java.io.File

fun main(args: Array<String>) {
  /*
    1 light = 1 bit
    Each index has 8 lights
  */
  val lights = Array<Int>((1000*1000) shr 3) { 0 }

  // Parse input
  File("input.txt").readLines().forEach {
    val cmd = it.split(' ')

    when(cmd[0]) {
      "turn"   -> execute(cmd[1], cmd[2].split(","), cmd[4].split(","), lights)
      "toggle" -> execute(cmd[0], cmd[1].split(","), cmd[3].split(","), lights)
      else -> println("Unrecognized command ${cmd[0]}")
    }
  }

  // Count set bits (set = light is on)
  var nBits = 0
  for (i in lights.indices) {
    while (lights[i] != 0) {
      lights[i] = lights[i] and (lights[i] - 1)
      ++nBits
    }
  }

  println(nBits)
}

/**
 * Executes the given instruction
 *
 * @param cmd:    command to execute [on | off | toggle]
 * @param p1:     starting point/coordinates (x, y)
 * @param p2:     ending point/coordinates (x, y)
 * @param lights: container of light statuses
 */
fun execute(cmd: String, p1: List<String>, p2: List<String>, lights: Array<Int>) {
  for (x in p1[0].toInt() .. p2[0].toInt()) {
    for (y in p1[1].toInt() .. p2[1].toInt()) {
      val bit = x+y*1000 // 2D index as 1D

      when(cmd) {
        // Turn on a light; do nothing if it's already on
        "on" -> lights[bit shr 3] = lights[bit shr 3] or (1 shl (7 - bit and 0x7))
        // Turn off a light; do nothing if it's already off
        "off" -> {
          val mask = 0xFF xor (1 shl (7 - bit and 0x7)) // Manual unsigned flipping (NOT)
          lights[bit shr 3] = lights[bit shr 3] and mask
        }
        // Turn on a light if it's off; turn off a light if it's on
        "toggle" -> lights[bit shr 3] = lights[bit shr 3] xor (1 shl (7-bit and 0x7))
        else -> println("Unknown command $cmd")
      }
    }
  }
}