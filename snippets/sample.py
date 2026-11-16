#!/usr/bin/env python3
"""Sample program covering Python language tokens.

This module docstring should be colored as a comment.
"""

from __future__ import annotations

import asyncio
import json
import re
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from enum import Enum, auto
from pathlib import Path
from typing import Any, Callable, Generic, Iterator, Optional, Protocol, TypeVar

# ── Constants and variables ──
MAX_RETRIES: int = 3
PI_APPROX = 3.14159
HEX, OCTAL, BINARY = 0xFF, 0o17, 0b1010
BIG_NUMBER = 1_000_000
COMPLEX = 3 + 4j
EXPONENT = 1.5e-3
NOTHING = None
FLAGS = (True, False, ...)
escaped = "Tab:\t Quote:\" Unicode:\u00e9 Backslash:\\"
raw = r"C:\path\to\file"
byte_string = b"bytes"
multiline = """Line one
Line two"""
pattern = re.compile(r"^(?P<user>[\w.]+)@(\w+)\.com$", re.IGNORECASE)

T = TypeVar("T")


# ── Enum ──
class Color(Enum):
    RED = auto()
    GREEN = auto()
    BLUE = auto()


# ── Protocol and abstract base class ──
class Speaker(Protocol):
    def speak(self) -> str: ...


class Animal(ABC):
    """Base class for animals."""

    count: int = 0

    def __init__(self, name: str, age: int = 0) -> None:
        self.name = name
        self._age = age
        self.__secret = "hidden"
        Animal.count += 1

    @property
    def age(self) -> int:
        return self._age

    @age.setter
    def age(self, value: int) -> None:
        if value < 0:
            raise ValueError(f"Age must be positive: {value}")
        self._age = value

    @abstractmethod
    def speak(self) -> str:
        pass

    @classmethod
    def create(cls, name: str) -> Animal:
        return cls(name)

    @staticmethod
    def kingdom() -> str:
        return "Animalia"

    def __repr__(self) -> str:
        return f"{type(self).__name__}({self.name!r}, {self._age})"


class Dog(Animal):
    def __init__(self, name: str, age: int, breed: str = "Mixed") -> None:
        super().__init__(name, age)
        self.breed = breed

    def speak(self) -> str:
        return f"{self.name} says Woof!"


# ── Dataclass and generics ──
@dataclass(frozen=True)
class Point:
    x: float
    y: float = 0.0
    tags: list[str] = field(default_factory=list)

    def distance(self, other: Point) -> float:
        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5


class Box(Generic[T]):
    def __init__(self, value: T) -> None:
        self.value = value

    def map(self, fn: Callable[[T], Any]) -> Box[Any]:
        return Box(fn(self.value))


class ValidationError(Exception):
    def __init__(self, message: str, field_name: str) -> None:
        super().__init__(message)
        self.field_name = field_name


# ── Functions ──
def add(a: int, b: int = 0) -> int:
    """Return the sum of two numbers."""
    return a + b


def summarize(*args: int, sep: str = ", ", **kwargs: Any) -> str:
    return sep.join(str(a) for a in args) + str(kwargs)


def countdown(n: int) -> Iterator[int]:
    while n > 0:
        yield n
        n -= 1


def timer(func: Callable[..., T]) -> Callable[..., T]:
    def wrapper(*args, **kwargs) -> T:
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)

    return wrapper


@timer
def greet(name: str, *, loud: bool = False) -> str:
    message = f"Hello, {name}!"
    return message.upper() if loud else message


async def fetch(delay: float) -> dict[str, Any]:
    await asyncio.sleep(delay)
    return {"delay": delay, "ok": True}


square = lambda x: x * x
counter = 0


def increment() -> None:
    global counter
    counter += 1


# ── Main ──
def main() -> None:
    # Operators
    arithmetic = (10 + 3) * 2 - 8 / 4 // 3 % 2 ** 3
    bitwise = (HEX & 0x0F) | (1 << 2) ^ ~0 >> 1
    logical = counter >= 0 and counter != 1 or not False
    identity = NOTHING is None and "a" in "abc" and 1 is not 2
    if (n := len(escaped)) > 10:
        print(f"Length is {n:>5d}, pi is {PI_APPROX:.2f}")

    # Create instances and call methods
    dog = Dog("Rex", 3, breed="Labrador")
    print(dog.speak(), repr(dog), Animal.kingdom(), Dog.create("Max"))
    dog.age = 4

    point = Point(3.0, 4.0)
    print(point.distance(Point(0, 0)))
    print(Box(10).map(lambda v: f"Value: {v}").value)

    # Collections and comprehensions
    numbers = [5, 3, 8, 1, 9]
    squares = {n: square(n) for n in numbers if n % 2}
    unique = {n for n in numbers}
    pairs = list(zip(numbers, numbers[1:]))
    first, *rest = numbers
    sliced = numbers[::-1][1:3]

    # Loops
    for i, value in enumerate(numbers):
        if value == 3:
            continue
        if value > 8:
            break
    else:
        print("Loop completed")

    while counter < 3:
        increment()

    for color in Color:
        print(color.name, color.value)

    # Match statement
    match point:
        case Point(x=0, y=0):
            print("Origin")
        case Point(x=x, y=0):
            print(f"On x-axis at {x}")
        case _:
            print("Somewhere else")

    # Exceptions and context managers
    try:
        raise ValidationError("Invalid age", "age")
    except (ValidationError, KeyError) as error:
        print(f"Error: {error}")
    else:
        print("No error")
    finally:
        print("Done")

    with open(__file__, encoding="utf-8") as handle:
        first_line = handle.readline().strip()

    match_obj = pattern.match("john.doe@example.com")
    assert match_obj is not None, "Pattern must match"
    data = json.dumps({"name": match_obj.group("user")}, indent=2)
    result = asyncio.run(fetch(0.01))

    del sliced
    print(arithmetic, bitwise, logical, identity, squares, unique, pairs, first, rest)
    print(first_line, data, result, list(countdown(3)), greet("World", loud=True))
    print(add(1), summarize(1, 2, extra=True), Path.cwd(), isinstance(dog, Animal))
    print(MAX_RETRIES, OCTAL, BINARY, BIG_NUMBER, COMPLEX, EXPONENT, FLAGS, raw, byte_string, multiline)


if __name__ == "__main__":
    main()
