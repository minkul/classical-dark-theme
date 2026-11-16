#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'
require_relative 'helpers' if File.exist?('helpers.rb')

=begin
Sample program covering Ruby language tokens.
This is a block comment.
=end

# ── Constants and variables ──
MAX_RETRIES = 3
PI_APPROX = 3.14159
HEX, OCTAL, BINARY = 0xff, 0o17, 0b1010
BIG_NUMBER = 1_000_000
RATIONAL = 3r
$global_counter = 0
escaped = "Tab:\t Quote:\" Unicode:é"
single = 'no #{interpolation} here'
symbol = :ready
pattern = /^(?<user>[\w.]+)@(\w+)\.com$/i
words = %w[alpha beta gamma]
symbols = %i[one two three]
heredoc = <<~TEXT
  Hello from a heredoc,
  counter is #{$global_counter}.
TEXT

# ── Modules and mixins ──
module Greetable
  def greet(greeting = 'Hello')
    "#{greeting}, I am #{name}!"
  end
end

module Zoo
  # ── Classes ──
  class Animal
    include Comparable
    include Greetable

    attr_reader :name
    attr_accessor :age

    @@count = 0

    def initialize(name, age = 0)
      @name = name
      @age = age
      @@count += 1
    end

    def self.count
      @@count
    end

    def speak
      raise NotImplementedError, "#{self.class} must implement speak"
    end

    def <=>(other)
      age <=> other.age
    end

    def to_s
      "#{self.class.name}(#{@name}, #{@age})"
    end

    protected

    def secret
      'hidden'
    end

    private

    def internal_id
      object_id
    end
  end

  class Dog < Animal
    def initialize(name, age, breed: 'Mixed')
      super(name, age)
      @breed = breed
    end

    def speak
      "#{@name} says Woof!"
    end

    def adult?
      age >= 2
    end

    def rename!(new_name)
      @name = new_name
      self
    end
  end
end

Point = Struct.new(:x, :y) do
  def distance(other)
    Math.sqrt((x - other.x)**2 + (y - other.y)**2)
  end
end

class ValidationError < StandardError
  def initialize(message = 'Invalid value')
    super
  end
end

# ── Methods ──
def add(a, b = 0)
  a + b
end

def summarize(*args, sep: ', ', **options, &block)
  result = args.join(sep)
  block_given? ? yield(result) : result + options.to_s
end

square = ->(x) { x * x }
double = proc { |x| x * 2 }

# ── Main ──
arithmetic = (10 + 3) * 2 - 8 / 4 % 3**2
logical = $global_counter >= 0 && !false || nil.nil?
ternary = arithmetic.positive? ? 'positive' : 'not positive'
$global_counter += 1

dog = Zoo::Dog.new('Rex', 3, breed: 'Labrador')
puts dog.speak
puts dog.greet('Hi')
puts "Adult? #{dog.adult?}, total: #{Zoo::Animal.count}"
dog.rename!('Max').age = 4

point = Point.new(3, 4)
puts point.distance(Point.new(0, 0))

# Collections and blocks
numbers = [5, 3, 8, 1, 9]
hash = { name: 'Ruby', 'version' => 3.3, nested: { depth: 2 } }
range = (1..10)
evens = numbers.select(&:even?).map { |n| n * 10 }
total = numbers.reduce(0) do |sum, n|
  sum + n
end

# Loops and control flow
numbers.each_with_index do |value, index|
  next if value == 3
  break if value > 8

  puts "#{index}: #{value}"
end

for i in 0...3
  print i, ' '
end
puts

count = 0
count += 1 while count < 3
until count.zero?
  count -= 1
end
3.times { |n| puts n }

unless dog.adult?
  puts 'Puppy'
end

case point
in { x: 0, y: 0 } then puts 'Origin'
in Point[x, 0] then puts "On x-axis at #{x}"
else puts 'Somewhere else'
end

grade = case 85
        when 90.. then 'A'
        when 80...90 then 'B'
        else 'C'
        end

# Exceptions
begin
  raise ValidationError, 'Age must be positive'
rescue ValidationError, ArgumentError => e
  warn "Error: #{e.message}"
  retry_count = 0
else
  puts 'No error'
ensure
  puts 'Done'
end

if (m = pattern.match('john.doe@example.com'))
  puts m[:user]
end

puts JSON.generate(hash)
puts summarize(1, 2, 3) { |s| "[#{s}]" }
p add(1), square.call(4), double.(5), evens, total, range.to_a, grade, ternary
p MAX_RETRIES, PI_APPROX, HEX, OCTAL, BINARY, BIG_NUMBER, RATIONAL, escaped, single
p symbol, words, symbols, heredoc, arithmetic, logical, __FILE__, defined?(dog)
