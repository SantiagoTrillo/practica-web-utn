import { Carta } from "./carta.js"

let indiceInicial = 1
const CANTIDAD_CARTAS_PAGINA = 6
const MAXIMO_CARTAS = 18

document.addEventListener("DOMContentLoaded", () => {
    cargarPagina()

    const botonSiguiente = document.getElementById("siguiente")
    const botonAnterior = document.getElementById("anterior")

    botonSiguiente.addEventListener("click", paginaSiguiente)
    botonAnterior.addEventListener("click", paginaAnterior)
})

function cargarPagina() {
    const cartas = document.getElementById("cartas")

    cartas.innerHTML = ""

    for (let i = indiceInicial; i < indiceInicial + CANTIDAD_CARTAS_PAGINA; i++) {
        buscarCarta(i)
    }
}

function buscarCarta(id) {
    fetch(`https://examenesutn.vercel.app/api/cartas/${id}`)
        .then(respuesta => respuesta.json())
        .then(datos => instanciarCarta(datos))
        .then(carta => carta.createHtmlElement())
        .then(elementoCarta => agregarCarta(elementoCarta))
        .catch(error => console.error("Error al cargar la carta:", error))
}

function instanciarCarta(datos) {
    return new Carta(
            datos.id,
            datos.nombre,
            datos.precio,
            datos.urlImagen,
            datos.urlScryFall
        )
}

function agregarCarta(elementoCarta) {
    const cartas = document.getElementById("cartas")

    cartas.appendChild(elementoCarta)
}


function paginaSiguiente() {
    if (indiceInicial + CANTIDAD_CARTAS_PAGINA <= MAXIMO_CARTAS) {
        indiceInicial += CANTIDAD_CARTAS_PAGINA

        cargarPagina()
    }
}

function paginaAnterior() {
    if (indiceInicial > 1) {
        indiceInicial -= CANTIDAD_CARTAS_PAGINA

        cargarPagina()
    }
}