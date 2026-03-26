/*
For an extra challenge, refactor the solution to problem 4 using recursion. 
Bear in mind that named functions created as IIFEs can be referenced by those same functions. 
That is, you can call a function's name in the body of the IIFE. 
Don't worry if you can't solve this problem; it's a bit tricky.
*/

(function countdown (start) {
  if (start >= 0) {
    console.log(start);
    start -= 1;
    return countdown(start);
  }
})(7);