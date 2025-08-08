# Iterable Protocol in JavaScript

## Introduction
The iterable protocol allows objects in JavaScript to be iterated over their values one by one, so that we can loop through them using for...of loops, the spread operator, Array.from(), or other similar constructs. To consider any object in JavaScript as an iterable object, it must have a method called `Symbol.iterator()`, which is a zero-argument function that is invoked when the iteration begins and returns an iterator. There are many objects in JavaScript that are iterable by default, such as Array, String, Map, and Set.

## Iterator Protocol
There is also something called the iterator protocol, which allows us to produce a sequence of values from an object that is originally not iterable. We can make an object an iterator by implementing a `next()` method inside it. This method returns an object with two properties:
- **value**: represents the next value
- **done**: a flag indicating whether the iterator has completed (true) or not (false)

## Examples

### Basic String Iteration
```javascript
const str = "I love Java";

for (const c of str) {
    console.log(c);
}
```
This is a simple code that iterates over a string and prints each of its characters. However, since the String type in JavaScript is a built-in iterable, let's look at a more complex example that demonstrates how to build your own iterable manually!

### Custom Iterable Object
```javascript
const nums = {} // Empty Object -not iterable in its nature-

nums[Symbol.iterator] = function() {
    let current = 0;
    const max = 90;
    
    return {
        next() {
            if (current >= max) {
                return { done: true }
            }
            current += 15;
            return { value: current, done: false } // After reaching 90 the producing of nums stops.
        }
    }
}

// Now after using Symbol.iterator and next method, we can loop over our object!
for (const num of nums) {
    console.log(num)
}
```
The output of for...of will be: 15, 30, 45, 60, 75, 90 and after that the **done** flag will return true and stop the iteration process.

## Importance and Real-World Use Cases
The iterable protocol allows us to treat custom data structures like LinkedLists, Trees, and Graphs like built-in types by making them iterable. Thus, we can use for...of loop to traverse all items in the data structure. Moreover, there are some modern features in JavaScript like the spread operator and the Array.from() method, which only work on iterables.

# Generators in JavaScript

## Introduction
The Generator in JS is the object returned by Generator Function and it complies with Iterable and Iterator protocols. It allows us to generate values by pausing the execution of a function temporarily and resuming it later from the last reached point. We can't create instance from Generator class directly; instead, instances of Generator must only be returned by Generator Function.

## Generator Function Syntax
To create a Generator Function, add a star sign (`*`) after the function keyword or before the function name:
```javascript
function* generator() {
    // code here
}

// or 

function *generator() {
    // code here
}
```

## Examples

### Simple Generator
```javascript
function* simpleGen() {
    yield 16;
    yield 9;
    yield 94;
}

const gen = simpleGen();
firstVal = gen.next(); 
secondVal = gen.next();
thirdVal = gen.next();
console.log(gen.next()); // undefined, since done flag will be true
```
We use the `yield` keyword to return a value temporarily and stop the function execution there. In each call, it returns a different value without restarting the execution from the beginning.

### Generator with Conditions
```javascript
function* oddGen(start, end) {
    let num = start;
    while(num <= end) {
        if(num % 2 != 0)
            yield num;
        num++;
    }
}

const odds = oddGen(4, 16);
for(const odd of odds) {
    console.log(odd);
}
```
This Generator Function generates odd numbers in a specific range (from start to end) based on passed parameters and yields the number only if it's odd. Since the returned value from this function is an Iterator, we can traverse the produced numbers using for...of loop.

