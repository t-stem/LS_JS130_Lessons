/*
Extend the code from the previous problem with a stopCounting function that stops the logger when called.
*/


function startCounting() {
  let currNum = 1;

  let counter = setInterval(() => {
    console.log(currNum);
    currNum += 1;
  }, 1000);

  return counter;
}

let counter = startCounting();

function stopCounting(counter) {
  clearInterval(counter)
}

setTimeout(stopCounting, 5000, counter)