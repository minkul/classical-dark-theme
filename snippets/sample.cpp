// Sample program covering C++ language tokens.

#include <algorithm>
#include <iostream>
#include <map>
#include <memory>
#include <optional>
#include <stdexcept>
#include <string>
#include <vector>
#include "config.h"

#define MAX_SIZE 100
#define SQUARE(x) ((x) * (x))
#ifndef DEBUG
#define DEBUG 0
#endif

using namespace std::string_literals;

/**
 * @brief Namespace holding the sample types.
 */
namespace zoo {

// ── Constants ──
constexpr int MAX_RETRIES = 3;
const double PI_APPROX = 3.14159;
inline constexpr auto HEX = 0xFF, OCTAL = 017, BINARY = 0b1010;
constexpr long long BIG = 1'000'000LL;
constexpr float RATIO = 0.5f;
constexpr unsigned int UNSIGNED = 42u;
static int counter = 0;

enum class Color : unsigned char { Red, Green, Blue };
enum Legacy { LEGACY_A = 1, LEGACY_B };

struct Point {
    double x = 0.0;
    double y = 0.0;

    Point operator+(const Point& other) const { return {x + other.x, y + other.y}; }
    bool operator==(const Point&) const = default;
};

// ── Abstract class ──
class Animal {
public:
    explicit Animal(std::string name, int age = 0) : name_(std::move(name)), age_(age) {
        ++count_;
    }
    virtual ~Animal() = default;

    virtual std::string speak() const = 0;

    [[nodiscard]] int age() const noexcept { return age_; }
    const std::string& name() const { return name_; }
    static int count() { return count_; }

    friend std::ostream& operator<<(std::ostream& os, const Animal& a) {
        return os << a.name_ << " (" << a.age_ << ")";
    }

protected:
    std::string name_;

private:
    int age_;
    inline static int count_ = 0;
};

// ── Inheritance ──
class Dog final : public Animal {
public:
    Dog(const std::string& name, int age, std::string breed)
        : Animal(name, age), breed_{std::move(breed)} {}

    std::string speak() const override { return name_ + " says Woof!"; }

private:
    std::string breed_;
};

// ── Templates ──
template <typename T>
class Box {
public:
    explicit Box(T value) : value_(value) {}

    template <typename F>
    auto map(F&& fn) const -> Box<decltype(fn(std::declval<T>()))> {
        return Box<decltype(fn(value_))>(fn(value_));
    }

    T get() const { return value_; }

private:
    T value_;
};

template <typename T>
concept Numeric = std::is_arithmetic_v<T>;

template <Numeric T>
T add(T a, T b = T{}) {
    return a + b;
}

template <typename... Args>
auto sum(Args... args) {
    return (args + ...);
}

class ValidationError : public std::runtime_error {
public:
    using std::runtime_error::runtime_error;
};

}  // namespace zoo

// ── Functions ──
static void validate(int age) {
    if (age < 0) {
        throw zoo::ValidationError("Age must be positive: " + std::to_string(age));
    }
}

void increment(int& value, int* ptr) {
    value++;
    if (ptr != nullptr) {
        *ptr += 1;
    }
}

constexpr long operator""_km(unsigned long long value) { return static_cast<long>(value * 1000); }

int main(int argc, char* argv[]) {
    using zoo::Color;

    // Variables and types
    bool flag = true && !false;
    char letter = 'A';
    wchar_t wide = L'Z';
    short s = 2;
    long l = 42L;
    double d = -2.5e-3;
    auto inferred = "auto"s;
    const char* escaped = "Tab:\t Quote:\" Newline:\n Backslash:\\";
    std::string raw = R"(C:\path\to\file)";
    int arr[] = {5, 3, 8, 1, 9};
    signed char sc = -1;
    volatile int vol = 0;

    // Operators
    int arithmetic = (10 + 3) * 2 - 8 / 4 % 3;
    int bitwise = (zoo::HEX & 0x0F) | (1 << 2) ^ ~0 >> 1;
    bool logical = arithmetic >= 0 && arithmetic != 1 || !flag;
    int ternary = arithmetic > 0 ? arithmetic : -arithmetic;
    int casted = static_cast<int>(d) + (int)l + reinterpret_cast<std::uintptr_t>(&s) % 2;
    arithmetic += 1; arithmetic <<= 1; arithmetic++;
    auto bytes = sizeof(arr) / sizeof(arr[0]);

    // Create instances and call methods
    zoo::Dog dog("Rex", 3, "Labrador");
    std::cout << dog.speak() << '\n' << dog << std::endl;

    auto ptr = std::make_unique<zoo::Dog>("Max", 5, "Beagle");
    std::shared_ptr<zoo::Animal> shared = std::make_shared<zoo::Dog>("Bella", 2, "Poodle");
    zoo::Animal* raw_ptr = new zoo::Dog("Luna", 1, "Husky");
    std::cout << ptr->speak() << ' ' << shared->speak() << ' ' << raw_ptr->speak() << '\n';
    delete raw_ptr;

    zoo::Box<int> box(10);
    auto mapped = box.map([](int v) { return v * 2.5; });
    std::cout << mapped.get() << " " << zoo::Animal::count() << std::endl;

    // Containers, lambdas, algorithms
    std::vector<int> numbers{5, 3, 8, 1, 9};
    std::map<std::string, int> scores{{"Alice", 90}, {"Bob", 75}};
    int threshold = 4;
    std::sort(numbers.begin(), numbers.end(), [](int a, int b) { return a < b; });
    auto count = std::count_if(numbers.cbegin(), numbers.cend(),
                               [&threshold](int n) { return n > threshold; });

    // Loops
    for (std::size_t i = 0; i < numbers.size(); ++i) {
        if (numbers[i] == 3) continue;
        if (numbers[i] > 8) break;
    }
    for (const auto& [name, score] : scores) {
        printf("%s: %d\n", name.c_str(), score);
    }
    int n = 0;
    while (n < 3) n++;
    do { n--; } while (n > 0);

    // Switch
    Color color = Color::Blue;
    switch (color) {
        case Color::Red:
            std::cout << "Red\n";
            break;
        case Color::Green:
        case Color::Blue:
            std::cout << "Green or Blue\n";
            [[fallthrough]];
        default:
            break;
    }

    // Exceptions
    try {
        validate(-1);
    } catch (const zoo::ValidationError& e) {
        std::cerr << "Error: " << e.what() << '\n';
    } catch (...) {
        std::cerr << "Unknown error\n";
    }

    std::optional<int> maybe = std::nullopt;
    increment(n, &n);
    goto end;

end:
    std::cout << zoo::add(1, 2) << zoo::sum(1, 2, 3) << SQUARE(4) << MAX_SIZE << 5_km << '\n';
    std::wcout << wide << L'\n';
    std::cout << letter << s << inferred << escaped << raw << arr[0] << sc << vol << '\n';
    std::cout << bitwise << logical << ternary << casted << bytes << count << maybe.value_or(0) << '\n';
    std::cout << zoo::MAX_RETRIES << zoo::PI_APPROX << zoo::OCTAL << zoo::BINARY << zoo::BIG
              << zoo::RATIO << zoo::UNSIGNED << zoo::LEGACY_A << zoo::counter << DEBUG << argc << argv[0];
    return 0;
}
