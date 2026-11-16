package com.example.theme;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.function.Function;
import java.util.stream.Collectors;
import static java.lang.Math.max;

/**
 * Sample program covering Java language tokens.
 *
 * @author minkul
 * @version 1.0
 * @see Shape
 */
public class Main {

    // ── Constants and fields ──
    public static final int MAX_SIZE = 100;
    private static final String GREETING = "Hello, World!";
    private static final double PI_APPROX = 3.14159d;
    private static final long BIG_NUMBER = 1_000_000L;
    private static final float RATIO = 0.5f;
    private static final int HEX = 0xFF, OCTAL = 017, BINARY = 0b1010;
    private static final char NEWLINE = '\n';
    protected transient volatile int counter = 0;
    private final List<String> names = new ArrayList<>();
    private Object nothing = null;

    /* Block comment: instance initializer */
    {
        names.add("Alice");
    }

    static {
        System.out.println("Static initializer");
    }

    // ── Interface with default and static methods ──
    interface Shape {
        double area();

        default String describe() {
            return "Shape with area %.2f".formatted(area());
        }

        static Shape unit() {
            return new Circle(1.0);
        }
    }

    // ── Sealed interface, records ──
    sealed interface Expr permits Num, Add {}
    record Num(int value) implements Expr {}
    record Add(Expr left, Expr right) implements Expr {}

    // ── Enum with fields, constructor and methods ──
    enum Color {
        RED("#FF0000"), GREEN("#00FF00"), BLUE("#0000FF");

        private final String hex;

        Color(String hex) {
            this.hex = hex;
        }

        public String getHex() {
            return hex;
        }
    }

    // ── Abstract class ──
    abstract static class Animal implements Comparable<Animal> {
        protected final String name;
        private int age;

        Animal(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public abstract String speak();

        public int getAge() {
            return age;
        }

        @Override
        public int compareTo(Animal other) {
            return Integer.compare(this.age, other.age);
        }

        @Override
        public String toString() {
            return getClass().getSimpleName() + "(" + name + ", " + age + ")";
        }
    }

    // ── Inheritance ──
    static final class Dog extends Animal {
        Dog(String name, int age) {
            super(name, age);
        }

        @Override
        public String speak() {
            return name + " says Woof!";
        }
    }

    static class Circle implements Shape {
        private final double radius;

        Circle(double radius) {
            this.radius = radius;
        }

        @Override
        public double area() {
            return Math.PI * radius * radius;
        }
    }

    // ── Generic class with bounded type parameter ──
    static class Box<T extends Comparable<T>> {
        private T value;

        Box(T value) {
            this.value = value;
        }

        public T get() {
            return value;
        }

        public <R extends Comparable<R>> Box<R> map(Function<? super T, ? extends R> mapper) {
            return new Box<>(mapper.apply(value));
        }
    }

    // ── Custom exception ──
    static class ValidationException extends Exception {
        ValidationException(String message) {
            super(message);
        }
    }

    // ── Custom annotation ──
    @interface Info {
        String author() default "unknown";
        int priority() default 1;
    }

    // ── Generic static method, varargs ──
    @SafeVarargs
    public static <T> List<T> listOf(T... items) {
        return Arrays.asList(items);
    }

