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
let result;

function operate(opr, num1, num2) {
  switch (opr) {
    case "÷":
      return divide(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "+":
      return add(num1, num2);
  }
}

const container = document.querySelector(".container");
const display = document.querySelector("#display");

display.value = "0";

let endIsOperator = false;
let canUseComma = true;

function displayNumber(event) {
  if (event.target.classList.contains("number")) {
    if (result) {
      display.value = "0";
    }
    if (display.value === "0") {
      display.value = event.target.textContent;
    } else {
      if (number1 && !operator) {
        operator = display.value.slice(-1);
      }
      display.value += event.target.textContent;
    }
    endIsOperator = false;
  }
};

function displayOperator(event) {
  if (event.target.classList.contains("operator")) {
    if (endIsOperator) {
      display.value = display.value.slice(0, -1);
      display.value += event.target.textContent;
    } else {
      display.value += event.target.textContent;
      if (!number1) {
        number1 = display.value.slice(0, -1);
      }
    }
    endIsOperator = true;
    canUseComma = true;
  }
}

function clearDisplay(event) {
  if (event.target.classList.contains("clear")) {
    display.value = "0";
  }
}

function backSpace(event) {
  if (event.target.classList.contains("del")) {
    if (display.value > 1) {
      display.value = display.value.slice(0, -1);
    } else {
      display.value = "0";
    }
  }
}

function displayComma(event) {
  if (event.target.classList.contains("comma")) {
    if (canUseComma && !endIsOperator) {
      display.value += event.target.textContent;
      canUseComma = false;
    }
  }
}

function displayResult(event) {
  if (event.target.classList.contains("return")) {
    if (number1) {
      number2 = display.value.slice(number1.length + 1,);
    }
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    result = operate(operator, number1, number2);
    display.value = result;
  }
}

container.addEventListener("click", displayNumber);
container.addEventListener("click", displayOperator);
container.addEventListener("click", clearDisplay);
container.addEventListener("click", backSpace);
container.addEventListener("click", displayComma);
container.addEventListener("click", displayResult);