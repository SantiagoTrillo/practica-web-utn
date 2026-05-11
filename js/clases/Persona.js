export class Persona {
    #id
    #nombre
    #apellido
    #edad
    static #contadorId = 0

    constructor(nombre, apellido, edad) {
        if (!nombre || !apellido || edad < 15) {
            throw new Error("Los datos ingresados son inválidos")
        }

        this.#id = ++Persona.#contadorId
        this.#nombre = nombre
        this.#apellido = apellido
        this.#edad = edad
    }

    toString() {
        return `ID: ${this.#id} - Nombre: ${this.#nombre} ${this.#apellido} - Edad: ${this.#edad}`
    }

    get id() {
        return this.#id
    }

    get nombre() {
    return this.#nombre
    }

    get apellido() {
        return this.#apellido
    }

    get edad() {
        return this.#edad
    }
}