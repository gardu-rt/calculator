let finalResult = "";
let rawInput = "";
let cleanInput = "";
let tokens = "";
let endIsOperator = false;
let canUseComma = true;

const container = document.querySelector(".container");
const display = document.querySelector("#display");
const tempResult = document.querySelector(".temp-result");

display.textContent = "0";


function evaluateExpression(arr) {
  if (arr.length % 2 === 0) arr.splice(-1);
  let array = [...arr];
  for (let i = 0; i < array.length; i++) {

    if (array[i] === "*" || array[i] === "/") {
      let left = parseFloat(array[i - 1]);
      let right = parseFloat(array[i + 1]);
      let result = array[i] === "/" ? left / right : left * right;

      array.splice(i - 1, 3, result.toString());

      i -= 1;
    }
  }

  for (let i = 0; i < array.length; i++) {

    if (array[i] === "+" || array[i] === "-") {
      let left = parseFloat(array[i - 1]);
      let right = parseFloat(array[i + 1]);
      let result = array[i] === "+" ? left + right : left - right;

      array.splice(i - 1, 3, result.toString());

      i -= 1;
    }
  }

  return array[0];
}

function reset() {
  rawInput = "";
  cleanInput = "";
  tokens = "";
  tempResult.textContent = "";
  endIsOperator = false;
  canUseComma = true;
}


function updateDisplay(value) {
  display.textContent = value.toString().slice(0, 21);
  rawInput = display.textContent;
  cleanInput = rawInput.replace(/×/g, "*").replace(/÷/g, "/");
  tokens = cleanInput.match(/(\d+(\.\d+)?|[+\-*/])/g);

};

function updateTempResult() {
  if (tokens.length >= 2) {
    const result = evaluateExpression(tokens);
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

  history = display.textContent;
}

function clear() {
  updateDisplay("0");
  reset();
}

function backSpace() {
  if (display.textContent.length > 1) {
    updateDisplay(display.textContent.slice(0, -1));
  } else {
    updateDisplay("0");
  }

  updateTempResult();
  endIsOperator = endIsOperator ? false : true;
}

function handleComma(value) {
  if (display.textContent.length === 21) return;
  if (canUseComma && !endIsOperator) {
    updateDisplay(display.textContent + value);
    canUseComma = false;
  }
}

function handleEqual() {
  if (tokens) {
    const result = Math.round(evaluateExpression(tokens) * 1e9) / 1e9;
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