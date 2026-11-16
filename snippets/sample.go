// Package main is a sample program covering Go language tokens.
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"regexp"
	"sort"
	"strings"
	"sync"
	"time"
)

// ── Constants and variables ──
const (
	MaxRetries = 3
	PiApprox   = 3.14159
	Hex        = 0xFF
	Octal      = 0o17
	Binary     = 0b1010
	Big        = 1_000_000
	Exponent   = 1.5e-3
	Greeting   = "Hello, World!"
)

type Color int

const (
	Red Color = iota
	Green
	Blue
)

var (
	counter  int
	escaped  = "Tab:\t Quote:\" Unicode:\u00e9 Backslash:\\"
	raw      = `C:\path\to\file`
	letter   rune = 'A'
	pattern  = regexp.MustCompile(`^(?P<user>[\w.]+)@(\w+)\.com$`)
	ErrEmpty = errors.New("empty input")
)

// ── Interfaces and structs ──

// Speaker is anything that can speak.
type Speaker interface {
	Speak() string
}

type Animal struct {
	Name string `json:"name"`
	Age  int    `json:"age,omitempty"`
}

type Dog struct {
	Animal
	Breed string `json:"breed"`
}

type Point struct{ X, Y float64 }

type ValidationError struct {
	Field string
	Value int
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("invalid %s: %d", e.Field, e.Value)
}

func (c Color) String() string {
	switch c {
	case Red:
		return "Red"
	case Green:
		return "Green"
	default:
		return "Blue"
	}
}

// ── Constructors and methods ──
func NewDog(name string, age int, breed string) *Dog {
	return &Dog{Animal: Animal{Name: name, Age: age}, Breed: breed}
}

func (d *Dog) Speak() string {
	return d.Name + " says Woof!"
}

func (d *Dog) Birthday() {
	d.Age++
}

func (p Point) Distance(other Point) float64 {
	dx, dy := p.X-other.X, p.Y-other.Y
	return dx*dx + dy*dy
}

// ── Generics ──
type Number interface {
	~int | ~int64 | ~float64
}

func Sum[T Number](values ...T) T {
	var total T
	for _, v := range values {
		total += v
	}
	return total
}

func Map[T, R any](items []T, fn func(T) R) []R {
	result := make([]R, 0, len(items))
	for _, item := range items {
		result = append(result, fn(item))
	}
	return result
}

type Stack[T any] struct {
	items []T
}

func (s *Stack[T]) Push(item T) { s.items = append(s.items, item) }

// ── Functions ──
func divide(a, b float64) (result float64, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("recovered: %v", r)
		}
	}()
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	result = a / b
	return
}

func validate(age int) error {
	if age < 0 {
		return &ValidationError{Field: "age", Value: age}
	}
	return nil
}

func worker(ctx context.Context, id int, jobs <-chan int, results chan<- string, wg *sync.WaitGroup) {
	defer wg.Done()
	for {
		select {
		case job, ok := <-jobs:
			if !ok {
				return
			}
			results <- fmt.Sprintf("worker %d finished job %d", id, job)
		case <-ctx.Done():
			return
		}
	}
}

func main() {
	// Variables and types
	var i int = 42
	var u uint8 = 255
	var f float32 = 1.5
	var c complex128 = complex(1, 2)
	var b byte = 'b'
	var flag bool = true && !false
	var anything any = "interface value"
	inferred := "short declaration"
	var ptr *int = &i

	// Operators
	arithmetic := (i + 3) * 2 - 10/5%3
	bitwise := (i & 0x0F) | (i ^ 1) << 2 >> 1 &^ 1
	comparison := i >= 10 && i != 0 || i <= -1
	i += 1
	i++
	*ptr = 50

	// Create instances and call methods
	dog := NewDog("Rex", 3, "Labrador")
	dog.Birthday()
	var speaker Speaker = dog
	fmt.Println(speaker.Speak())
	fmt.Printf("%s is %d years old (%v, %+v, %T)\n", dog.Name, dog.Age, dog, *dog, dog)

	p := Point{X: 3, Y: 4}
	fmt.Println(p.Distance(Point{}))

	// Slices, maps, arrays
	numbers := []int{5, 3, 8, 1, 9}
	array := [3]string{"a", "b", "c"}
	scores := map[string]int{"Alice": 90, "Bob": 75}
	scores["Carol"] = 85
	delete(scores, "Bob")
	sort.Ints(numbers)
	sliced := numbers[1:3]
	labels := Map(numbers, func(n int) string { return fmt.Sprint("#", n) })

	// Loops
	for idx := 0; idx < len(numbers); idx++ {
		if numbers[idx] == 3 {
			continue
		}
		if numbers[idx] > 8 {
			break
		}
	}
	for name, score := range scores {
		fmt.Println(name, score)
	}
	for counter < 3 {
		counter++
	}
	for n := range 3 {
		fmt.Print(n, " ")
	}

outer:
	for x := range 3 {
		for y := range 3 {
			if x*y == 2 {
				break outer
			}
		}
	}

	// Switch and type switch
	switch color := Blue; color {
	case Red:
		fmt.Println("Red")
	case Green, Blue:
		fmt.Println("Green or Blue")
		fallthrough
	default:
		fmt.Println(color)
	}

	switch v := anything.(type) {
	case string:
		fmt.Println("string:", strings.ToUpper(v))
	case int:
		fmt.Println("int:", v)
	default:
		fmt.Println("unknown")
	}

	// Errors
	if err := validate(-1); err != nil {
		var vErr *ValidationError
		if errors.As(err, &vErr) {
			fmt.Fprintln(os.Stderr, "Error:", vErr)
		}
	}
	quotient, err := divide(10, 0)

	// Goroutines and channels
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	jobs := make(chan int, 3)
	results := make(chan string, 3)
	var wg sync.WaitGroup
	for w := 1; w <= 2; w++ {
		wg.Add(1)
		go worker(ctx, w, jobs, results, &wg)
	}
	for j := 1; j <= 3; j++ {
		jobs <- j
	}
	close(jobs)
	wg.Wait()
	close(results)

	data, _ := json.Marshal(dog)
	match := pattern.FindStringSubmatch("john.doe@example.com")
	stack := &Stack[string]{}
	stack.Push("item")

	fmt.Println(u, f, c, b, flag, inferred, arithmetic, bitwise, comparison, quotient, err)
	fmt.Println(array, sliced, labels, string(data), match[1], len(results), stack, nil == nil)
	fmt.Println(Sum(1, 2, 3), Sum(1.5, 2.5), MaxRetries, PiApprox, Hex, Octal, Binary, Big, Exponent)
	fmt.Println(Greeting, escaped, raw, letter, ErrEmpty, cap(numbers), new(int), true, false)
}
