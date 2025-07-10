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
  return num2 === 0 ? "Error" : num1 / num2;
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

function updateDisplay(value) {
  display.textContent = value.toString().slice(0, 21);
};

function updateTempResult() {
  if (operator && number1 && number2) {
    const result = operate(operator, number1, number2);
    tempResult.textContent =
      typeof result === "number"
        ? Math.round(result * 1e9) / 1e9
        : result;
  } else {
    tempResult.textContent = "";
  }
}

function handleNumber(value) {
  if (finalResult) {
    display.textContent = "0";
    finalResult = "";
  }

  if (display.textContent === "0") {
    updateDisplay(value);
  } else {
    updateDisplay(display.textContent + value);
  }

  endIsOperator = false;
  getNumber();

  updateTempResult();
};

function handleOperator(value) {
  if (finalResult) {
    number1 = finalResult;
    finalResult = "";
  }
  if (endIsOperator) {
    display.textContent = display.textContent.slice(0, -1);
    updateDisplay(display.textContent + value);
  } else {
    updateDisplay(display.textContent + value);
  }
  endIsOperator = true;
  canUseComma = true;

  getOperator(value);
  history = display.textContent;
}

function clear() {
  display.textContent = "0";
  reset();
}

function backSpace() {
  if (display.textContent.length > 1) {
    display.textContent = display.textContent.slice(0, -1);
    getNumber();
  } else {
    display.textContent = "0";
  }
}

function handleComma(value) {
  if (display.textContent.length === 21) return;
  if (canUseComma && !endIsOperator) {
    updateDisplay(display.textContent + value);
    canUseComma = false;
  }
}

function getNumber() {
  if (!tempResult.textContent && !operator) {
    number1 = display.textContent;
  } else {
    number2 = display.textContent.slice(history.length,);
  }
}

function getOperator(value) {
  if (!number1) {
    number1 = "0";
  }
  if (tempResult.textContent) {
    number1 = tempResult.textContent;
    number2 = "";
  }
  operator = value;
}

function handleEqual() {
  if (operator && number1 && number2) {
    const result = Math.round(operate(operator, number1, number2) * 1e9) / 1e9;
    finalResult = result === "Error" ? "Error" : result;
    !finalResult ? clear() : updateDisplay(finalResult);
    reset();
  }
}

container.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.matches("button")) return;

  if (target.classList.contains("number")) {
    handleNumber(target.textContent);
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.textContent);
  }

  if (target.classList.contains("clear")) {
    clear();
  }

  if (target.classList.contains("del")) {
    backSpace();
  }

  if (target.classList.contains("comma")) {
    handleComma(target.textContent);
  }

  if (target.classList.contains("return")) {
    handleEqual();
  }
});