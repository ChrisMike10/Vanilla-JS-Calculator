let currentValue = "0";
let previousValue = null;
let operator = null;
let expression = "";

const display = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-number]");
const actionButtons = document.querySelectorAll("[data-action]");
const expressionDisplay = document.getElementById("expression");

// UI UPDATE
function updateDisplay() {
  if (currentValue.length > 10) {
    display.textContent = currentValue.slice(0, 10);
  } else {
    display.textContent = currentValue;
  }
}

// NUMBER INPUT
function handleNumber(number) {
  if (number === "." && currentValue.includes(".")) return;

  if (currentValue === "0" && number !== ".") {
    currentValue = number;
  } else {
    currentValue += number;
  }

  if (previousValue !== null && operator !== null) {
    expressionDisplay.textContent = `${previousValue} ${symbolFor(
      operator
    )} ${currentValue}`;
  }

  updateDisplay();
}

// OPERATOR INPUT
function handleOperator(op) {
  if (currentValue === "0") return;

  previousValue = currentValue;
  operator = op;

  expression = `${previousValue} ${symbolFor(op)}`;
  expressionDisplay.textContent = expression;

  currentValue = "0";
  updateDisplay();
}

function symbolFor(op) {
  if (op === "add") return "+";
  if (op === "subtract") return "−";
  if (op === "multiply") return "×";
  if (op === "divide") return "÷";
}

// CALCULATION
function calculate() {
  if (previousValue === null || operator === null) return;

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result;

  if (operator === "add") result = prev + current;
  if (operator === "subtract") result = prev - current;
  if (operator === "multiply") result = prev * current;
  if (operator === "divide") result = prev / current;

  currentValue = result.toString();
  previousValue = null;
  operator = null;
  expression = "";
  expressionDisplay.textContent = "";

  updateDisplay();
}

function clearCalculator() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  updateDisplay();
}

// EVENT LISTENERS

// Numbers
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleNumber(button.textContent);
  });
});

// Actions
actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      handleOperator(action);
    }

    if (action === "equals") {
      calculate();
    }
    if (action === "clear") {
      clearCalculator();
    }
  });
});

// Initial render
updateDisplay();

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key)) {
    handleNumber(key);
  }
  if (key === ".") {
    handleNumber(".");
  }
  if (key === "+") handleOperator("add");
  if (key === "-") handleOperator("subtract");
  if (key === "*") handleOperator("multiply");
  if (key === "/") handleOperator("divide");
  if (key === "Enter") calculate();
  if (key === "Escape") clearCalculator();
});

// Toggle dark/light mode
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const keyMap = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  ".": ".",
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
  Enter: "equals",
  "=": "equals",
  Escape: "clear",
};

document.addEventListener("keydown", (e) => {
  const action = keyMap[e.key];
  if (!action) return;

  const button = document.querySelector(
    `[data-action="${action}"], [data-number="${action}"]`
  );

  if (!button) return;

  button.classList.add("pressed");
  button.click();
});

document.addEventListener("keyup", () => {
  document
    .querySelectorAll(".pressed")
    .forEach((btn) => btn.classList.remove("pressed"));
});
