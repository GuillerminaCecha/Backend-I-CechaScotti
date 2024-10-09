// Genera un número aleatorio entre un número inicial y número final (inclusive)
export const generateNumber = (startNumber, endNumber) => {
    if (startNumber > endNumber) {
        throw new Error("El número inicial no puede ser mayor que el número final");
    }

    return Math.floor(Math.random() * (endNumber - startNumber + 1) + startNumber);
};