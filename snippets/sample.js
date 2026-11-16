#!/usr/bin/env node
'use strict';

import fs from 'node:fs/promises';
import { EventEmitter } from 'node:events';
import * as path from 'node:path';

/**
 * Sample program covering JavaScript language tokens.
 * @module sample
 */

// ── Constants and variables ──
const MAX_RETRIES = 3;
const PI_APPROX = 3.14159;
const HEX = 0xff, OCTAL = 0o17, BINARY = 0b1010, BIG = 9007199254740993n;
const EXPONENT = 1.5e-3;
let counter = 0;
var legacy = null;
let notDefined = undefined;
const notANumber = NaN, infinite = Infinity;
const escaped = 'Tab:\t Quote:\' Unicode:é Backslash:\\';
const pattern = /^(?<user>[\w.]+)@(\w+)\.com$/gi;

/* Block comment: object literal */
const config = {
  name: 'sample',
  version: 1.0,
  enabled: true,
  tags: ['theme', 'test'],
  nested: { depth: 2 },
  'quoted-key': "double quoted",
  [`computed_${counter}`]: 42,
  greet() {
    return `Hello from ${this.name} v${this.version}`;
  },
};

// ── Functions ──
function add(a, b = 0) {
  return a + b;
}

const multiply = (x, y) => x * y;

function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

/**
 * Wait for the given duration.
 * @param {number} ms - Milliseconds to wait.
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ── Classes ──
class Animal {
  #secret = 'hidden';
  static count = 0;

  constructor(name, age) {
    this.name = name;
    this.age = age;
    Animal.count++;
  }

  get description() {
    return `${this.name} (${this.age})`;
  }

  set nickname(value) {
    this._nickname = value.trim();
  }

  speak() {
    throw new Error('Not implemented');
  }

  static create(name) {
    return new this(name, 0);
  }

  #reveal() {
    return this.#secret;
  }
}

class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age);
    this.breed = breed;
  }

  speak() {
    return `${this.name} says Woof!`;
  }

  toString() {
    return `Dog(${super.description}, ${this.breed})`;
  }
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

// ── Async / await ──
async function readConfig(file) {
  try {
    const content = await fs.readFile(path.join('.', file), 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to read ${file}:`, error.message);
    return null;
  } finally {
    console.log('readConfig done');
  }
}

// ── Main ──
async function main() {
  // Operators
  const arithmetic = (10 + 3) * 2 - 8 / 4 % 3 ** 2;
  const bitwise = (HEX & 0x0f) | (1 << 2) ^ ~0 >> 1 >>> 0;
  const logical = counter >= 0 && counter !== 1 || !false;
  const nullish = legacy ?? 'fallback';
  const optional = config?.nested?.depth;
  const ternary = counter > 0 ? 'positive' : 'zero';
  counter += 1; counter -= 1; counter *= 2; counter ||= 5; counter++;
  console.log(typeof counter, counter instanceof Object, 'name' in config);

  // Create instances and call methods
  const dog = new Dog('Rex', 3, 'Labrador');
  console.log(dog.speak());
  console.log(dog.toString(), Animal.count);
  dog.nickname = '  Rexy  ';

  // Destructuring and spread
  const { name, tags: [firstTag, ...otherTags], nested: { depth } } = config;
  const merged = { ...config, extra: true };
  const numbers = [5, 3, 8, 1, 9];
  const [first, , third] = numbers;

  // Loops
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === 3) continue;
    if (numbers[i] > 8) break;
  }
  for (const n of range(0, 5)) console.log(n);
  for (const key in config) console.log(key);
  let count = 0;
  while (count < 3) count++;
  do { count--; } while (count > 0);

  outer: for (const x of [1, 2]) {
    for (const y of [1, 2]) {
      if (x * y === 2) break outer;
    }
  }

  // Switch
  switch (ternary) {
    case 'positive':
      console.log('Positive');
      break;
    default:
      console.log('Zero');
  }

  // Array methods and callbacks
  const doubled = numbers.map((n) => n * 2).filter((n) => n > 5).sort((a, b) => a - b);
  console.log(doubled.join(', '));

  // Regex
  const match = 'john.doe@example.com'.match(/^(?<user>[\w.]+)@/);
  console.log(match?.groups?.user, pattern.test('a@b.com'));

  // Map, Set, Symbol, Promise
  const map = new Map([['a', 1], ['b', 2]]);
  const set = new Set(numbers);
  const id = Symbol('id');
  const results = await Promise.all([sleep(10), readConfig('config.json')]);

  // Events
  const emitter = new EventEmitter();
  emitter.on('ready', (msg) => console.log(`Event: ${msg}`));
  emitter.emit('ready', 'started');

  // Errors
  try {
    throw new ValidationError('Invalid age', 'age');
  } catch (err) {
    if (err instanceof ValidationError) console.warn(err.field, err.message);
  }

  delete merged.extra;
  void 0;
  debugger;

  console.log(arithmetic, bitwise, logical, nullish, optional, name, firstTag, otherTags, depth);
  console.log(first, third, map.get('a'), set.has(3), id.toString(), results, multiply(2, 3));
  console.log(add(1), sum(1, 2, 3), config.greet(), escaped, MAX_RETRIES, PI_APPROX);
  console.log(OCTAL, BINARY, BIG, EXPONENT, notDefined, notANumber, infinite, globalThis.process.argv);
}

main().then(() => console.log('Done')).catch(console.error);

export { Animal, Dog, add };
export default main;
