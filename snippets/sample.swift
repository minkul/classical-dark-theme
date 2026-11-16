// Sample program covering Swift language tokens.

import Foundation

// MARK: - Constants and variables

let maxRetries = 3
let piApprox: Double = 3.14159
let hex = 0xFF, octal = 0o17, binary = 0b1010
let big = 1_000_000
let exponent = 1.5e-3
var counter = 0
var nothing: String? = nil
let escaped = "Tab:\t Quote:\" Unicode:\u{00e9} Backslash:\\"
let raw = #"C:\path\to\file"#
let multiline = """
    Line one
    Counter is \(counter)
    """

// MARK: - Protocols

/// Anything that can speak.
protocol Speaker {
    var name: String { get }
    func speak() -> String
}

extension Speaker {
    func introduce() -> String {
        "I am \(name). \(speak())"
    }
}

// MARK: - Enums

enum Color: String, CaseIterable {
    case red = "#FF0000"
    case green = "#00FF00"
    case blue = "#0000FF"
}

enum Shape {
    case circle(radius: Double)
    case rectangle(width: Double, height: Double)

    var area: Double {
        switch self {
        case .circle(let radius):
            return .pi * radius * radius
        case let .rectangle(width, height):
            return width * height
        }
    }
}

enum ValidationError: Error, LocalizedError {
    case negative(Int)

    var errorDescription: String? {
        switch self {
        case .negative(let value): return "Age must be positive: \(value)"
        }
    }
}

// MARK: - Classes and structs

class Animal: Speaker, CustomStringConvertible {
    static var count = 0
    let name: String
    private(set) var age: Int

    var description: String { "\(type(of: self))(\(name), \(age))" }

    init(name: String, age: Int = 0) {
        self.name = name
        self.age = age
        Animal.count += 1
    }

    deinit {
        print("\(name) deinitialized")
    }

    func speak() -> String {
        fatalError("Subclasses must override")
    }

    func birthday() {
        age += 1
    }

    class func kingdom() -> String { "Animalia" }
}

final class Dog: Animal {
    let breed: String

    init(name: String, age: Int, breed: String = "Mixed") {
        self.breed = breed
        super.init(name: name, age: age)
    }

    override func speak() -> String {
        "\(name) says Woof!"
    }
}

struct Point: Equatable, Hashable {
    var x: Double
    var y: Double = 0

    mutating func move(by dx: Double) {
        x += dx
    }

    static func + (lhs: Point, rhs: Point) -> Point {
        Point(x: lhs.x + rhs.x, y: lhs.y + rhs.y)
    }
}

struct Box<T: Comparable> {
    private(set) var value: T

    func map<R>(_ transform: (T) throws -> R) rethrows -> R {
        try transform(value)
    }
}

actor Counter {
    private var value = 0

    func increment() -> Int {
        value += 1
        return value
    }
}

@propertyWrapper
struct Clamped {
    private var value: Int
    var wrappedValue: Int {
        get { value }
        set { value = min(max(newValue, 0), 100) }
    }

    init(wrappedValue: Int) {
        value = wrappedValue
    }
}

// MARK: - Functions

func add(_ a: Int, to b: Int = 0) -> Int {
    a + b
}

func sum(_ numbers: Int...) -> Int {
    numbers.reduce(0, +)
}

func swapValues<T>(_ a: inout T, _ b: inout T) {
    (a, b) = (b, a)
}

func validate(age: Int) throws -> Int {
    guard age >= 0 else {
        throw ValidationError.negative(age)
    }
    return age
}

func fetch(id: Int) async -> String {
    try? await Task.sleep(nanoseconds: 1_000)
    return "item-\(id)"
}

@discardableResult
func log(_ message: String) -> Bool {
    print("[log] \(message)")
    return true
}

// MARK: - Main

// Operators
let arithmetic = (10 + 3) * 2 - 8 / 4 % 3
let bitwise = (hex & 0x0F) | (1 << 2) ^ ~0 >> 1
let logical = counter >= 0 && counter != 1 || !false
let nilCoalescing = nothing ?? "fallback"
let ternary = counter > 0 ? "positive" : "zero"
let closedRange = 1...5
let halfOpen = 0..<3
counter += 1

// Create instances and call methods
let dog = Dog(name: "Rex", age: 3, breed: "Labrador")
dog.birthday()
print(dog.speak())
print(dog.introduce(), dog, Animal.count, Animal.kingdom())

var point = Point(x: 3, y: 4)
point.move(by: 1)
let combined = point + Point(x: 1)
let box = Box(value: 10)
let mapped = box.map { "Value: \($0)" }

// Collections and closures
let numbers = [5, 3, 8, 1, 9]
var scores: [String: Int] = ["Alice": 90, "Bob": 75]
scores["Carol"] = 85
let unique: Set<Int> = [1, 2, 2, 3]
let passed = scores.filter { $0.value >= 80 }.map(\.key).sorted(by: >)
let doubled = numbers.map { n in n * 2 }.filter { $0 > 5 }

// Loops
for (index, value) in numbers.enumerated() {
    if value == 3 { continue }
    if value > 8 { break }
    print("\(index): \(value)")
}
for color in Color.allCases where color != .red {
    print(color, color.rawValue)
}
var count = 0
while count < 3 { count += 1 }
repeat { count -= 1 } while count > 0

outer: for x in 0..<3 {
    for y in 0..<3 where x * y == 2 {
        break outer
    }
}

// Switch and optionals
let shape = Shape.circle(radius: 2)
switch arithmetic {
case 90...:
    print("A")
case 80..<90:
    print("B")
case let n where n < 0:
    print("Negative \(n)")
default:
    print("C")
}

if let value = nothing {
    print(value)
} else if case .circle(let r) = shape, r > 1 {
    print("Big circle")
}

guard let first = numbers.first else { fatalError() }

// Errors
do {
    let age = try validate(age: -1)
    print(age)
} catch let error as ValidationError {
    print("Error: \(error.localizedDescription)")
} catch {
    print("Unknown: \(error)")
}
let maybeAge = try? validate(age: 5)

defer { print("Done") }

// Concurrency
Task {
    let counterActor = Counter()
    async let item = fetch(id: 1)
    let next = await counterActor.increment()
    print(await item, next)
}

let pattern = #/(?<user>[\w.]+)@(\w+)\.com/#
if let match = "john.doe@example.com".firstMatch(of: pattern) {
    print(match.user)
}

var a = 1, b = 2
swapValues(&a, &b)
log("Swapped")
print(maxRetries, piApprox, octal, binary, big, exponent, escaped, raw, multiline, bitwise, logical)
print(nilCoalescing, ternary, closedRange, halfOpen, combined, mapped, unique, passed, doubled, first)
print(shape.area, maybeAge as Any, add(1, to: 2), sum(1, 2, 3), a, b, #line)
