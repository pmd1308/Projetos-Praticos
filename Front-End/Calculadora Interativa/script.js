let num1 = "";
let num2 = "";
let operator = "";

function updateDisplay(value) {
  if (operator === "") {
    num1 = parseFloat(num1 + value);
  } else {
    num2 = parseFloat(num2 + value);
  }
  document.getElementById("display").value = num1 + (" " + operator + " ") + num2;
}

function calculate() {
  let result;
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        result = "Error: Division by zero";
      } else {
        result = num1 / num2;
      }
      break;
    case "^":
      result = Math.pow(num1, num2);
      break;
  }
  document.getElementById("display").value = result;
  num1 = "";
  num2 = "";
  operator = "";
}

function handleClick(value) {
  switch (value) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
      updateDisplay(value);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
    case "^":
      operator = value;
      break;
    case "=":
      calculate();
      break;
    case "C":
      num1 = "";
      num2 = "";
      operator = "";
      document.getElementById("display").value = "";
      break;
  }
}
