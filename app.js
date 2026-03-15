let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

const displayValue = document.getElementById('displayValue');
const operationDisplay = document.getElementById('operation');

function updateDisplay() {
    displayValue.textContent = currentValue.length > 10 
        ? currentValue.substring(0, 10) + '...'
        : currentValue;
}

function inputNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        currentValue = currentValue === '0' ? num : currentValue + num;
    }
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    shouldResetDisplay = false;
    operationDisplay.textContent = '';
    updateDisplay();
}

function deleteLast() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function setOperation(op) {
    if (operation !== null && !shouldResetDisplay) {
        calculate();
    }
    previousValue = currentValue;
    operation = op;
    shouldResetDisplay = true;
    
    const opSymbol = {
        'add': '+',
        'subtract': '−',
        'multiply': '×'
    }[op];
    
    operationDisplay.textContent = previousValue + ' ' + opSymbol;
}

function calculate() {
    if (operation === null || previousValue === '') {
        return;
    }

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch(operation) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operation = null;
    previousValue = '';
    shouldResetDisplay = true;
    operationDisplay.textContent = '';
    updateDisplay();
}

function redirectToSubscription() {
    window.location.href = 'subscription.html';
}

// Initialize display
updateDisplay();
