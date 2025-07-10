let number1 = "";
let number2 = "";
let operator = "";
let history = "";
let finalResult = "";
let endIsOperator = false;
let canUseComma = true;

const container = document.querySelector(".container");
const display = document.querySelector("#display");
const tempResult = document.querySelector(".temp-result");

display.textContent = "0";

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

function reset() {
  number1 = "";
  number2 = "";
  operator = "";
  history = "";
  tempResult.textContent = "";
  endIsOperator = false;
  canUseComma = true;
}

function operate(opr, num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch (opr) {
    case "÷":
      return divide(num1, num2);
    case "×":
      return multiply(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "+":
      return add(num1, num2);
  }
}

function displayNumber(event) {
  if (event.target.classList.contains("number")) {
    if (display.textContent.length === 21) return;
    if (finalResult) {
      display.textContent = "0";
      finalResult = "";
    }
    if (display.textContent === "0") {
      display.textContent = event.target.textContent;
    } else {
      display.textContent += event.target.textContent;
    }
    endIsOperator = false;
    getNumber();
    if (operator, number1, number2) {
      tempResult.textContent = Math.round(operate(operator, number1, number2) * 1000000000) / 1000000000;
    }
  }
};

function displayOperator(event) {
  if (event.target.classList.contains("operator")) {
    if (display.textContent.length === 21) return;
    if (finalResult) {
      number1 = finalResult;
      finalResult = "";
    }
    if (endIsOperator) {
      display.textContent = display.textContent.slice(0, -1);
      display.textContent += event.target.textContent;
    } else {
      display.textContent += event.target.textContent;
    }
    endIsOperator = true;
    canUseComma = true;

    getOperator(event);
    history = display.textContent;
  }
}

function clear(event) {
  if (event.target.classList.contains("clear")) {
    display.textContent = "0";
    reset();
  }
}

function backSpace(event) {
  if (event.target.classList.contains("del")) {
    if (display.textContent.length > 1) {
      display.textContent = display.textContent.slice(0, -1);
    } else {
      display.textContent = "0";
    }
  }
}

function displayComma(event) {
  if (event.target.classList.contains("comma")) {
    if (display.textContent.length === 21) return;
    if (canUseComma && !endIsOperator) {
      display.textContent += event.target.textContent;
      canUseComma = false;
    }
  }
}

function getNumber() {
  if (!tempResult.textContent && !operator) {
    number1 = display.textContent;
  } else {
    number2 = display.textContent.slice(history.length,);
  }
}

function getOperator(event) {
  if (!number1) {
    number1 = "0";
  }
  if (tempResult.textContent) {
    number1 = tempResult.textContent;
    number2 = "";
  }
  operator = event.target.textContent;
}

function summarize(event) {
  if (event.target.classList.contains("return")) {
    if (operator, number1, number2) {
      finalResult = Math.round(operate(operator, number1, number2) * 1000000000) / 1000000000;
      display.textContent = finalResult;
      reset();
    }
  }
}

container.addEventListener("click", displayNumber);
container.addEventListener("click", displayOperator);
container.addEventListener("click", clear);
container.addEventListener("click", backSpace);
container.addEventListener("click", displayComma);
container.addEventListener("click", summarize);