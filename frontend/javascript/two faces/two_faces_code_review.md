# Two Faces - Code Review

## Overall Feedback 
Hi there! Good job completing the exercise! Your code successfully implements the requirements. Below are some thoughts and explanations intended to help you understand the code better and improve as a developer.

---

## Code Review for the Developer

### 1. [doubleValue](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/two%20faces/main.js#8-19) Function
This function successfully takes an object and doubles the numeric values. 

**What you did well:**
- You efficiently checked if the value is a number using `typeof value === 'number'`.
- You returned a **new** object instead of changing (mutating) the original object. 

**Understanding Your Approach vs. Alternatives:**
You used an advanced functional approach with `Object.entries()`, `.map()`, and `Object.fromEntries()`. This is a powerful and concise way to transform objects in JavaScript, because it avoids mutating data during the loop.

However, it requires a solid understanding of array destructuring and higher-order functions. When you review this code, make sure you can explain exactly how `Object.entries` transforms the object into an array of sub-arrays, and how `Object.fromEntries` turns it back into an object. 

**📝 Action Required:**
To solidify your understanding of these concepts, please do the following:
1. Explain in your own words how the array destructuring [([key, value]) => ...](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/arrow%20functions/main.js#32-37) works within your `.map` function.
2. In a new, separate file called `doubleValueImperative.js`, rewrite this exact same logic using a standard `for...in` loop instead of advanced methods. Understandi4ng both the declarative and imperative approaches makes you a more versatile developer!

---

### 2. [switchKeyValue](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/two%20faces/main.js#20-25) Function
This function successfully swaps the keys and the values.

**What you did well:**
- You accurately extracted and swapped the properties into a completely new object.

**Understanding Your Approach vs. Alternatives:**
Similar to [doubleValue](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/two%20faces/main.js#8-19), you used an advanced chained method here: `Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]))`. This is very clean, but quite dense.

Make sure you fully understand what [([key, value]) => [value, key]](file:///Users/yarin/Yahel-Hairwash/Hafifa/frontend/javascript/arrow%20functions/main.js#32-37) is doing: it destructures the array argument from the parameter into `key` and `value` variables, and then constructs a newly reversed array block.

**📝 Action Required:**
Just like the first exercise, please do the following:
1. Explain how `Object.fromEntries` knows how to rebuild the object from the array you mapped over.
2. In a new, separate file called `switchKeyValueImperative.js`, rewrite this function using a traditional `for...in` loop. 

### Keep it up!
As a developer, it's important not just to have code that "works," but to fully grasp *why* it works. Advanced array and object methods (`map`, `filter`, `reduce`, `Object.fromEntries`) are very powerful and widely used in modern JavaScript. Keep practicing them, but ensure you know how to build the same logic using foundational tools like `for` loops. The true mark of a strong developer is understanding exactly what the computer is doing under the hood!
