/*
 * Sample program covering C language tokens.
 */

#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "config.h"

#define MAX_SIZE 100
#define SQUARE(x) ((x) * (x))
#define STRINGIFY(x) #x
#if defined(DEBUG) && DEBUG > 0
#define LOG(msg) fprintf(stderr, "[debug] %s\n", msg)
#else
#define LOG(msg) ((void)0)
#endif

// ── Constants and globals ──
static const int MAX_RETRIES = 3;
const double PI_APPROX = 3.14159;
static const unsigned HEX = 0xFFu, OCTAL = 017, BINARY = 0b1010;
const long long BIG = 1000000LL;
const float RATIO = 0.5f;
extern int external_counter;
static int counter = 0;

// ── Types ──
typedef enum { RED, GREEN, BLUE } Color;

typedef struct Point {
    double x;
    double y;
} Point;

typedef union {
    int32_t as_int;
    float as_float;
} Number;

struct Animal {
    char name[32];
    int age;
    const char *(*speak)(const struct Animal *self);
};

typedef int (*BinaryOp)(int, int);

// ── Functions ──
static const char *dog_speak(const struct Animal *self) {
    static char buffer[64];
    snprintf(buffer, sizeof buffer, "%s says Woof!", self->name);
    return buffer;
}

struct Animal *animal_new(const char *name, int age) {
    struct Animal *animal = malloc(sizeof(struct Animal));
    if (animal == NULL) {
        return NULL;
    }
    strncpy(animal->name, name, sizeof(animal->name) - 1);
    animal->name[sizeof(animal->name) - 1] = '\0';
    animal->age = age;
    animal->speak = dog_speak;
    return animal;
}

int add(int a, int b) {
    return a + b;
}

double distance(const Point *a, const Point *b) {
    double dx = a->x - b->x;
    double dy = a->y - b->y;
    return dx * dx + dy * dy;
}

void increment(int *value) {
    (*value)++;
}

inline static bool is_even(int n) {
    return n % 2 == 0;
}

int main(int argc, char *argv[]) {
    // Variables and types
    char letter = 'A';
    short s = 2;
    int i = 42;
    long l = 42L;
    unsigned long ul = 42UL;
    float f = 1.5e3f;
    double d = -2.5E-3;
    bool flag = true && !false;
    size_t len = strlen("hello");
    const char *escaped = "Tab:\t Quote:\" Newline:\n Backslash:\\ Octal:\101 Hex:\x41";
    int numbers[] = {5, 3, 8, 1, 9};
    char grid[3][3] = {{0}};
    register int fast = 0;
    volatile int vol = 0;

    // Operators
    int arithmetic = (i + 3) * 2 - 10 / 5 % 3;
    int bitwise = (i & 0x0F) | (i ^ 1) << 2 >> 1;
    bool comparison = i >= 10 && i != 0 || i <= -1;
    int ternary = i > 0 ? i : -i;
    int casted = (int)d;
    i += 1; i -= 1; i *= 2; i /= 2; i %= 7; i++; --i; i <<= 1; i |= 1;

    // Structs, pointers and memory
    Point origin = {0.0, 0.0};
    Point p = {.x = 3.0, .y = 4.0};
    Point *pp = &p;
    Number num = {.as_int = 1};
    struct Animal *dog = animal_new("Rex", 3);
    printf("%s\n", dog->speak(dog));
    printf("%-10s|%5d|%8.2f|%c|%p\n", dog->name, dog->age, distance(pp, &origin), letter, (void *)pp);
    free(dog);
    dog = NULL;

    BinaryOp op = add;
    printf("add = %d\n", op(2, 3));

    // Loops
    for (int idx = 0; idx < (int)(sizeof numbers / sizeof numbers[0]); idx++) {
        if (numbers[idx] == 3) continue;
        if (numbers[idx] > 8) break;
        printf("%d ", numbers[idx]);
    }
    putchar('\n');

    int count = 0;
    while (count < 3) {
        increment(&count);
    }
    do {
        count--;
    } while (count > 0);

    // Switch
    Color color = BLUE;
    switch (color) {
        case RED:
            puts("Red");
            break;
        case GREEN:
        case BLUE:
            puts("Green or Blue");
            break;
        default:
            puts("Unknown");
    }

    if (argc < 1) {
        goto cleanup;
    }

    LOG("finished");

cleanup:
    printf("%d %d %d %d %d %zu %s\n", arithmetic, bitwise, comparison, ternary, casted, len, escaped);
    printf("%hd %ld %lu %f %f %d %d %d\n", s, l, ul, f, d, flag, fast, vol);
    printf("%d %f %u %u %u %lld %f\n", MAX_RETRIES, PI_APPROX, HEX, OCTAL, BINARY, BIG, RATIO);
    printf("%d %d %s %d %d %s\n", SQUARE(4), MAX_SIZE, STRINGIFY(hello), is_even(4), counter, argv[0]);
    printf("%d %c\n", num.as_int, grid[0][0]);
    return EXIT_SUCCESS;
}
