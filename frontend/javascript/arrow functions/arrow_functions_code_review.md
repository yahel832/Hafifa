# Arrow Functions - Code Review

## Overall Feedback 
Hi there! Good job completing your exercises. Your code successfully uses arrow functions, recursion, and higher-order array methods. 

Below are some thoughts and explanations intended to help you understand the code better and improve as a developer.


### 1. Fibonacci Sequence ([runFibonacci](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/arrow%20functions/main.js#13-18) & [recursiveTimeout](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/arrow%20functions/main.js#19-29))

**What you did well:**
- You correctly used `setTimeout` to create a 100ms delay between prints.
- You successfully passed arguments to your recursive timeout callback.

**Understanding Your Approach vs. Fundamentals:**
Your algorithm ([fibonacciByIndex](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/arrow%20functions/main.js#1-12)) recalculates the entire Fibonacci sequence from scratch every single time [recursiveTimeout](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/arrow%20functions/main.js#19-29) runs. So on the 10th interval, it builds an array of 10 numbers just to pull the last one. For large numbers, doing this every 100ms is very taxing!

Additionally, you used `if (!num) num = 10;` to set a default parameter. Modern JavaScript allows "Default Parameters" right in the function definition (e.g., `const runFibonacci = (num = 10) => ...`), which is cleaner!

**📝 Action Required:**
To solidify your understanding of State and Efficiency, please do the following:
1. Research how to use ES6 Default Parameters and describe how you would apply it to [runFibonacci](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/arrow%20functions/main.js#13-18).
2. Explain how you could modify [recursiveTimeout](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/arrow%20functions/main.js#19-29) to pass the *previously calculated values* (the state) into the next `setTimeout` iteration so you don't have to rebuild the sequence from `0` each tick.
3. In a new, separate file called `optimizedFibonacci.js`, rewrite [recursiveTimeout](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/arrow%20functions/main.js#19-29) using the improved efficiency approach you explained above.

---

### 2. [evenArray](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/arrow%20functions/main.js#32-37) Function

**What you did well:**
- You correctly nested `.map()` and `.filter()`.
- You applied very solid arrow function syntax without unnecessary `return` statements for one-liners!

**Understanding Your Approach vs. Fundamentals:**
First, you declared your test array as `array = [...]` at the bottom of the file without a keyword. Not using `const` or `let` behaves badly because it forces JavaScript to declare the variable in the global scope (which is often forbidden in "Strict Mode"). Always use a declaration keyword!

Second, you used nested functional methods like `.map` and `.filter`. While it's great abstract syntax, you need to understand the imperative control loops they replace.

**📝 Action Required:**
To prove your understanding of abstraction in functional programming:
1. Explain step-by-step how the inner logic `arr.map(filteredarr => filteredarr.filter(num => num % 2 === 0))` parses the arrays of arrays. What specifically does `.map` return in your outer loop compared to the inner `.filter`?
2. As an educational exercise in a new file called `evenArrayImperative.js`, rewrite the [evenArray](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/arrow%20functions/main.js#32-37) function completely from scratch. Don't use `.map()` or `.filter()`. Instead, use traditional nested `for` loops and `.push()` to achieve the exact same nested array structure as a final output!

### Keep it up!
You have successfully demonstrated familiarity with arrow functions and callbacks. Understanding the tradeoffs between recalculating data versus keeping state, as well as knowing how array abstractions work under the hood, will help you become a fundamentally excellent developer!
