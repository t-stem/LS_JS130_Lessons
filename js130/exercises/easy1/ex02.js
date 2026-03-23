/*
Write a function that returns an array of all of the divisors of the positive integer passed in as an argument. 
The return value can be in any sequence you wish, though its easiest to return them in order.
*/

function divisors(num) {
  let divisors = [];
  let numIsEven = num % 2 === 0;
  let increment = numIsEven ? 1 : 2;

  for (let i = 1; i <= Math.ceil(num / 2); i += increment) {
    if (num % i === 0 && !divisors.includes(i)) {
      divisors.push(i);
      if (num !== 1) {
        divisors.push(num / i);
      }

    }
  }
  return divisors.sort((a, b) => a - b);
}


let p = console.log;

p(divisors(1));          // [1]
p(divisors(7));          // [1, 7]
p(divisors(12));         // [1, 2, 3, 4, 6, 12]
p(divisors(98));         // [1, 2, 7, 14, 49, 98]

// This may take a minute or so to run
p(divisors(9995000429)); // [1, 99961, 99989, 9995000429]