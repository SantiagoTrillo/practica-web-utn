import { personas } from "./datos.js"
import * as Ui from "./ui.js"
import * as Utilidades from "./utilidades.js"

let personasTabla = [].concat(personas)

personas.forEach((persona) => {
    console.log(persona.toString())
})

document.addEventListener("DOMContentLoaded", () => {
    const cuerpoTabla = document.querySelector("#tablaPersonas > tbody")

    const formularioDatos = document.getElementById("listado")
    const selector = document.getElementById("filtro")
    const inputEdad = document.getElementById("edadPromedio")
    const botonCalcular = document.getElementById("botonCalcular")
    const checkboxes = document.querySelectorAll("[data-columna]")
    const botonAgregar = document.getElementById("botonAgregar")

    const formularioABM = document.getElementById("ABM")
    const botonAlta = document.getElementById("botonAlta")
    const botonModificar = document.getElementById("botonModificar")
    const botonEliminar = document.getElementById("botonEliminar")
    const botonCancelar = document.getElementById("botonCancelar")

    Ui.renderizar(cuerpoTabla, personas)

    selector.addEventListener("change", (evento) => {
        const tipo = evento.target.value
        personasTabla = Utilidades.filtrarPorTipo(personas, tipo)

        Ui.renderizar(cuerpoTabla, personasTabla)
    })

    botonCalcular.addEventListener("click", () => {
        inputEdad.value = Utilidades.calcularEdadPromedio(personasTabla)
    })

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {Ui.manejarVisibilidadCheckbox(checkbox)})
    })

    cuerpoTabla.addEventListener("dblclick", (evento) => {
        const fila = evento.target.parentElement
        const id = fila.dataset.id

        const persona = personas.find(persona => persona.id == id)
    })

    botonAgregar.addEventListener("click", () => {
        Ui.intercambiarFormularios(formularioDatos, formularioABM)
    })

    botonAlta.addEventListener("click", () => {
        //altaPersona(formularioABM)
        Ui.intercambiarFormularios(formularioABM, formularioDatos)
    })

    botonModificar.addEventListener("click", () => {
        // modificarPersona(formularioABM)
        Ui.intercambiarFormularios(formularioABM, formularioDatos)
    })

    botonEliminar.addEventListener("click", () => {
        // eliminarPersona(formularioABM)
        Ui.intercambiarFormularios(formularioABM, formularioDatos)
    })

    botonCancelar.addEventListener("click", () => {
        Ui.intercambiarFormularios(formularioABM, formularioDatos)
    })
})