import { Persona } from "./Persona.js"

export class Profesional extends Persona {
    #titulo
    #facultad
    #añoGraduacion

    constructor(nombre, apellido, edad, titulo, facultad, añoGraduacion) {
        if (!titulo || !facultad || añoGraduacion < 1950) {
            throw new Error("Los datos ingresados son inválidos")
        }

        super(nombre, apellido, edad)

        this.#titulo = titulo
        this.#facultad = facultad
        this.#añoGraduacion = añoGraduacion
    }

    toString() {
        return `${super.toString()} - Título: ${this.#titulo} - Facultad: ${this.#facultad} - Año de graduación: ${this.#añoGraduacion}`
    }

    get titulo() {
    return this.#titulo
    }

    get facultad() {
        return this.#facultad
    }

    get añoGraduacion() {
        return this.#añoGraduacion
    }
}