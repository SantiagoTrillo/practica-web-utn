import {Carta} from "./carta.js";

let cartas = []
let ultimoOrden = ""

document.addEventListener("DOMContentLoaded", () => {
    cargarCartas()
    mostrarCartas()

    const botonOrdenarId = document.getElementById("ordenarId")
    const botonOrdenarNombre = document.getElementById("ordenarNombre")
    const botonOrdenarPrecio = document.getElementById("ordenarPrecio")

    botonOrdenarId.addEventListener("click", ordenarCartasId)
    botonOrdenarNombre.addEventListener("click", ordenarCartasNombre)
    botonOrdenarPrecio.addEventListener("click", ordenarCartasPrecio)
})

function cargarCartas() {
    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i)
        const valor = localStorage.getItem(clave)
        const carta = Carta.createFromJsonString(valor)

        cartas.push(carta)
    }
}

function mostrarCartas() {
    const divCartas = document.getElementById("cartas")

    divCartas.innerHTML = ""

    cartas.forEach(carta => {
        divCartas.appendChild(carta.createHtmlElement())
    })
}

function ordenarCartasId() {
    if (ultimoOrden === "id") {
        cartas.reverse()
    } else {
        cartas.sort((carta1, carta2) => carta1.getId() - carta2.getId())

        ultimoOrden = "id"
    }
    mostrarCartas()
}

function ordenarCartasNombre() {
    if (ultimoOrden === "nombre") {
        cartas.reverse()
    } else {
        cartas.sort((carta1, carta2) => carta1.getNombre().localeCompare(carta2.getNombre()))

        ultimoOrden = "nombre"
    }
    mostrarCartas()
}

function ordenarCartasPrecio() {
    if (ultimoOrden === "precio") {
        cartas.reverse()
    } else {
        cartas.sort((carta1, carta2) => carta1.getPrecio() - carta2.getPrecio())

        ultimoOrden = "precio"
    }
    mostrarCartas()
}