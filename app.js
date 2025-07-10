function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

let number1;
let number2;
let operator;

function operate(opr, num1, num2) {
  switch (opr) {
    case "÷":
      divide(num1, num2);
    case "*":
      multiply(num1, num2);
    case "-":
      subtract(num1, num2);
    case "+":
      add(num1, num2);
  }
}