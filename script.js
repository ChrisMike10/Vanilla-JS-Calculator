// STATE (ONE SOURCE OF TRUTH)

let currentValue = "0";
let previousValue = null;
let operator = null;

const display = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-number]");
const actionButtons = document.querySelectorAll("[data-action]");

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

  updateDisplay();
}

// OPERATOR INPUT
function handleOperator(op) {
  if (operator !== null && previousValue !== null) {
    calculate();
    previousValue = currentValue;
  } else {
    previousValue = currentValue;
  }

  operator = op;
  currentValue = "0";
}

// CALCULATION
function calculate() {
  if (previousValue === null || operator === null) return;

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result;

  if (operator === "add") result = prev + current;
  else if (operator === "subtract") result = prev - current;
  else if (operator === "multiply") result = prev * current;
  else if (operator === "divide") result = prev / current;

  currentValue = result.toString();
  previousValue = null;
  operator = null;
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
