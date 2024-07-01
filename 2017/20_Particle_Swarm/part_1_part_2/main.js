/**
 * Author: @NE- https://github.com/NE-
 *
 * Solution for Advent of Code 2017 Day 20.1 and 20.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null){
  class Particle {
    #id;     // Particle number. NEVER_USED
    #p;      // Position
    #v;      // Velocity
    #a;      // Acceleration
    #isDead; // Determines if this particle should be deleted

    constructor(id, p, v, a) {
      this.#id = id;
      this.#p = { ...p };
      this.#v = { ...v };
      this.#a = { ...a };
      this.#isDead = false;
    }

    move() {
      // Update velocity
      this.#v.x += this.#a.x;
      this.#v.y += this.#a.y;
      this.#v.z += this.#a.z;

      // Update position
      this.#p.x += this.#v.x;
      this.#p.y += this.#v.y;
      this.#p.z += this.#v.z;
    }

    // Manhattan Distance
    mDist() {
      return Math.abs(this.#p.x) + Math.abs(this.#p.y) + Math.abs(this.#p.z);
    }

    // Check collision based on position (multiple particle collision allowed)
    checkCollision() {
      for (const p of particles) {
        if (p == this) continue;

        if (
          this.#p.x == p.p.x &&
          this.#p.y == p.p.y &&
          this.#p.z == p.p.z
        ) {
          this.#isDead = true;
          p.isDead = true;
        }
      }
    }

    // Mutators
    set isDead(dead) { this.#isDead = dead; }

    // Accessors
    get p() { return this.#p; }
    get isDead() { return this.#isDead; }
  };

  let particles = [];

  const parseInput = () => {
    for (let id = 0; id < input.length; ++id) {
      // Get the values inside chevrons
      const parsedStr = input[id].match(/<(.*?)>/g);
      const p = parsedStr[0].replace(/[<>]/g,"").split(",");
      const v = parsedStr[1].replace(/[<>]/g,"").split(",");
      const a = parsedStr[2].replace(/[<>]/g,"").split(",");

      // Create particle
      particles.push(
        new Particle(
          id,
          { x: +p[0], y: +p[1], z: +p[2] },
          { x: +v[0], y: +v[1], z: +v[2] },
          { x: +a[0], y: +a[1], z: +a[2] }
        )
      );
    }
  };

  parseInput();

  const update_limit = 500;

  // Simulate particle movement
  for (let i = 0; i < update_limit; ++i)
    for (const p of particles) p.move();

  // Part 1
  // Find particle closest to (0, 0, 0)
  let minI = 0;
  for (let i = 1; i < particles.length; ++i) {
    if (particles[i].mDist() < particles[minI].mDist())
      minI = i;
  }

  console.log(minI);

  // Part 2
  // Init particles
  particles = [];
  parseInput();

  for (let i = 0; i < update_limit; ++i) {
    // Update simultaneously if particle isn't dead
    for (const p of particles)
      if (!p.isDead) p.move();
    // Check collisions if particle isn't dead
    for (const p of particles)
      if (!p.isDead) p.checkCollision();
  }

  // Find total living particles
  let ttlAlive = 0;
  for (const p of particles)
    if (!p.isDead) ++ttlAlive;

  console.log(ttlAlive);

}
else console.error("Failed to read input.txt");