// Sample program covering Dart language tokens.

import 'dart:async';
import 'dart:convert' show jsonEncode;
import 'dart:math' as math;

/// Constants and top-level variables.
const int maxRetries = 3;
const double piApprox = 3.14159;
const hex = 0xFF;
const exponent = 1.5e-3;
final greeting = 'Hello, World!';
var counter = 0;
late String lateValue;
String? nothing;
const escaped = 'Tab:\t Quote:\' Unicode:\u00e9 Dollar:\$';
const raw = r'C:\path\to\file';
const multiline = '''
Line one
Line two''';
final pattern = RegExp(r'^(?<user>[\w.]+)@(\w+)\.com$');

// ── Enum ──
enum Color {
  red('#FF0000'),
  green('#00FF00'),
  blue('#0000FF');

  const Color(this.hex);
  final String hex;
}

// ── Mixin, interface, abstract class ──
mixin Greets {
  String get name;

  String greet([String greeting = 'Hello']) => '$greeting, I am $name!';
}

abstract interface class Speaker {
  String speak();
}

abstract class Animal with Greets implements Speaker, Comparable<Animal> {
  static int count = 0;

  @override
  final String name;
  int _age;

  Animal(this.name, [this._age = 0]) {
    count++;
  }

  Animal.newborn(String name) : this(name, 0);

  int get age => _age;
  set age(int value) {
    if (value < 0) throw ArgumentError.value(value, 'age');
    _age = value;
  }

  @override
  int compareTo(Animal other) => _age.compareTo(other._age);

  @override
  String toString() => '$runtimeType($name, $_age)';
}

final class Dog extends Animal {
  final String breed;

  Dog(super.name, super.age, {this.breed = 'Mixed'});

  @override
  String speak() => '$name says Woof!';
}

class Point {
  final double x, y;

  const Point(this.x, [this.y = 0]);

  factory Point.origin() => const Point(0, 0);

  Point operator +(Point other) => Point(x + other.x, y + other.y);

  double distanceTo(Point other) => math.sqrt(math.pow(x - other.x, 2) + math.pow(y - other.y, 2));
}

class Box<T extends Comparable<T>> {
  final T value;

  Box(this.value);

  Box<R> map<R extends Comparable<R>>(R Function(T) transform) => Box(transform(value));
}

sealed class Shape {}

class Circle extends Shape {
  final double radius;
  Circle(this.radius);
}

class Square extends Shape {
  final double side;
  Square(this.side);
}

extension StringX on String {
  String shout() => '${toUpperCase()}!';
}

typedef Predicate<T> = bool Function(T value);

class ValidationException implements Exception {
  final String message;
  ValidationException(this.message);

  @override
  String toString() => 'ValidationException: $message';
}

// ── Functions ──
int add(int a, [int b = 0]) => a + b;

String describe({required String name, int age = 0}) => '$name is $age';

double area(Shape shape) => switch (shape) {
      Circle(radius: var r) => math.pi * r * r,
      Square(:final side) => side * side,
    };

Iterable<int> countdown(int n) sync* {
  while (n > 0) {
    yield n--;
  }
}

Stream<int> ticks(int count) async* {
  for (var i = 0; i < count; i++) {
    await Future.delayed(const Duration(milliseconds: 10));
    yield i;
  }
}

Future<String> fetch(int id) async {
  await Future<void>.delayed(Duration.zero);
  return 'item-$id';
}

void validate(int age) {
  if (age < 0) {
    throw ValidationException('Age must be positive: $age');
  }
}

@Deprecated('Use add instead')
int oldAdd(int a, int b) => a + b;

Future<void> main(List<String> args) async {
  // Variables and types
  int i = 42;
  double d = -2.5;
  num n = 3;
  bool flag = true && !false;
  dynamic dyn = 'dynamic';
  Object obj = i;
  final inferred = 'inferred';
  lateValue = 'assigned later';

  // Operators
  final arithmetic = (i + 3) * 2 - 10 / 5 % 3;
  final intDivision = i ~/ 5;
  final bitwise = (i & 0x0F) | (i ^ 1) << 2 >> 1 >>> 0;
  final comparison = i >= 10 && i != 0 || i <= -1;
  final nullish = nothing ?? 'fallback';
  final length = nothing?.length;
  nothing ??= 'set';
  final isInt = obj is int;
  final casted = obj as int;
  i += 1;
  i++;

  // Create instances and call methods
  final dog = Dog('Rex', 3, breed: 'Labrador');
  dog.age = 4;
  print(dog.speak());
  print(dog.greet('Hi'));
  print('$dog, total: ${Animal.count}');

  final point = const Point(3, 4) + Point.origin();
  final box = Box(10).map((v) => 'Value: $v');

  // Collections
  final numbers = <int>[5, 3, 8, 1, 9];
  final scores = <String, int>{'Alice': 90, 'Bob': 75};
  final unique = {1, 2, 2, 3};
  final combined = [...numbers, if (flag) 10, for (var x in unique) x * 100];
  final doubled = numbers.where((n) => n > 2).map((n) => n * 2).toList();
  final Predicate<int> isEven = (value) => value.isEven;

  // Loops
  for (var idx = 0; idx < numbers.length; idx++) {
    if (numbers[idx] == 3) continue;
    if (numbers[idx] > 8) break;
  }
  for (final entry in scores.entries) {
    print('${entry.key}: ${entry.value}');
  }
  var count = 0;
  while (count < 3) {
    count++;
  }
  do {
    count--;
  } while (count > 0);

  outer:
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if (x * y == 2) break outer;
    }
  }

  // Switch and patterns
  switch (Color.blue) {
    case Color.red:
      print('Red');
    case Color.green || Color.blue:
      print('Green or Blue');
  }
  final (first, second) = (1, 'two');
  if (scores case {'Alice': int aliceScore}) {
    print('Alice scored $aliceScore');
  }

  // Exceptions
  try {
    validate(-1);
  } on ValidationException catch (e) {
    print('Error: $e');
  } catch (e, stackTrace) {
    print('Unknown: $e $stackTrace');
  } finally {
    print('Done');
  }

  // Async
  final item = await fetch(1);
  await for (final tick in ticks(2)) {
    print('tick $tick');
  }
  final results = await Future.wait([fetch(2), fetch(3)]);
  assert(results.length == 2, 'Expected two results');

  final match = pattern.firstMatch('john.doe@example.com');
  print(match?.namedGroup('user'));

  print([d, n, dyn, inferred, lateValue, arithmetic, intDivision, bitwise, comparison, nullish, length]);
  print([isInt, casted, point.distanceTo(Point.origin()), box.value, combined, doubled, isEven(4), first, second]);
  print([item, results, add(1), describe(name: 'Rex'), area(Circle(2)), countdown(3).toList(), 'hi'.shout()]);
  print([maxRetries, piApprox, hex, exponent, greeting, escaped, raw, multiline, jsonEncode(scores), null]);
}
