# JavaScript Topics
## Hoisting
- JavaScript code runs in two phases:
  * Creation phase: JavaScript scans the code and pre-processes selected pieces of code
    - All lexical scopes that exist in the program are created
    - All function declarations are **created/bound** in their respective scopes
    - All other variable declarations (NOT initializations!) are **created/bound** in their respective scopes
  * Execution phase: based on the pre-processing, the full code is executed

- Hoisting is a mental model to think about this process
  * According to this mental model, code can be refactored to a form in which all function and variable declarations are 'hoisted' **to the top of the file**
  (C) **to the top of their scope** (global scope => top of the file, function scope => top of function body)
  * Such versions are conceptual rewrites and don't literally represent how the engine rewrites the code
  * In some cases, hoisted versions cannot be executed

## (A) Hoisting var vs. let/const
- let/const
  * declaration is hoisted to the top of its lexical scope
  * the variable is not initialized
  * in other words, the binding exists from the start of the scope, but is uninitialized until the declaration line is executed.
  * using the variable before its declaration line will throw a ReferenceError
  * this is referred to as the 'temporal dead zone'

- var
  * declaration is hoisted
  * initialized to undefined during creation phase
    - this means that a variable declared using var can be used before the line on which it is declared
    - the value undefined will be used, no reference error will be thrown

## (A) function declarations vs. expressions
- function declarations fully hoisted, i.e. both the function's variable name and value (i.e. content of the body) are hoisted
  * this means that functions defined through declarations can be called above the line in which they are declared
- function expressions are partly hoisted
  * the declaration of the variable name is hoisted consistent with the manner in which it is declared (either using var or using let/const)
  * functions defined as expressions that are called before they are declared
    - defined with var: result in a TypeError (the variable is assigned to undefined, which cannot be executed)
    - defined with let/const: result in ReferenceError the variable just exists in the temporal dead zone
  * the function value (i.e. content of the body) is not hoisted
  * the function value will be assigned to the variable on the line where it is defined
  * this means that function expressions cannot be called above the line on which they are defined

## The var statement
- variables declared using let/const have block scope
  * declared in an inner scope, the scope would be the scope of the if, for or switch block e.g. 
  * if declared in the outermost scope of a function body, the scope would be function scope
  * if declared in the outermost scope of the program, the scope would be global
- variables declared using var have function scope
  * if declared anywhere within a function, the scope is the function in which it is declared
    - even if it is declared within an inner scope within the function (e.g. within an if block inside the function), the variable's scope will be the *entire* function
  * if declared in the outermost scope of the program, the scope would be global

## Strict mode
- can be activated by adding line 'use strict' at the top of the file
- In strict mode, a couple of features that are available in 'sloppy' (i.e. non-strict) mode are not available:
  * this is not implicitly bound to the global object when it's not bound to any other execution scope
    - this will be undefined in such cases
    - plain function calls will have this === undefined instead of this being the global object
(A) undeclared variables are not allowed
  * they are not automatically created in the global scope (as they are in sloppy mode)
  * as a result, assigning a value to an undeclared variable throws a ReferenceError
(A) silent errors are explitly thrown, e.g.
  - reassigning a constant throws a TypeError
  - duplicate parameter names throws a SyntaxError

## Closures, scope, and private data
### Scope
- Visibility scope
  * Term only used by LS
  * Refers to where variables are visible
  * Can be either a global or a local scope
    (A) Local can mean block-local or function-local
- Declaration scope
  * Term only used by LS
  * Refers to the scope in which variables are declared
  * Can be either function or block scope
    (A) var creates variables that have function scope 
    (A) {} syntax, if {}, for {}, switch {} create block scope for variables that are declared using let/const
- Lexical scope
  * Term widely used in the JS community
  (A) Refers to the fact that variable scope is determined by where code is written (its lexical/textual structure), not by how functions are called.
- Scope can also be described as inner or outer

### (C) Closures
- Because of lexical scope, a function “remembers” the environment (scope) in which it was defined.
- When a function is created, it is linked to its surrounding lexical environment (the variables that are in scope where it is defined).
- A closure is this combination of:
  * a function, and
  * the lexical environment that the function has access to (its “closed over” variables).
