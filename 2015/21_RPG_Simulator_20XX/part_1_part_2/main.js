/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 21.1 and 21.2
 */

class Item {
  #cost;
  #damage;
  #armor;

  constructor(cost, damage, armor) {
    this.#cost   = cost;
    this.#damage = damage;
    this.#armor  = armor;
  }

  get cost()   { return this.#cost; }
  get damage() { return this.#damage; }
  get armor()  { return this.#armor; }
};

const weapons = [
  new Item(8, 4, 0),  // Dagger
  new Item(10, 5, 0), // Shortsword
  new Item(25, 6, 0), // Warhammer
  new Item(40, 7, 0), // Longsword
  new Item(74, 8, 0)  // Greataxe
];

const armor = [
  new Item(0, 0, 0),  // Optional
  new Item(13, 0, 1), // Leather
  new Item(31, 0, 2), // Chainmail
  new Item(53, 0, 3), // Splintmail
  new Item(75, 0, 4), // Bandedmail
  new Item(102, 0, 5) // Platemail
];

const rings = [
  new Item(0, 0, 0),   // Optional
  new Item(25 ,1, 0),  // Damage +1
  new Item(50 ,2, 0),  // Damage +2
  new Item(100 ,3, 0), // Damage +3
  new Item(20 ,0, 1),  // Defense +1
  new Item(40 ,0, 2),  // Defense +2
  new Item(80 ,0, 3)   // Defense +3
];

/**
 *
 * @param {Integer} ttlDamage - Total damage of equipped items
 * @param {Integer} ttlArmor  - Total armor of equipped items
 *
 * @returns {Boolean}         - true if player's HP is greater than 0
 *                              false otherwise
 */
const simulate = (ttlDamage, ttlArmor) => {
  const player = {
    hp: 100,
    damage: ttlDamage,
    armor:  ttlArmor
  };
  // Boss stats based on input
  const boss = {
    hp: 100,
    damage: 8,
    armor:  2
  };

  let playerTurn = true;

  while (boss.hp > 0 && player.hp > 0) {
    let damageDealt = 0;

    if (playerTurn) {
      damageDealt = player.damage - boss.armor;

      boss.hp = damageDealt > 0 ? boss.hp - damageDealt : boss.hp - 1;
    }
    else {
      damageDealt = boss.damage - player.armor;

      player.hp = damageDealt > 0 ? player.hp - damageDealt : player.hp - 1;
    }

    playerTurn = !playerTurn;
  }

  return player.hp > 0; // did player win?
};

let spentWin = [];
let spentLoss = []; // For part 2

// Go through every possible combination
for (const wpn of weapons) {
  for (const amr of armor) {
    for (const ring1 of rings) {
      for (const ring2 of rings) {
        let ttlCost = 0;
        if (
          (ring1.cost == 0 && ring2.cost == 0) || // Can have no rings
          ring1.cost != ring2.cost                // Can't have same ring
        ) {
          ttlCost = wpn.cost + amr.cost + ring1.cost + ring2.cost;

          const playerWin = simulate(
            wpn.damage + ring1.damage + ring2.damage,
            amr.armor + ring1.armor + ring2.armor
          );

          if (playerWin) spentWin.push(ttlCost); // Part 1
          else spentLoss.push(ttlCost);          // Part 2
        }
      }
    }
  }
}

// Part 1
console.log(spentWin.sort((a,b) => a - b)[0]);

// Part 2
console.log(spentLoss.sort((a, b) => b - a)[0]);