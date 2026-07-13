const previousInput = document.querySelector('.previous-number');
const currentInput = document.querySelector('.current-number');
const numberBtn = document.querySelectorAll('.btn-number');
const operatorBtn = document.querySelectorAll('.btn-operator');
const actionBtn = document.querySelectorAll('.btn-action');;

let currentOperand = "";
let previousOperand = "";
let operation = null;

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.'))
        return;
    currentOperand += number.toString();
    currentInput.innerHTML = currentOperand;
}
numberBtn.forEach(function (button) {
    button.addEventListener('click', function () {
        appendNumber(button.innerText);
    })
})

function chooseOperation(operator) {
    if (currentOperand === "")
        return;
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = "";
    previousInput.innerHTML = previousOperand + " " + operation;
    currentInput.innerHTML = "";
}
operatorBtn.forEach(function (operator) {
    operator.addEventListener('click', function () {
        chooseOperation(operator.innerText);
    })
})

function calculate(action) {
    let computation;
    let previous = parseFloat(previousOperand);
    let current = parseFloat(currentOperand);
    if (isNaN(previous) || isNaN(current)) return;

    if (operation === '+') {
        computation = previous + current;
    } else if (operation === '-') {
        computation = previous - current;
    } else if (operation === '*') {
        computation = previous * current;
    } else if (operation === '/') {
        if (current === 0) {
            computation = "Error, Cannot divide by zero!";
        } else {
            computation = previous / current;
        }
    }

    currentOperand = computation.toString();
    operation = null;
    previousOperand = "";

    currentInput.innerHTML = currentOperand;
    previousInput.innerHTML = previousOperand;
}

function clear(action) {
    currentOperand = "";
    previousOperand = "";
    operation = null;

    currentInput.innerHTML = 0;
    previousInput.innerHTML = 0;
}

function del(action) {
    currentOperand = currentOperand.slice(0, -1);
    currentInput.innerHTML = currentOperand;
}
actionBtn.forEach(function (action) {
    action.addEventListener('click', function () {
        if (action.innerText === '=') calculate();
        else if (action.innerText === "AC") clear();
        else if (action.innerText === 'DEL') del();
    })
})
