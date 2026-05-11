import { Persona } from "./Persona.js"

export class Futbolista extends Persona {
    #equipo
    #posicion
    #cantidadGoles

    constructor(nombre, apellido, edad, equipo, posicion, cantidadGoles) {
        if (!equipo || !posicion || cantidadGoles < 0) {
            throw new Error("Los datos ingresados son inválidos")
        }

        super(nombre, apellido, edad)

        this.#equipo = equipo
        this.#posicion = posicion
        this.#cantidadGoles = cantidadGoles
    }

    toString() {
        return `${super.toString()} - Equipo: ${this.#equipo} - Posición: ${this.#posicion} - Cantidad de goles: ${this.#cantidadGoles}`
    }

    get equipo() {
    return this.#equipo
    }

    get posicion() {
        return this.#posicion
    }

    get cantidadGoles() {
        return this.#cantidadGoles
    }
}