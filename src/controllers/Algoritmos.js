// algoritmos.js

import { Stack } from "../models/Stacks.js";

export class Algoritmos {
    constructor() {
        this.precedencia = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '^': 3
        };
    }

    esOperador(caracter) {
        return this.precedencia.hasOwnProperty(caracter);
    }

    convertirInfijoAPrefijo(expresionInfija) {
        let expresionPrefija = '';
        const pilaOperadores = new Stack();
        const precedencia = this.precedencia;

        for (let i = expresionInfija.length - 1; i >= 0; i--) {
            const caracter = expresionInfija[i];

            if (this.esOperador(caracter)) {
                while (!pilaOperadores.isEmpty() && precedencia[pilaOperadores.peek()] >= precedencia[caracter]) {
                    expresionPrefija += pilaOperadores.pop();
                }
                pilaOperadores.push(caracter);
            } else if (caracter === '(') {
                pilaOperadores.push(caracter);
            } else if (caracter === ')') {
                while (!pilaOperadores.isEmpty() && pilaOperadores.peek() !== '(') {
                    expresionPrefija += pilaOperadores.pop();
                }
                pilaOperadores.pop();
            } else {
                expresionPrefija += caracter;
            }
        }

        while (!pilaOperadores.isEmpty()) {
            expresionPrefija += pilaOperadores.pop();
        }

       
        return expresionPrefija.split('').reverse().join('').trim();
    }

    evaluarExpresionPrefija(expresionPrefija) {
        const pilaOperandos = new Stack();
        const expresionArray = expresionPrefija.split('').reverse(); 
    
        for (let i = 0; i < expresionArray.length; i++) {
            const token = expresionArray[i];
            if (!this.esOperador(token)) {
                pilaOperandos.push(parseFloat(token));
            } else {
                const operand2 = pilaOperandos.pop(); 
                const operand1 = pilaOperandos.pop();
                let resultado;
                switch (token) {
                    case '+':
                        resultado = operand1 + operand2;
                        break;
                    case '-':
                        resultado = operand1 - operand2;
                        break;
                    case '*':
                        resultado = operand1 * operand2;
                        break;
                    case '/':
                        resultado = operand1 / operand2;
                        break;
                    case '^':
                        resultado = Math.pow(operand1, operand2);
                        break;
                }
                pilaOperandos.push(resultado);
            }
        }
    
        return pilaOperandos.pop();
    }
}
