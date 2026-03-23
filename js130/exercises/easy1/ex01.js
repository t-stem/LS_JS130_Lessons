/*
Write a function that takes a sorted Array of integers as an argument, 
and returns an array that includes all of the missing integers (in order) 
between the first and last elements of the argument.
*/

/*
PROBLEM
in: sorted arr of ints
out: arr of missing ints (in order) between first and last element

DATA STRUCTURES
- Arr

ALGO
- SET missingNums equals new arr startinf rom 
- LOOP through inputArr
  IF index equals 0
    continue
  ELSE IF difference between currNum and previousNum is not equal to 1
    addMissingNums(previousNum, currNum, missingNums)

- RETURN missingNums

addMissingNums(start, finish, arr):
- SET currInt equals start
- WHILE currInt doesn't equal finish - 1
  - SET currInt equals currInt + 1
  - ADD currInt to arr
*/

function missing(inputArr) {
  let missingNums = [];
  let previousNum;

  for (let i = 0; i < inputArr.length; i += 1) {
    let currNum = inputArr[i];

    if (previousNum !== undefined && currNum - previousNum !== 1) {
      addMissingInts(previousNum, currNum, missingNums);
    }
    
    previousNum = currNum;
  }

  return missingNums;
}

function addMissingInts(start, end, arr) {
  let currInt = start;

  while (currInt !== end - 1) {
    currInt += 1;
    arr.push(currInt);
  }
}

let p = console.log;

p(missing([-3, -2, 1, 5]));   // [-1, 0, 2, 3, 4]
p(missing([1, 2, 3, 4]));     // []
p(missing([1, 5]));           // [2, 3, 4]
p(missing([6]));              // []

