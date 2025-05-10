/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 6.2
 */
import java.io.File

fun main(args: Array<String>) {
  val lights = Array<Int>(1000*1000) { 0 }

  // Parse input
  File("input.txt").readLines().forEach {
    val cmd = it.split(' ')

    when(cmd[0]) {
      "turn"   -> execute(cmd[1], cmd[2].split(","), cmd[4].split(","), lights)
      "toggle" -> execute(cmd[0], cmd[1].split(","), cmd[3].split(","), lights)
      else -> println("Unrecognized command ${cmd[0]}")
    }
  }

  println(lights.sum())
}

/**
 * Executes the given instruction
 *
 * @param cmd:    command to execute [on | off | toggle]
 * @param p1:     starting point/coordinates (x, y)
 * @param p2:     ending point/coordinates (x, y)
 * @param lights: container of light brightness values
 */
fun execute(cmd: String, p1: List<String>, p2: List<String>, lights: Array<Int>) {
  for (x in p1[0].toInt() .. p2[0].toInt()) {
    for (y in p1[1].toInt() .. p2[1].toInt()) {
      val i = x+y*1000 // 2D index as 1D

      when(cmd) {
        // Increase brightness
        "on" -> ++lights[i]
        // Decrease brightness with a minimum of 0
        "off" -> lights[i] = if (lights[i] == 0) 0 else lights[i] - 1
        // Increase brightness by 2
        "toggle" -> lights[i] += 2
        else -> println("Unknown command $cmd")
      }
    }
  }
}
