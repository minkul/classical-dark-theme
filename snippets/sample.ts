import { readFile } from 'node:fs/promises';
import type { IncomingMessage } from 'node:http';
import * as path from 'node:path';

/**
 * Sample program covering TypeScript language tokens.
 * @packageDocumentation
 */

// ── Constants and variables ──
const MAX_RETRIES: number = 3;
const API_URL = 'https://api.example.com' as const;
const HEX = 0xff, BINARY = 0b1010, BIG: bigint = 100n;
let counter = 0;
let maybe: string | null = null;
let unknownValue: unknown = 'hello';
let anything: any = 42;
const escaped = "Tab:\t Quote:\" Unicode:é";
const pattern: RegExp = /^\d{3}-\d{4}$/;

// ── Types, interfaces, enums ──
type ID = string | number;
type Point = { x: number; y: number };
type Readonly2D = Readonly<Point>;
type Callback<T> = (value: T, index: number) => void;
type Keys = keyof Point;
type Status = 'idle' | 'loading' | 'done';
type Unwrap<T> = T extends Promise<infer U> ? U : T;
type Mapped<T> = { [K in keyof T]?: T[K] };

interface Shape {
  readonly name: string;
  area(): number;
  describe?(): string;
}

interface Named {
  [key: string]: unknown;
}

enum Color {
  Red = '#FF0000',
  Green = '#00FF00',
  Blue = '#0000FF',
}

const enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

declare const VERSION: string;

namespace Geometry {
  export const ORIGIN: Point = { x: 0, y: 0 };

  export function distance(a: Point, b: Point = ORIGIN): number {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }
}

// ── Decorator ──
function log(target: unknown, context: ClassMethodDecoratorContext) {
  return function (this: unknown, ...args: unknown[]) {
    console.log(`Calling ${String(context.name)} with`, args);
    return (target as Function).apply(this, args);
  };
}

// ── Classes ──
abstract class Base implements Shape {
  static instances = 0;
  protected abstract readonly kind: string;

  constructor(public readonly name: string) {
    Base.instances++;
  }

  abstract area(): number;

  describe(): string {
    return `${this.name} (${this.kind}) has area ${this.area().toFixed(2)}`;
  }
}

class Circle extends Base {
  protected readonly kind = 'circle';
  #radius: number;

  constructor(radius: number) {
    super('Circle');
    this.#radius = radius;
  }

  get radius(): number {
    return this.#radius;
  }

  @log
  area(): number {
    return Math.PI * this.#radius ** 2;
  }
}

class Box<T extends { toString(): string }> {
  private items: T[] = [];

  add(item: T): this {
    this.items.push(item);
    return this;
  }

  map<R>(fn: (item: T) => R): R[] {
    return this.items.map(fn);
  }

  get size(): number {
    return this.items.length;
  }
}

// ── Functions ──
function identity<T>(value: T): T {
  return value;
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function assertDefined<T>(value: T | undefined): asserts value is T {
  if (value === undefined) throw new Error('Value is undefined');
}

function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return typeof value === 'number' ? value.toFixed(2) : value.toUpperCase();
}

const sum = (...numbers: number[]): number => numbers.reduce((a, b) => a + b, 0);

async function fetchJson<T>(file: string): Promise<T | undefined> {
  try {
    const text = await readFile(path.resolve(file), 'utf8');
    return JSON.parse(text) as T;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return undefined;
  } finally {
    console.log('fetchJson done');
  }
}

function handle(req: IncomingMessage): Status {
  switch (req.method) {
    case 'GET':
      return 'loading';
    default:
      return 'idle';
  }
}

// ── Main ──
async function main(): Promise<void> {
  const circle = new Circle(2);
  console.log(circle.describe(), circle.radius, Base.instances);

  const box = new Box<number>().add(1).add(2).add(3);
  const labels = box.map((n) => `#${n}`);

  const point: Point = { x: 3, y: 4 };
  const partial: Mapped<Point> = { x: 1 };
  const frozen = Object.freeze(point) satisfies Readonly2D;
  const tuple: [string, number, boolean?] = ['a', 1];
  const record: Record<Keys, number> = { x: 1, y: 2 };

  for (const color of Object.values(Color)) {
    console.log(color);
  }
  for (let i = 0; i < labels.length; i++) {
    if (i === 1) continue;
    console.log(labels[i]);
  }
  while (counter < 3) counter++;

  if (isString(unknownValue)) {
    console.log(unknownValue.toUpperCase());
  }
  const length = (anything as number) + (<number>anything) + maybe!?.length!;
  const data = await fetchJson<{ name: string }>('data.json');
  assertDefined(data);

  console.log(Geometry.distance(point), Direction.Up, identity<ID>(7), format(3.14159));
  console.log(sum(1, 2, 3), partial, frozen, tuple, record, length, handle, VERSION);
  console.log(MAX_RETRIES, API_URL, HEX, BINARY, BIG, escaped, pattern.test('555-1234'));
}

main().catch(console.error);

export { Circle, Box, Color };
export type { Shape, Point };
export default main;