- Closures let a function access variables from an outer scope even after that outer function has returned.
(A) Closures close over all the scopes they have access to and bind to the variables within those scopes. 
(A) Whenever a variable is accessed, it will go through the scopes from inner to outer and look for the variable binding, using the first binding that it can find (i.e. the one in the innermost scope in which te binding is found).

### Private data
-  **Data within closures can only be accessed by the function to which the closure belongs**
(C) Any function that shares that same environment can see those variables.
(C) And if the closure stores an object and you return that object, external code can access/modify its properties.
(C) If a variable lives only in a function’s (or block’s) scope and is not returned or exposed directly, outside code cannot access it by name.

- **Closures cannot be accessed externally**
- **As a result, data stored within closures is private**
(C) If a variable lives only in a function’s (or block’s) scope and is not returned or exposed directly, outside code cannot access it by name.
(C) When we return an inner function that closes over such variables, those variables remain accessible to that inner function but not to external code.
(C) In this way, closures let us simulate “private” data: data that only certain functions can access or modify.

- Creator functions (aka factory functions) can be used to ensure data is private
- **Creator functions will have their own closure, which will contain references to all variables used within their scopes privately**
- **They return functions that can use variables included in the creator function's closure privately**
(C) When you call a creator function, a new lexical environment is created with its local variables.
(C) The creator function returns one or more inner functions that close over those local variables.
(C) - Outside code only has access to the returned inner functions, not to the local variables themselves, so those variables act as private data.

## Partial function application
- This phenomenon occurs when a function that expects multiple arguments has some (but not all) of its arguments pre-filled, with the resulting function expecting the remaining arguments
- This can happen by means of:
  - outer factory functions that return an inner function, passing some of the inner function's arguments in the process
  - the Function.prototype.bind method 

## IIFEs
- Function expressions that are immediately invoked upon creation
- Function definitions are first wrapped in parentheses, which forces it to be parsed as an expression
  * (function(args) {})()
(A) Use cases:
  * Create a new scope immediately (before let/const block scope existed)
  * Avoid leaking variables into the global scope.
  * Optionally return something (like a module object or inner function) that closes over private data.

## Shorthand notation (understanding, not using)
- Array destructuring
  * can be used to declare variables for different elements in an array
  * syntax:
    ```javascript
    let array = [1, 2, 3];
    let [a, b, c] = array;
    a === 1 // true
    b === 2 // true
    c === 3 // true
    ```
- Object destructuring
  * can be used to extract certain values from an object and assign them to variables that correspond to their respective keys
  * must use the same keys the object uses
  * syntax:
  ```javascript
  let obj = {a: 1, b: 2, c: 3}
  let {a, b} = obj;
  a === 1 // true
  b === 2 // true
  c === 3 // ReferenceError since c is not defined as it is not destructured 
  ```

- Spread syntax
  * takes the elements in an array and splits them into separate values
  * e.g. with array literals
  ```javascript
  let arr = [1, 2, 3];
  let func = (a, b, c) => a + b + c;
  func(...arr) === 6 // true
  ```
  * or:
  ```javascript
  let arr1 = [1, 2];
  let arr2 = [3, 4];
  let concatArr = [...arr2, ...arr1];
  // concatArr -> [3, 4, 1, 2]
  ```
  * or with object literals:
  ```javascript
  let personName = {firstName: 'John', lastName: 'Doe'};
  let personAddress = {street: 'High Street 5', city: 'London'};
  let person = {...personName, ...personAddress};
  // person -> {firstName: 'John', lastName: 'Doe', street: 'High Street 5', city: 'London'}
  ```

- Rest syntax
  * gathers the remaining elements/arguments into a new array
  * e.g. with array literals:
  ```javascript
  let numbers = [1, 2, 3, 4, 5];
  let [first, second, ...rest] = numbers;
  first === 1 // true
  second === 2 // true
  // rest -> [4, 5];
  ```
  * or:
  ```javascript
  function logArgs(...args) {
    args.forEach(arg => console.log(arg));
  }
  ```

  * or with object literals: 
  ``` javascript
  let obj = {a: 1, b: 2, c: 3, d: 4};
  let {a, b, ...rest} = obj;
  a === 1 // true
  b === 2 // true
  // rest -> {c: 3, d: 4};
  ```

