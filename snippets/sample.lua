#!/usr/bin/env lua
-- Sample program covering Lua language tokens.

--[[
  Block comment.
  Lua has no classes, so they are built from tables and metatables.
]]

local json = require("json")

-- ── Constants and variables ──
local MAX_RETRIES <const> = 3
local PI_APPROX = 3.14159
local HEX = 0xFF
local EXPONENT = 1.5e-3
local nothing = nil
local flag = true and not false
counter = 0 -- global variable
local escaped = "Tab:\t Quote:\" Unicode:\u{00e9} Backslash:\\"
local single = 'single quoted'
local long_string = [[
Long string
spanning lines]]

-- ── Class: Animal ──
local Animal = {}
Animal.__index = Animal
Animal.count = 0

function Animal.new(name, age)
  local self = setmetatable({}, Animal)
  self.name = name
  self.age = age or 0
  Animal.count = Animal.count + 1
  return self
end

function Animal:speak()
  error("speak() must be implemented")
end

function Animal:birthday()
  self.age = self.age + 1
end

function Animal:__tostring()
  return string.format("%s(%s, %d)", self.kind or "Animal", self.name, self.age)
end

-- ── Inheritance: Dog ──
local Dog = setmetatable({}, { __index = Animal })
Dog.__index = Dog
Dog.__tostring = Animal.__tostring

function Dog.new(name, age, breed)
  local self = Animal.new(name, age)
  self.kind = "Dog"
  self.breed = breed or "Mixed"
  return setmetatable(self, Dog)
end

function Dog:speak()
  return self.name .. " says Woof!"
end

-- ── Metatables and operators ──
local Point = {}
Point.__index = Point
Point.__add = function(a, b)
  return Point.new(a.x + b.x, a.y + b.y)
end

function Point.new(x, y)
  return setmetatable({ x = x, y = y or 0 }, Point)
end

-- ── Functions ──
local function add(a, b)
  return a + (b or 0)
end

local function sum(...)
  local total = 0
  for _, n in ipairs({ ... }) do
    total = total + n
  end
  return total, select("#", ...)
end

local function validate(age)
  if age < 0 then
    error({ code = "INVALID", message = "Age must be positive: " .. age })
  end
  return age
end

local square = function(x) return x * x end

local function counter_factory()
  local count = 0
  return function()
    count = count + 1
    return count
  end
end

-- ── Main ──
-- Operators
local arithmetic = (10 + 3) * 2 - 8 / 4 % 3 ^ 2
local floor_div = 7 // 2
local bitwise = (HEX & 0x0F) | (1 << 2) ~ ~0 >> 1
local comparison = arithmetic >= 0 and arithmetic ~= 1 or arithmetic <= -1
local length = #escaped
local concat = "Hello" .. ", " .. "Lua"
local default = nothing or "fallback"

-- Create instances and call methods
local dog = Dog.new("Rex", 3, "Labrador")
dog:birthday()
print(dog:speak())
print(tostring(dog), Animal.count)

local point = Point.new(3, 4) + Point.new(1)

-- Tables
local numbers = { 5, 3, 8, 1, 9 }
local scores = { Alice = 90, Bob = 75, ["Carol Ann"] = 85 }
local nested = { config = { depth = 2 }, list = { "a", "b" } }
table.insert(numbers, 7)
table.sort(numbers, function(a, b) return a < b end)

-- Loops
for i = 1, #numbers do
  if numbers[i] > 8 then
    break
  end
  if numbers[i] == 3 then
    goto continue
  end
  io.write(numbers[i], " ")
  ::continue::
end
print()

for name, score in pairs(scores) do
  print(name, score)
end

for i = 10, 1, -2 do
  io.write(i, " ")
end
print()

local count = 0
while count < 3 do
  count = count + 1
end
repeat
  count = count - 1
until count == 0

-- Conditionals
if arithmetic > 20 then
  print("Large")
elseif arithmetic > 10 then
  print("Medium")
else
  print("Small")
end

-- Errors
local ok, err = pcall(validate, -1)
if not ok then
  print("Error: " .. err.message)
end

-- Strings and patterns
local user = string.match("john.doe@example.com", "^([%w%.]+)@")
local upper = ("hello"):upper()
local formatted = string.format("%-10s|%5d|%8.2f", "Lua", 42, PI_APPROX)

-- Coroutines
local producer = coroutine.create(function()
  for i = 1, 3 do
    coroutine.yield(i)
  end
end)
while coroutine.status(producer) ~= "dead" do
  local _, value = coroutine.resume(producer)
  print("yielded", value)
end

local next_id = counter_factory()
print(next_id(), next_id())
print(add(1), sum(1, 2, 3), square(4), point.x, point.y, nested.config.depth, json ~= nil)
print(arithmetic, floor_div, bitwise, comparison, length, concat, default, user, upper, formatted)
print(MAX_RETRIES, PI_APPROX, HEX, EXPONENT, flag, counter, escaped, single, long_string, type(nil))
