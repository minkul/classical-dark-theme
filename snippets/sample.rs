//! Sample program covering Rust language tokens.

use std::collections::HashMap;
use std::fmt::{self, Display};
use std::sync::{Arc, Mutex};
use std::thread;

// ── Constants and statics ──
const MAX_RETRIES: u32 = 3;
const PI_APPROX: f64 = 3.14159;
const HEX: u8 = 0xFF;
const OCTAL: u32 = 0o17;
const BINARY: u32 = 0b1010;
const BIG: u64 = 1_000_000u64;
static GREETING: &str = "Hello, World!";
static mut COUNTER: i32 = 0;

// ── Enums ──
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
enum Color {
    Red,
    Green,
    Blue,
}

#[derive(Debug)]
enum Shape {
    Circle { radius: f64 },
    Rectangle(f64, f64),
    Empty,
}

// ── Traits ──
/// Anything that can speak.
trait Speaker {
    fn speak(&self) -> String;

    fn introduce(&self) -> String {
        format!("I say: {}", self.speak())
    }
}

// ── Structs ──
#[derive(Debug, Clone, Default)]
pub struct Animal {
    pub name: String,
    age: u8,
}

#[derive(Debug)]
struct Dog {
    animal: Animal,
    breed: String,
}

struct Point<T> {
    x: T,
    y: T,
}

struct Wrapper<'a> {
    text: &'a str,
}

#[derive(Debug)]
enum AppError {
    Validation(String),
    NotFound { id: u32 },
}

// ── Implementations ──
impl Animal {
    pub fn new(name: &str, age: u8) -> Self {
        Self { name: name.to_string(), age }
    }

    pub fn age(&self) -> u8 {
        self.age
    }

    pub fn birthday(&mut self) {
        self.age += 1;
    }
}

impl Dog {
    fn new(name: &str, age: u8, breed: impl Into<String>) -> Self {
        Dog { animal: Animal::new(name, age), breed: breed.into() }
    }
}

impl Speaker for Dog {
    fn speak(&self) -> String {
        format!("{} says Woof!", self.animal.name)
    }
}

impl Display for Dog {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Dog({}, {}, {})", self.animal.name, self.animal.age, self.breed)
    }
}

impl<T: std::ops::Add<Output = T> + Copy> Point<T> {
    fn sum(&self) -> T {
        self.x + self.y
    }
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle { radius } => std::f64::consts::PI * radius * radius,
            Shape::Rectangle(w, h) => w * h,
            Shape::Empty => 0.0,
        }
    }
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::Validation(msg) => write!(f, "validation error: {msg}"),
            AppError::NotFound { id } => write!(f, "not found: {id}"),
        }
    }
}

impl std::error::Error for AppError {}

// ── Functions ──
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn largest<T: PartialOrd + Copy>(items: &[T]) -> Option<T> {
    let mut max = *items.first()?;
    for &item in items {
        if item > max {
            max = item;
        }
    }
    Some(max)
}

fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() > b.len() { a } else { b }
}

fn validate(age: i32) -> Result<i32, AppError> {
    if age < 0 {
        return Err(AppError::Validation(format!("age must be positive: {}", age)));
    }
    Ok(age)
}

fn parse_and_double(input: &str) -> Result<i32, Box<dyn std::error::Error>> {
    let value: i32 = input.trim().parse()?;
    Ok(value * 2)
}

fn describe<S>(speaker: &S) -> String
where
    S: Speaker + ?Sized,
{
    speaker.introduce()
}

async fn fetch(id: u32) -> Option<String> {
    Some(format!("item-{id}"))
}

macro_rules! square {
    ($x:expr) => {
        $x * $x
    };
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }
}

