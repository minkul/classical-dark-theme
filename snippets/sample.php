<?php

declare(strict_types=1);

namespace App\Sample;

use InvalidArgumentException;
use JsonSerializable;
use App\Contracts\{Repository, Cache};
use function array_map;
use const PHP_EOL;

/**
 * Sample program covering PHP language tokens.
 *
 * @package App\Sample
 * @author  minkul
 */

// ── Constants and variables ──
const MAX_RETRIES = 3;
define('PI_APPROX', 3.14159);
$hex = 0xFF;
$octal = 0o17;
$binary = 0b1010;
$big = 1_000_000;
$float = 1.5e-3;
$flag = true;
$nothing = null;
$escaped = "Tab:\t Quote:\" Unicode:\u{00e9}";
$single = 'no $interpolation here';
$name = 'World';
$heredoc = <<<EOT
    Hello, {$name}!
    Counter is $big.
    EOT;
$nowdoc = <<<'EOT'
    Raw $text here.
    EOT;

# Hash-style comment
/* Block comment */

// ── Interface, trait, enum ──
interface Shape
{
    public function area(): float;
}

trait Greets
{
    public function greet(string $greeting = 'Hello'): string
    {
        return "{$greeting}, I am {$this->name}!";
    }
}

enum Status: string
{
    case Active = 'active';
    case Inactive = 'inactive';

    public function label(): string
    {
        return ucfirst($this->value);
    }
}

// ── Classes ──
abstract class Animal implements JsonSerializable
{
    use Greets;

    public const KINGDOM = 'Animalia';
    protected static int $count = 0;

    public function __construct(
        protected readonly string $name,
        private int $age = 0,
    ) {
        self::$count++;
        static::onCreate();
    }

    abstract public function speak(): string;

    public static function count(): int
    {
        return static::$count;
    }

    protected static function onCreate(): void {}

    public function getAge(): int
    {
        return $this->age;
    }

    public function jsonSerialize(): mixed
    {
        return ['name' => $this->name, 'age' => $this->age];
    }

    public function __toString(): string
    {
        return static::class . "({$this->name}, {$this->age})";
    }
}

final class Dog extends Animal
{
    public function __construct(string $name, int $age, private ?string $breed = null)
    {
        parent::__construct($name, $age);
    }

    #[\Override]
    public function speak(): string
    {
        return "{$this->name} says Woof!";
    }
}

class Circle implements Shape
{
    public function __construct(private float $radius) {}

    public function area(): float
    {
        return M_PI * $this->radius ** 2;
    }
}

class ValidationException extends InvalidArgumentException {}

// ── Functions ──
function add(int $a, int $b = 0): int
{
    return $a + $b;
}

function sum(int ...$numbers): int
{
    return array_sum($numbers);
}

function countdown(int $n): \Generator
{
    while ($n > 0) {
        yield $n--;
    }
}

function validate(int|float $age): void
{
    if ($age < 0) {
        throw new ValidationException("Age must be positive: $age");
    }
}

$square = fn(int $x): int => $x * $x;
$multiplier = 3;
$multiply = function (int $x) use ($multiplier): int {
    return $x * $multiplier;
};

// ── Main ──
$arithmetic = (10 + 3) * 2 - 8 / 4 % 3 ** 2;
$bitwise = ($hex & 0x0F) | (1 << 2) ^ ~0 >> 1;
$logical = $big >= 0 && $big !== 1 || !false and true;
$nullish = $nothing ?? 'fallback';
$ternary = $flag ? 'yes' : 'no';
$spaceship = 1 <=> 2;
$concat = 'Hello' . ', ' . $name;
$big += 1; $big .= ''; $big++;

$dog = new Dog('Rex', 3, breed: 'Labrador');
echo $dog->speak(), PHP_EOL;
echo $dog->greet('Hi') . PHP_EOL;
printf("%s is %d years old%s", 'Rex', $dog->getAge(), PHP_EOL);
echo Animal::count(), ' ', Animal::KINGDOM, ' ', $dog?->getAge(), PHP_EOL;

$circle = new Circle(2.0);
print(number_format($circle->area(), 2) . PHP_EOL);

// Arrays
$numbers = [5, 3, 8, 1, 9];
$assoc = ['name' => 'PHP', 'version' => 8.3, 'tags' => ['web', 'server']];
[$first, , $third] = $numbers;
['name' => $lang] = $assoc;
$doubled = array_map(fn($n) => $n * 2, $numbers);

// Loops
for ($i = 0; $i < count($numbers); $i++) {
    if ($numbers[$i] === 3) continue;
    if ($numbers[$i] > 8) break;
}
foreach ($assoc as $key => $value) {
    echo "$key: " . json_encode($value) . PHP_EOL;
}
$count = 0;
while ($count < 3) {
    $count++;
}
do {
    $count--;
} while ($count > 0);

// Switch and match
switch (Status::Active) {
    case Status::Active:
        echo Status::Active->label(), PHP_EOL;
        break;
    default:
        echo 'Unknown';
}

$grade = match (true) {
    $arithmetic >= 90 => 'A',
    $arithmetic >= 80 => 'B',
    default => 'C',
};

// Exceptions
try {
    validate(-1);
} catch (ValidationException | \TypeError $e) {
    echo 'Error: ', $e->getMessage(), PHP_EOL;
} finally {
    echo 'Done', PHP_EOL;
}

if (preg_match('/^(?<user>[\w.]+)@(\w+)\.com$/i', 'john.doe@example.com', $matches)) {
    echo $matches['user'], PHP_EOL;
}

var_dump(add(1), sum(1, 2, 3), $square(4), $multiply(5), iterator_to_array(countdown(3)));
var_dump($bitwise, $logical, $nullish, $ternary, $spaceship, $concat, $first, $third, $lang);
var_dump($doubled, $grade, $octal, $binary, $float, $escaped, $single, $heredoc, $nowdoc);
var_dump(json_encode($dog), isset($dog), empty($nothing), $dog instanceof Animal, __FILE__);
?>
<p>Inline HTML: <?= htmlspecialchars($name) ?></p>
