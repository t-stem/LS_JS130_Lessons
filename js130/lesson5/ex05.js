/*
Write a function named afterNSeconds that takes two arguments: a callback and a time duration in seconds. 
It should wait for the indicated period, then invoke the callback function.
*/


function afterNSeconds(callback, delaySecs) {
  setTimeout(callback, delaySecs * 1000);
}

let func = () => console.log('Execute');

afterNSeconds(func, 5);