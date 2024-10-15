// app.test.js
import { sumar } from './app'; // Asegúrate de que esto esté correcto

describe('Pruebas de la función sumar', () => {
    test('Suma 2 + 3 y devuelve 5', () => {
        console.log = jest.fn(); // Mock de console.log
        const resultado = sumar(2, 3); // Llama a la función
        expect(resultado).toBe(5); // Verifica el resultado
        expect(console.log).toHaveBeenCalledWith(5); // Verifica que console.log fue llamado con 5
    });

    test('Suma -1 + 1 y devuelve 0', () => {
        console.log = jest.fn(); // Mock de console.log
        const resultado = sumar(-1, 1);
        expect(resultado).toBe(0); // Verifica el resultado
        expect(console.log).toHaveBeenCalledWith(0); // Verifica que console.log fue llamado con 0
    });

    test('Suma 0 + 0 y devuelve 0', () => {
        console.log = jest.fn(); // Mock de console.log
        const resultado = sumar(0, 0);
        expect(resultado).toBe(0); // Verifica el resultado
        expect(console.log).toHaveBeenCalledWith(0); // Verifica que console.log fue llamado con 0
    });
});
