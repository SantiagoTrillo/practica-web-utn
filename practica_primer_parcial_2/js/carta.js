export class Carta {
    #id
    #nombre
    #precio
    #urlImagen
    #urlScryFall
    
    constructor(id, nombre, precio, urlImagen, urlScryFall) {
        this.#id = id
        this.#nombre = nombre
        this.#precio = precio
        this.#urlImagen = urlImagen
        this.#urlScryFall = urlScryFall
    }

    static createFromJsonString(datosJson) {
        const datosParseados = JSON.parse(datosJson)

        return new Carta(
            datosParseados.id,
            datosParseados.nombre,
            datosParseados.precio,
            datosParseados.urlImagen,
            datosParseados.urlScryFall
        )
    }

    createHtmlElement() {
        const elementoCarta = document.createElement('div')

        elementoCarta.classList.add('carta')

        elementoCarta.innerHTML = `
            <a href="${this.#urlScryFall}" target="_blank">
                <img src="${this.#urlImagen}" alt="${this.#nombre}">
            </a>
            <h3>${this.#nombre}</h3>
            <p>Precio: $${this.#precio}</p>
        `

        const botonGuardar = this.crearBotonGuardar()

        elementoCarta.appendChild(botonGuardar)

        return elementoCarta
    }

    crearBotonGuardar() {
        const botonGuardar = document.createElement('button')

        botonGuardar.textContent = 'Guardar'

        botonGuardar.addEventListener('click', () => this.guardarCarta())

        return botonGuardar
    }

    guardarCarta() {
        localStorage.setItem(this.#id, this.toJsonString())
    }

    toJsonString() {
        return JSON.stringify({
            id: this.#id,
            nombre: this.#nombre,
            precio: this.#precio,
            urlImagen: this.#urlImagen,
            urlScryFall: this.#urlScryFall
        })
    }

    getId() {
        return this.#id
    }

    getNombre() {
        return this.#nombre
    }

    getPrecio() {
        return this.#precio
    }

    getUrlImagen() {
        return this.#urlImagen
    }

    getUrlScryFall() {
        return this.#urlScryFall
    }  
}