/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 4.1
 */
import java.security.MessageDigest

@OptIn(ExperimentalStdlibApi::class)
fun main(args: Array<String>) {
  val input = "yzbqklnj"
  var count = 0

  val md = MessageDigest.getInstance("MD5")

  while(
    !md.digest((input + count).toByteArray())
      .toHexString()
      .startsWith("00000")
  ) ++count

  println(count)
}