## Modules (CommonJS)
- There are several different types of modules:
  * CommonJS
    (A) Node’s original/built‑in module system
    (A) Uses require / module.exports
    (A) require calls are regular function calls at runtime
  (A) ES modules (ESM)
    - The standardized JavaScript module system from the language spec.
    - Uses import / export.
    - Supported natively in modern browsers and in Node (with some configuration).
    - multiple named exports and an optional default export.
    - loading is designed to be asynchronous (important in browsers loading over the network).
    - import/export are static; the module relationships are known at parse time.
- **CommonJS modules don't work in a browser environment, only in a Node environment**
(C) CommonJS is Node’s built-in module system; browsers don’t natively support require/module.exports, so CommonJS won’t work in the browser without a bundling/transpilation step.

### Exporting
- Values of a file can be exported and used in other files
  * functions can also be exported
- Every .js file is a CommonJS module
- Every CommonJS module has a module object. JS initializes: 
  * module.exports = {}; 
  * const exports = module.exports;
  * so module.exports and exports both point to the same object
  * mixing the two syntaxes can result in problems when the exports variable and module.exports end up pointing to different things
    - only the value assigned to module.exports will be exported
- **They have to be added to a module in order to be exported**
(C) In CommonJS, every file is already a module. You don’t “add to a module”; you assign to module.exports.
  * You can export:
    - a single value: module.exports = someValue;
    - or an object with multiple properties: module.exports = { foo, bar };
    - the module can only export one value/object, so if multiple objects need to be exported they need to be added as properties of that object
    ```javascript
    let foo = {a: 1, b: 3, c: 5};
    let qux = {x: 2, y: 4, z: 6};

    module.exports.foo = foo;
    module.exports.qux = qux;
    // OR
    module.exports = {foo, qux}
    // OR
    let bar = {foo, qux};
    module.exports = bar;
    ```
- Values that are not assigned to module.exports cannot be used outside the file

### Importing
- Values from another file can be used in any other file
- They need to be imported
  * Syntax: let/const importedValue = require('./relative/path/to/file');
  * require returns the value that was assigned to module.exports in the imported file
  * the value assigned to module.exports in the imported file is then assigned to the importedValue

## Exceptions
- Exceptions occur at runtime when the engine encounters a line of code that it cannot process, and as a result of which it cannot continue with the execution of the program
(A) The program can also contain its own conditions under which it throws an exception
- They can be thrown using ```throw new Error``` syntax
  (A) By convention, we throw instances of Error (or its subclasses) with throw new Error('message');, though JavaScript allows throwing any value.
- Built-in error types
  * ReferenceError: when accessing a variable that hasn't been declared
  * TypeError: when carrying out an operation with an operand that has the wrong type
  * RangeError: is for numeric values outside an allowed range (e.g., invalid array length, invalid arguments to some built-ins)
  * SyntaxError: when the code contains invalid syntax
    - usually occurs at parse time (before execution starts), unlike the others which are runtime
  * Error: generic error object
- Error objects can contain an error message with details on the error
(A) Error objects can be inspected (e.g., error.message, error.name).
- Exceptions can be caught using try-catch syntax
  * try block
    - first, the code in a try{} block is run
    - if an exception occurs, the code in the try block stops immediately and the engine proceeds to execute the code in the catch block
  * catch block
    - the catch block can be used to resolve the exception
    - The catch block should focus on handling the error (logging, cleaning up, providing a fallback), and avoid doing unrelated work.
      * therefore, it ideally uses as little code as possible 
  * (in synchronous code) unless an exception is caught and resolved, execution of the program will terminate immediately
  (A) An optional finally block can be added; its code runs whether or not an exception was thrown, and runs after try/catch (to do any required teardown, e.g. closing an open database connection ).
