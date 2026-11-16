using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static System.Math;

#nullable enable

namespace Sample.Theme;

/// <summary>
/// Sample program covering C# language tokens.
/// </summary>
/// <remarks>See <see cref="Animal"/> for the base type.</remarks>
public static class Program
{
    // ── Constants and fields ──
    public const int MaxRetries = 3;
    private const double PiApprox = 3.14159d;
    private static readonly int Hex = 0xFF, Binary = 0b1010;
    private static readonly long Big = 1_000_000L;
    private static readonly decimal Price = 19.99m;
    private static readonly float Ratio = 0.5f;
    private static int _counter;

    // ── Main ──
    public static async Task Main(string[] args)
    {
        // Variables and types
        byte b = 1;
        short s = 2;
        int i = 42;
        uint u = 42u;
        double d = -2.5e-3;
        bool flag = true && !false;
        char c = 'A';
        var inferred = "type inferred";
        string? maybe = null;
        object boxed = i;
        dynamic dyn = 1;
        string escaped = "Tab:\t Quote:\" Unicode:\u00e9";
        string verbatim = @"C:\path\to\file";
        string interpolated = $"Value of i is {i:D4}, pi is {PiApprox:F2}";
        string raw = """
            {
                "name": "C#"
            }
            """;

        // Operators
        int arithmetic = (i + 3) * 2 - 10 / 5 % 3;
        int bitwise = (i & 0x0F) | (i ^ 1) << 2 >> 1;
        bool comparison = i >= 10 && i != 0 || i <= -1;
        int ternary = i > 0 ? i : -i;
        string nullish = maybe ?? "fallback";
        int? length = maybe?.Length;
        maybe ??= "assigned";
        i += 1; i++; --i;
        int casted = (int)d;
        bool isInt = boxed is int;
        string? asString = boxed as string;

        // Create instances and call methods
        var dog = new Dog("Rex", 3, Breed: "Labrador");
        Console.WriteLine(dog.Speak());
        Console.WriteLine($"{dog.Name} is {dog.Age} years old, total {Animal.Count}");

        Shape circle = new Circle(2.0);
        Console.WriteLine(circle.Describe());

        var point = new Point(3, 4);
        var moved = point with { X = 10 };

        var box = new Box<int>(10);
        Box<string> mapped = box.Map(v => $"Value: {v}");

        // Collections and LINQ
        int[] numbers = { 5, 3, 8, 1, 9 };
        var scores = new Dictionary<string, int> { ["Alice"] = 90, ["Bob"] = 75 };
        List<string> names = [.. scores.Keys];
        var passed = from entry in scores
                     where entry.Value >= 80
                     orderby entry.Key descending
                     select entry.Key;
        var doubled = numbers.Where(n => n > 2).Select(n => n * 2).ToList();

        // Loops
        for (int idx = 0; idx < numbers.Length; idx++)
        {
            if (numbers[idx] == 3) continue;
            if (numbers[idx] > 8) break;
        }
        foreach (var (name, score) in scores)
        {
            Console.WriteLine($"{name}: {score}");
        }
        int count = 0;
        while (count < 3) count++;
        do { count--; } while (count > 0);

        // Switch statement and expression, pattern matching
        Color favorite = Color.Blue;
        switch (favorite)
        {
            case Color.Red:
                Console.WriteLine("Red");
                break;
            case Color.Green or Color.Blue:
                Console.WriteLine("Green or Blue");
                break;
            default:
                Console.WriteLine("Unknown");
                break;
        }

        string Classify(object obj) => obj switch
        {
            int n when n > 0 => "Positive int",
            string { Length: > 0 } str => $"String: {str}",
            Point(0, 0) => "Origin",
            null => "Null",
            _ => "Unknown",
        };

        // Exceptions
        try
        {
            Validate(-1);
        }
        catch (ArgumentException ex) when (ex.ParamName == "age")
        {
            Console.Error.WriteLine($"Error: {ex.Message}");
        }
        finally
        {
            Console.WriteLine("Done");
        }

        using (var resource = new Resource())
        {
            resource.Use();
        }

        // Async, events, delegates
        int result = await ComputeAsync(5);
        Func<int, int, int> add = (x, y) => x + y;
        Action<string> print = Console.WriteLine;
        dog.Barked += (sender, e) => print("Event: barked");
        dog.Bark();

        var match = Regex.Match("john.doe@example.com", @"^(?<user>[\w.]+)@(\w+)\.com$");
        Console.WriteLine(match.Groups["user"].Value);

        Console.WriteLine(string.Join(", ", b, s, u, flag, c, inferred, dyn, escaped, verbatim, interpolated, raw));
        Console.WriteLine(string.Join(", ", arithmetic, bitwise, comparison, ternary, nullish, length, casted, isInt, asString));
        Console.WriteLine(string.Join(", ", moved, mapped.Value, names.Count, passed.First(), doubled.Count, Classify(point), result, add(1, 2)));
        Console.WriteLine(string.Join(", ", MaxRetries, Hex, Binary, Big, Price, Ratio, _counter, Max(1, 2), nameof(Program), typeof(int), sizeof(int), default(int)));
    }

    private static void Validate(int age)
    {
        if (age < 0)
            throw new ArgumentException($"Age must be positive: {age}", nameof(age));
    }

    private static async Task<int> ComputeAsync(int value)
    {
        await Task.Delay(10);
        return value * 2;
    }

    public static int Sum(params int[] values) => values.Sum();

    public static void Swap<T>(ref T a, ref T b) where T : struct => (a, b) = (b, a);

    public static bool TryParse(string input, out int value) => int.TryParse(input, out value);
}

// ── Types ──
public enum Color { Red, Green, Blue }

[Flags]
public enum Permissions : byte { None = 0, Read = 1, Write = 2, All = Read | Write }

public record Point(int X, int Y);

public readonly struct Size(double width, double height)
{
    public double Area => width * height;
}

public interface Shape
{
    double Area();
    string Describe() => $"Shape with area {Area():F2}";
}

public sealed class Circle(double radius) : Shape
{
    public double Area() => PI * radius * radius;
}

public abstract class Animal
{
    public static int Count { get; private set; }
    public string Name { get; init; }
    public int Age { get; protected set; }
    public event EventHandler? Barked;

    protected Animal(string name, int age)
    {
        Name = name;
        Age = age;
        Count++;
    }

    public abstract string Speak();

    public virtual void Bark() => Barked?.Invoke(this, EventArgs.Empty);

    public override string ToString() => $"{GetType().Name}({Name}, {Age})";
}

public class Dog : Animal
{
    public string Breed { get; }

    public Dog(string name, int age, string Breed = "Mixed") : base(name, age)
    {
        this.Breed = Breed;
    }

    public override string Speak() => $"{Name} says Woof!";
}

public class Box<T>(T value) where T : notnull
{
    public T Value { get; } = value;

    public Box<TResult> Map<TResult>(Func<T, TResult> mapper) where TResult : notnull =>
        new(mapper(Value));
}

internal class Resource : IDisposable
{
    public void Use() => Console.WriteLine("Using resource");

    public void Dispose() => Console.WriteLine("Disposed");
}

[Obsolete("Use Dog instead")]
public class OldDog { }