    @Info(author = "minkul", priority = 2)
    public static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) {
            total += n;
        }
        return total;
    }

    @Deprecated
    public static void oldMethod() {
        System.out.println("Deprecated method");
    }

    static void validate(int age) throws ValidationException {
        if (age < 0) {
            throw new ValidationException("Age must be positive: " + age);
        }
    }

    // ── Pattern matching and switch expression ──
    static int evaluate(Expr expr) {
        return switch (expr) {
            case Num n -> n.value();
            case Add(Expr l, Expr r) -> evaluate(l) + evaluate(r);
        };
    }

    static String classify(Object obj) {
        if (obj instanceof String s && !s.isEmpty()) {
            return "String of length " + s.length();
        } else if (obj instanceof Integer i) {
            return "Integer: " + i;
        }
        return "Unknown";
    }

    synchronized void increment() {
        counter++;
    }

    public static void main(String[] args) throws Exception {
        // Variables and primitive types
        byte b = 1;
        short s = 2;
        int i = 42;
        long l = 42L;
        float f = 1.5e3f;
        double d = -2.5E-3;
        boolean flag = true && !false;
        char c = 'A';
        var inferred = "type inferred";
        String escaped = "Tab:\t Quote:\" Unicode:é Backslash:\\";

        // Text block
        String json = """
                {
                    "name": "Java",
                    "version": 21
                }
                """;

        // Operators
        int arithmetic = (i + 3) * 2 - 10 / 5 % 3;
        int bitwise = (i & 0x0F) | (i ^ 1) << 2 >> 1 >>> 1;
        boolean comparison = i >= 10 && i != 0 || i <= -1;
        int ternary = i > 0 ? i : -i;
        i += 1; i -= 1; i *= 2; i /= 2; i %= 7; i++; --i;
        int casted = (int) d;
        long widened = max(i, 5);

        // Arrays
        int[] numbers = {5, 3, 8, 1, 9};
        String[][] grid = new String[3][3];
        grid[0][0] = "X";

        // Create instances and call methods
        Dog dog = new Dog("Rex", 3);
        System.out.println(dog.speak());
        System.out.printf("%s is %d years old%n", dog.name, dog.getAge());

        Shape circle = new Circle(2.0);
        System.out.println(circle.describe());
        System.out.println(Shape.unit().area());

        Box<Integer> box = new Box<>(10);
        Box<String> mapped = box.map(v -> "Value: " + v);
        System.out.println(mapped.get());

        // Enum usage
        for (Color color : Color.values()) {
            System.out.println(color + " = " + color.getHex() + " (" + color.ordinal() + ")");
        }

        // Switch statement
        Color favorite = Color.BLUE;
        switch (favorite) {
            case RED:
                System.out.println("Red");
                break;
            case GREEN:
            case BLUE:
                System.out.println("Green or Blue");
                break;
            default:
                System.out.println("Unknown");
        }

        // Loops
        for (int idx = 0; idx < numbers.length; idx++) {
            if (numbers[idx] == 3) continue;
            if (numbers[idx] > 8) break;
            System.out.print(numbers[idx] + " ");
        }
        System.out.println();

        int count = 0;
        while (count < 3) {
            count++;
        }

        do {
            count--;
        } while (count > 0);

        outer:
        for (int x = 0; x < 3; x++) {
            for (int y = 0; y < 3; y++) {
                if (x * y == 2) break outer;
            }
        }

        // Collections, lambdas, method references, streams
        List<Animal> animals = new ArrayList<>(List.of(new Dog("Max", 5), new Dog("Bella", 2)));
        Collections.sort(animals);
        animals.forEach(System.out::println);

        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 90);
        scores.put("Bob", 75);
        scores.merge("Alice", 5, Integer::sum);

        List<String> passed = scores.entrySet().stream()
                .filter(e -> e.getValue() >= 80)
                .map(Map.Entry::getKey)
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());
        System.out.println("Passed: " + passed);

        Optional<String> maybe = Optional.ofNullable(null);
        System.out.println(maybe.orElse("default"));

        // Anonymous class
        Runnable task = new Runnable() {
            @Override
            public void run() {
                System.out.println("Running anonymous task");
            }
        };
        task.run();

        // Exceptions: try / catch / finally, multi-catch, try-with-resources
        try {
            validate(-1);
        } catch (ValidationException e) {
            System.err.println("Error: " + e.getMessage());
        } finally {
            System.out.println("Validation done");
        }

        try (BufferedReader reader = new BufferedReader(new StringReader("line1\nline2"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException | IllegalStateException e) {
            e.printStackTrace();
        }

        // Pattern matching
        System.out.println(classify("hello"));
        System.out.println(evaluate(new Add(new Num(2), new Num(3))));

        // Concurrency
        CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> sum(1, 2, 3));
        System.out.println("Sum: " + future.get());

        Main main = new Main();
        Thread thread = new Thread(main::increment);
        thread.start();
        thread.join();

        // Assertion and misc
        assert i >= 0 : "i must be non-negative";
        System.out.println(json + inferred + escaped + b + s + l + f + c + flag);
        System.out.println(arithmetic + bitwise + ternary + casted + widened + (comparison ? 1 : 0));
        System.out.println(GREETING + MAX_SIZE + PI_APPROX + BIG_NUMBER + RATIO + HEX + OCTAL + BINARY + NEWLINE);
    }
}