fn main() {
    // Variables and types
    let i: i32 = 42;
    let mut mutable = 10_i64;
    let unsigned: usize = 7;
    let float = 1.5e3_f32;
    let flag: bool = true && !false;
    let letter: char = 'A';
    let byte: u8 = b'a';
    let escaped = "Tab:\t Quote:\" Unicode:\u{00e9} Backslash:\\";
    let raw = r#"C:\path\to\"file""#;
    let bytes = b"bytes";
    let tuple: (i32, f64, &str) = (1, 2.0, "three");
    let array: [i32; 5] = [5, 3, 8, 1, 9];
    let owned = String::from("owned");
    let borrowed: &str = &owned;
    let unit = ();

    // Operators
    let arithmetic = (i + 3) * 2 - 10 / 5 % 3;
    let bitwise = (i & 0x0F) | (i ^ 1) << 2 >> 1;
    let comparison = i >= 10 && i != 0 || i <= -1;
    let casted = float as i32;
    let range = 0..=10;
    mutable += 1;
    mutable *= 2;

    // Create instances and call methods
    let mut dog = Dog::new("Rex", 3, "Labrador");
    dog.animal.birthday();
    println!("{}", dog.speak());
    println!("{dog} is {} years old: {:?}", dog.animal.age(), dog);
    println!("{}", describe(&dog));

    let point = Point { x: 3, y: 4 };
    let shapes = vec![Shape::Circle { radius: 2.0 }, Shape::Rectangle(3.0, 4.0), Shape::Empty];
    let total_area: f64 = shapes.iter().map(Shape::area).sum();

    // Collections and closures
    let mut scores: HashMap<&str, i32> = HashMap::new();
    scores.insert("Alice", 90);
    scores.entry("Bob").or_insert(75);
    let threshold = 80;
    let passed: Vec<_> = scores.iter().filter(|(_, &s)| s >= threshold).map(|(n, _)| *n).collect();
    let doubled = array.iter().map(|n| n * 2).collect::<Vec<i32>>();
    let mut sorted = array.to_vec();
    sorted.sort_by(|a, b| b.cmp(a));

    // Loops
    for (idx, value) in array.iter().enumerate() {
        if *value == 3 {
            continue;
        }
        if *value > 8 {
            break;
        }
        print!("{idx}:{value} ");
    }
    println!();

    let mut count = 0;
    while count < 3 {
        count += 1;
    }
    let result = loop {
        count -= 1;
        if count == 0 {
            break count * 10;
        }
    };

    'outer: for x in 0..3 {
        for y in 0..3 {
            if x * y == 2 {
                break 'outer;
            }
        }
    }

    // Pattern matching
    let color = Color::Blue;
    match color {
        Color::Red => println!("Red"),
        Color::Green | Color::Blue => println!("Green or Blue"),
    }
    let grade = match arithmetic {
        n if n >= 90 => 'A',
        80..=89 => 'B',
        _ => 'C',
    };
    if let Some(max) = largest(&array) {
        println!("Largest: {max}");
    }
    let Some(first) = array.first() else {
        return;
    };

    // Errors
    match validate(-1) {
        Ok(age) => println!("Valid age: {age}"),
        Err(e) => eprintln!("Error: {e}"),
    }
    let parsed = parse_and_double("21").unwrap_or_default();

    // Ownership, smart pointers, threads
    let shared = Arc::new(Mutex::new(0));
    let handles: Vec<_> = (0..3)
        .map(|_| {
            let shared = Arc::clone(&shared);
            thread::spawn(move || {
                *shared.lock().unwrap() += 1;
            })
        })
        .collect();
    for handle in handles {
        handle.join().expect("thread panicked");
    }

    unsafe {
        COUNTER += 1;
    }

    let wrapper = Wrapper { text: longest("short", "longer") };
    let boxed: Box<dyn Speaker> = Box::new(Dog::new("Max", 5, String::from("Beagle")));
    let _future = fetch(1);

    println!("{unsigned} {flag} {letter} {byte} {escaped} {raw} {bytes:?} {tuple:?} {borrowed} {unit:?}");
    println!("{bitwise} {comparison} {casted} {range:?} {mutable} {} {total_area:.2}", point.sum());
    println!("{passed:?} {doubled:?} {sorted:?} {result} {grade} {first} {parsed} {:?}", shared);
    println!("{} {} {}", wrapper.text, boxed.speak(), square!(4));
    println!("{MAX_RETRIES} {PI_APPROX} {HEX} {OCTAL} {BINARY} {BIG} {GREETING} {:?}", Animal::default());
}
