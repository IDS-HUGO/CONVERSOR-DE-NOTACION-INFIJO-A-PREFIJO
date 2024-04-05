import { Stack } from "../models/Stacks.js";




function isOperator(char) {
    return char === '+' || char === '-' || char === '*' || char === '/' || char === '^';
}
function isParenthesis(char) {
    return char === '(' || char === ')';
}

function precedence(operator) {
    switch (operator) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        case '^':
            return 3;
        default:
            return 0;
    }
}

function infixToPrefix(infixExpression) {
    let prefixExpression = '';
    const stack = new Stack();
 
    infixExpression = infixExpression.split('').reverse().join('');
    
    for (let i = 0; i < infixExpression.length; i++) {
        let char = infixExpression[i];
 
        if (isParenthesis(char)) {
            if (char === ')') {
                stack.push(char);
            } else {
                while (!stack.isEmpty() && stack.peek() !== ')') {
                    prefixExpression += stack.pop();
                }
                stack.pop();
            }
        } 
        else if (isOperator(char)) {
            while (!stack.isEmpty() && precedence(stack.peek()) > precedence(char)) {
                prefixExpression += stack.pop();
            }
            stack.push(char);
        } 
        else {
            prefixExpression += char;
        }
    }
    
    while (!stack.isEmpty()) {
        prefixExpression += stack.pop();
    }
    
    return prefixExpression.split('').reverse().join('');
}

// Función para evaluar una expresión prefija
function evaluatePrefix(prefixExpression) {
    const stack = new Stack();

    prefixExpression = prefixExpression.split('').reverse();

    for (let i = 0; i < prefixExpression.length; i++) {
        const char = prefixExpression[i];

        if (!isOperator(char)) {
            stack.push(parseInt(char));
        } else {
            const operand1 = stack.pop();
            const operand2 = stack.pop();
            switch (char) {
                case '+':
                    stack.push(operand1 + operand2);
                    break;
                case '-':
                    stack.push(operand1 - operand2);
                    break;
                case '*':
                    stack.push(operand1 * operand2);
                    break;
                case '/':
                    stack.push(operand1 / operand2);
                    break;
                case '^':
                    stack.push(Math.pow(operand1, operand2));
                    break;
            }
        }
    }

    return stack.pop();
}

// Obtener elementos del DOM
const infixInput = document.getElementById('infixExpression');
const prefixOutput = document.getElementById('prefixExpression');
const resultOutput = document.getElementById('result');
const convertButton = document.getElementById('convertButton');
const calculateButton = document.getElementById('calculateButton');

// Función de conversión al hacer clic en el botón
convertButton.addEventListener('click', () => {
    const infixExp = infixInput.value.trim();
    const prefixExp = infixToPrefix(infixExp);
    prefixOutput.value = prefixExp;
});

// Función de cálculo al hacer clic en el botón
calculateButton.addEventListener('click', () => {
    const prefixExp = prefixOutput.value.trim();
    const result = evaluatePrefix(prefixExp);
    resultOutput.value = result;
});
