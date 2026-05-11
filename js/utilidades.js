import { Profesional } from "./Profesional.js"
import { Futbolista } from "./Futbolista.js"

export function filtrarPorTipo (datos, tipo) {
    if (tipo === "profesional") {
        return datos.filter(persona => persona instanceof Profesional)
    } else if (tipo === "futbolista") {
        return datos.filter(persona => persona instanceof Futbolista)
    }
    return datos
}

export function calcularEdadPromedio (datos) {
    let sumaTotal = datos.reduce((acumulador, persona) => {
        return acumulador + persona?.edad
    }, 0)
    let promedio = sumaTotal / datos.length

    return promedio.toFixed(2)
}