- Exceptions are passed up the call chain **in a manner similar to how return values are returned up the chain**
(C) not in a similar manner like return values -> return values don't unwind the call-stack
(C) A throw unwinds the stack until a catch is found; if none is found, the program terminates.
(C) If an exception isn’t caught in the current function, it propagates up the call stack to the caller, and so on, until it is caught or the program terminates with an uncaught exception.

## Pure functions and side effects
  - Pure function: given the same inputs (args), always returns the same output and causes no observable side effects.
  - Side effects:
    * modifying external state 
      - mutating a global array
      - reassigning a global variable
    * performing I/O 
      - obtaining user input
      - logging to console
      - network requests
      - reading/writing files, 
    * mutating input objects

- side effects: any of the following operations that might part of a function (other than returning value)
  * reassigning a global variable
  * taking user input
  * logging to the console
  * accessing a database (both read and write)
  * mutating **an object**
  (C) mutating external state, e.g. 
    - mutating an object in the outer scope
    - reassigning a global variable
- pure functions: **return a value**, but don't have any of the aforementioned side effects
(C) return a value that depends solely on its arguments and has no side effects
(A) reading an external state causes a function to be impure
  - reading a variable from the outer scope

## Asynchronous programming (setTimeout, setInterval)
- Synchronous programming: program is executed line by line. One line is completed before the next one starts
  * every function that's called adds another frame on top of the call stack
- Asynchronous programming: in some other languages, multiple separate pieces of code can run simultaneously
- JavaScript is a single-threaded languages with one call stack, which means that it doesn't support true asynchrony
  * in practice, asynchrony in JS is achieved via host environment APIs that schedule callbacks
- JS relies on host environment APIs (browser or Node), a callback queue and the event loop to support delay execution and avoid blocking the call stack with asynchronous function calls

- setTimeout and setInterval are used to initiate asynchronous code
  * they are both synchronous themselves
  * setTimeout:
    - takes a function and time delay quoted in miliseconds (and optional extra args after the delay)
    - a call to setTimeout passes the arguments to the API
    - after the specified time delay, the API enqueues function argument in the queue
  * setInterval:
    - takes a function argument and a time delay quoted in miliseconds (and optional extra args after the delay)
    - a call to setInterval passes the arguments to the API
    - at the specified interval, the API enqueues the function in the queue
  * both functions return an ID
    - clearInterval(ID) stops further callbacks
    - without a clearInterval call, callbacks continue until the program terminates
  * the event loop checks the callback queue whenever the call stack is empty.
    - in practice this means that the calls in the queue are only added to the call stack once all 'synchronous' code in the program has run
  * if there’s a callback waiting, it dequeues it and pushes that function call onto the stack.
  * this process continues until the queue is empty and the program finishes
  * each callback runs to completion before the next one is dequeued (when the call stack is empty again)

# Testing With Jest
(A) testing can be used to prevent regression
  * regression: when changes to code accidentally breaks existing features that were working before
  * automated test can be run after every change to check that there is no regression
 
## Testing terminology
(A) test suite: a collection of tests
(C) test case/spec: a single test that verifies one specific behavior/requirement
(A) assertion: a way of checking whether expected output matches actual output
(C) unit test: a test that focuses on a small, isolated part of the code (often a single function), usually with one or more assertions.

## Jest
- An npm module that allows users to create/run test suites
- Imports the module that needs to be tested using 'require' when using CommonJS
(A) Looks for test files ending in .spec.js or .test.js
(A) test suites start with describe(description, anonymousFunction) where
  * description: a string that describes the test suite
  * anonymousFunction: function that contains all the test blocks
(A) tests are written in blocks using the test(testSummary, anonymousFunction) function, where
  * testSummary is a string containing a short description of the test
  * anonymousFunction is the function that contains the actual code that will run during the test
    - ends with an expect(expression).<Matcher>(expectedValue) statement
      * expression: a call to a function in the imported module
      * <matcher>: a matcher that decides how the result of the expression and the expected value are matched, see list of matchers below
  * it() may be used as a substitute for test()

## expect and matchers (toBe and toEqual especially)
- toBe: expectedValue === returnedValue
- toEqual: works with objects as well as long as their contents are equal (two different objects with the same content wil pass a test with toEqual)
- toBeNull: expectedValue === null

