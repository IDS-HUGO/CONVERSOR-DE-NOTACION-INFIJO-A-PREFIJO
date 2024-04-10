import { Algoritmos } from "../controllers/Algoritmos.js";
const algoritmos = new Algoritmos();

const expresionInfijaInput = document.getElementById('expresionInfija');
const expresionPrefijaInput = document.getElementById('expresionPrefija');
const resultadoInput = document.getElementById('resultado');
const convertirBoton = document.getElementById('convertirBoton');
const calcularBoton = document.getElementById('calcularBoton');

convertirBoton.addEventListener('click', () => {
    const expresionInfija = expresionInfijaInput.value;
    const expresionPrefija = algoritmos.convertirInfijoAPrefijo(expresionInfija);
    expresionPrefijaInput.value = expresionPrefija;
});

calcularBoton.addEventListener('click', () => {
    const expresionPrefija = expresionPrefijaInput.value;
    const resultado = algoritmos.evaluarExpresionPrefija(expresionPrefija);
    resultadoInput.value = resultado; 
});
