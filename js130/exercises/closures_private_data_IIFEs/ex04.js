/*
Write a delegate function that can be used to delegate the behavior of a method or function to another object's method. 
delegate takes a minimum of two arguments: (1) the object and (2) name of the method on the object. 
The remaining arguments, if any, are passed — as arguments — to the objects' method that it delegates to. 
The delegate function should return the same value returned by calling the other object's method.
*/

function delegate(obj, methodName, ...args) {
  let method = obj[methodName];
  return method(...args);
}

let interactions = {greet: function(person) {
  return `Hello, ${person}`;
}}

console.log(interactions.greet('John'));
console.log(delegate(interactions, 'greet', 'John'));