## SEAT approach
- Set up: creating the necessary environment (objects) for the test
- Execute: execute the test against the objects
- Assert: assert the results of execution
- Tear down: clean up any lingering artifacts

## Understanding code coverage
- A measure of what share of the code was actually tested
- Can be measured using different metrics
  * Percentage of lines executed
  * Percentage of functions executed
  * Percentage of branches executed” (e.g. both if and else parts).


## Writing tests
- How to structure a test file
  ```javascript
  let importedModule = require('path'); // import required modules
  let newObj; // decl here so that it is available for all tests
  
  describe('description', () => {
    beforeEach(() => {
      newObj = new Obj(); // set up objects required for each test
    });

    test('test description', () => {
      let otherObj = new Obj(); // set up objects required for this specific test
      let arg = 5; // set up any variables needed
      let outcome = otherObj.method(arg);
      let expectedValue = newObj.method(arg);
      
      expect(outcome).toBe(expectedValue); // assert to compare outcome with expectation
    });
  });
  ```
- How to write an individual test
  * 
- What makes a good test
  * 
- How tests are run
  * 

# Packaging Code
## Project directory layout
- directory
  * /lib -> used to store the source code (sometimes /src is used instead of /lib)
  * /test -> used to store all test files
  * /node_modules -> used to install all dependencies
  * /dist -> used for transpilated code
  * /package.json -> see below

## what is transpilation
- transposing code into an another language or another version of JavaScript
- transposed code delivers the same outcomes for the same input as the original code
- sometimes used to make code backwards compatible
  * e.g. making code using ES6 features such as classes compatible with browsers running ES5 engines
- Babel is a tool commonly used for ES6 -> ES5 transpilation

## npm and npx
### npm
- node package manager
- part of the node environment that allows users to install/use code packages that have been developed by other developers
- commands:
  * init -> creates package.json file
  * install 'package_name' -> installs a package
    - locally (by default in node_modules)
    - globally using the -g flag
    - commands to execute a pckage will look through diretories recursvely to fin the package
  * npm install --save-dev 'package' (or shorthand npm i -D 'package')
    - Installs a package as a dev dependency (goes into devDependencies in package.json).
    - Used for tools you only need during development/test (e.g. Jest, linters, build tools).
  * npm test
    - runs the "test" script defined in package.json (commonly something like "jest").
  * npm run 'script-name'
    - Runs any custom script defined under "scripts" in package.json (e.g. "build", "lint", "start").

### npx
- command to execute a package
 * without installing it locally by temporarily downloading it
 * that’s installed locally in node_modules/.bin (without you needing a script)

## package.json and package-lock.json
### package.json 
- file that can be generated through the 'npm init' command
- is mainly used to show dependencies of a program by name and version range, not which exact versions are installed.
(A) stores basic project metadata (name, version, etc.)
(A) defines scripts (like "test": "jest"), which you’ll use with npm test, npm run <script>.
(A) packages that are installed after package.json is created are automatically added, but packages that are already added are *not* automatically added to package.json when it is created, these would need to be reinstalled to be added

### package-lock.json
- automatically generated/updated through npm when a new package is installed, *as long as there's an existing package.json file*
- shows the actual versions of the dependencies that are installed locally
  * It’s mainly for the tooling and reproducible installs; you generally don’t edit it by hand or “choose versions” from it
(A) locks down the full dependency tree (including sub‑dependencies), so installs are reproducible.

## npm scripts
(A) commands defined in package.json under a "scripts" section.
(A) act as shortcuts for longer terminal commands (like running Jest, starting a dev server, building, etc.).
(A) run using npm run 'script name'
(A) useful so collaborators (and CI) can run standard tasks with a single consistent command.
```javascript
{
  "scripts": {
    "exec-helper": "node ./scripts/helper.js"
  }
}

// in terminal: npm run exec-helper
```

## packaging projects
(A) Preparing a project so it can be installed and used as an npm package (or at least cloned and installed reliably).
(A) Steps:
   - package.json with name, version, main entry point, scripts, dependencies.
   - Code in a clear layout (lib/src, test, etc.).
   - Possibly a build step (transpilation into dist) if using newer syntax.
   