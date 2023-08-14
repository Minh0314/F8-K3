// bài1
function fibonacci(n) {
  if (n <= 0) {
    return [];
  } else if (n == 1) {
    return [0];
  } else if (n == 2) {
    return [0, 1];
  } else {
    var fib_list = fibonacci(n - 1);
    fib_list.push(fib_list[n - 2] + fib_list[n - 3]);
    return fib_list;
  }
}

var n = 10;
console.log(fibonacci(3));

/// Bài2

function reverseNumber(n) {
  if (n < 10) {
    return n;
  } else {
    let lastDigit = n % 10;
    let remainingDigits = Math.floor(n / 10);
    let numDigits = Math.floor(Math.log10(n)) + 1;
    return (
      lastDigit * Math.pow(10, numDigits - 1) + reverseNumber(remainingDigits)
    );
  }
}

let n = 12345;
console.log(reverseNumber(n));
