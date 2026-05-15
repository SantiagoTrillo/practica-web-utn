class Persona {
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

class Futbolista extends Persona {
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

class Profesional extends Persona {
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

const datos = JSON.parse('[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "titulo":"Ingeniero", "facultad":"UTN", "añoGraduacion":2002},{"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "titulo":"Medico", "facultad":"UBA", "añoGraduacion":2012},{"id":3, "nombre":"Facundo", "apellido":"Cairo", "edad":30, "titulo":"Abogado", "facultad":"UCA", "añoGraduacion":2017},{"id":4, "nombre":"Fernando", "apellido":"Nieto", "edad":18, "equipo":"Independiente", "posicion":"Delantero", "cantidadGoles":7},{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20, "equipo":"Racing", "posicion":"Volante", "cantidadGoles":2},{"id":6, "nombre":"Nicolas", "apellido":"Serrano", "edad":23, "equipo":"Boca", "posicion":"Arquero", "cantidadGoles":0}]')

function mapeadorPersonas (datos) {
    return datos.map((persona) => {
        if (persona.titulo) {
            return new Profesional(persona.nombre, persona.apellido, persona.edad, persona.titulo, persona.facultad, persona.añoGraduacion)
        }
        return new Futbolista(persona.nombre, persona.apellido, persona.edad, persona.equipo, persona.posicion, persona.cantidadGoles)
    })
}

const personas = mapeadorPersonas(datos)

let personasTabla = [].concat(personas)

document.addEventListener("DOMContentLoaded", () => {
    const cuerpoTabla = document.querySelector("#tablaPersonas > tbody")

    const seccionDatos = document.getElementById("listado")
    const selectorFiltro = document.getElementById("filtro")
    const inputEdad = document.getElementById("edadPromedio")
    const botonCalcular = document.getElementById("botonCalcular")
    const checkboxes = document.querySelectorAll("[data-columna]")
    const botonAgregar = document.getElementById("botonAgregar")

    const seccionABM = document.getElementById("ABM")
    const selectorTipo = document.getElementById("tipo")
    const botonAlta = document.getElementById("botonAlta")
    const botonModificar = document.getElementById("botonModificar")
    const botonEliminar = document.getElementById("botonEliminar")
    const botonCancelar = document.getElementById("botonCancelar")

    renderizar(cuerpoTabla, personas)

    selectorFiltro.addEventListener("change", (evento) => {
        const tipo = evento.target.value
        personasTabla = filtrarPorTipo(personas, tipo)

        renderizar(cuerpoTabla, personasTabla)
    })

    botonCalcular.addEventListener("click", () => {
        inputEdad.value = calcularEdadPromedio(personasTabla)
    })

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {manejarVisibilidadCheckbox(checkbox)})
    })

    cuerpoTabla.addEventListener("dblclick", (evento) => {
        document.querySelector("input[name='id']").parentElement.style.display = "block"
        cargarPersonaFormularioABM(evento)
        manejarVisibilidadBotonesModificacion(botonAlta, botonModificar, botonEliminar)
        intercambiarFormularios(seccionDatos, seccionABM)
    })

    botonAgregar.addEventListener("click", () => {
        document.querySelector("input[name='id']").parentElement.style.display = "none"

        manejarVisibilidadCamposABM()
        manejarVisibilidadBotonesAlta(botonAlta, botonModificar, botonEliminar)
        intercambiarFormularios(seccionDatos, seccionABM)
    })

    selectorTipo.addEventListener("change", manejarVisibilidadCamposABM)

    botonAlta.addEventListener("click", () => {
        altaPersona(seccionABM.querySelector("form"))
        intercambiarFormularios(seccionABM, seccionDatos)
    })

    botonModificar.addEventListener("click", () => {
        
        intercambiarFormularios(seccionABM, seccionDatos)
    })

    botonEliminar.addEventListener("click", () => {
        // eliminarPersona(formularioABM)
        intercambiarFormularios(seccionABM, seccionDatos)
    })

    botonCancelar.addEventListener("click", () => {
        intercambiarFormularios(seccionABM, seccionDatos)
    })
})

function filtrarPorTipo (datos, tipo) {
    if (tipo === "profesional") {
        return datos.filter(persona => persona instanceof Profesional)
    } else if (tipo === "futbolista") {
        return datos.filter(persona => persona instanceof Futbolista)
    }
    return datos
}

function calcularEdadPromedio (datos) {
    let sumaTotal = datos.reduce((acumulador, persona) => {
        return acumulador + persona?.edad
    }, 0)
    let promedio = sumaTotal / datos.length

    return promedio.toFixed(2)
}

function altaPersona(formulario) {
    const cuerpoTabla = document.querySelector("#tablaPersonas > tbody")
    const datos = new FormData(formulario)
    const persona = Object.fromEntries(datos.entries())
    const edad = parseInt(persona.edad)


    if (persona.tipo === "futbolista") {
        const cantidadGoles = parseInt(persona.cantidadGoles)

        const nuevoFutbolista = new Futbolista(persona.nombre, persona.apellido, edad, persona.equipo, persona.posicion, cantidadGoles)

        personas.push(nuevoFutbolista)
    } else {
        const añoGraduacion = parseInt(persona.añoGraduacion)

        const nuevoProfesional = new Profesional(persona.nombre, persona.apellido, edad, persona.titulo, persona.facultad, añoGraduacion)

        personas.push(nuevoProfesional)
    }

    personasTabla = [...personas]

    renderizar(cuerpoTabla, personasTabla)
}

function modificarPersona(formilario) {
    const cuerpoTabla = document.querySelector("#tablaPersonas > tbody")
    const datos = new FormData(formulario)
    const personaFormulario = Object.fromEntries(datos.entries())
    const persona = personas.find(persona => persona.id == personaFormulario.id)
}

function renderizar (tabla, datos) {
    tabla.innerHTML = ""
    const filas = []

    for (const persona of datos) {
        let fila = document.createElement("tr")
        fila.dataset.id = persona.id
        
        fila.innerHTML = `
        <td>${persona.id}</td>
        <td>${persona.nombre}</td>
        <td>${persona.apellido}</td>
        <td>${persona.edad}</td>
        <td>${persona.equipo ?? '--'}</td>
        <td>${persona.posicion ?? '--'}</td>
        <td>${persona.cantidadGoles ?? '--'}</td>
        <td>${persona.titulo ?? '--'}</td>
        <td>${persona.facultad ?? '--'}</td>
        <td>${persona.añoGraduacion ?? '--'}</td>`

        filas.push(fila)
    }
    
    filas.forEach(fila => tabla.appendChild(fila))
}

function manejarVisibilidadCheckbox(checkbox) {
    const columna = checkbox.dataset.columna
    const filasTabla = document.querySelectorAll("#tablaPersonas tr")

    filasTabla.forEach(fila => {
        fila.children[columna].style.display = checkbox.checked ? "" : "none"
    })
}

function cargarPersonaFormularioABM(evento) {
    const fila = evento.target.closest("tr")
    const id = fila.dataset.id

    const persona = personas.find(persona => persona.id == id)

    document.querySelector("input[name='id']").value = persona.id
    document.querySelector("input[name='nombre']").value = persona.nombre
    document.querySelector("input[name='apellido']").value = persona.apellido
    document.querySelector("input[name='edad']").value = persona.edad
    document.querySelector("select[name='tipo']").value = persona instanceof Profesional ? "profesional" : "futbolista"
    
    manejarVisibilidadCamposABM()

    document.querySelector("input[name='equipo']").value = persona.equipo ?? ""
    document.querySelector("input[name='posicion']").value = persona.posicion ?? ""
    document.querySelector("input[name='cantidadGoles']").value = persona.cantidadGoles ?? ""

    document.querySelector("input[name='titulo']").value = persona.titulo ?? ""
    document.querySelector("input[name='facultad']").value = persona.facultad ?? ""
    document.querySelector("input[name='añoGraduacion']").value = persona.añoGraduacion ?? ""
}

function manejarVisibilidadCamposABM() {
    const tipoPersona = document.getElementById("tipo").value

    const camposFutbolista = document.getElementById("camposFutbolista")
    const camposProfesional = document.getElementById("camposProfesional")

    if (tipoPersona === "futbolista") {
        camposFutbolista.style.display = "block"
        camposProfesional.style.display = "none"

        document.querySelector("input[name='titulo']").value = ""
        document.querySelector("input[name='facultad']").value = ""
        document.querySelector("input[name='añoGraduacion']").value = ""
    } else {
        camposFutbolista.style.display = "none"
        camposProfesional.style.display = "block"

        document.querySelector("input[name='equipo']").value = ""
        document.querySelector("input[name='posicion']").value = ""
        document.querySelector("input[name='cantidadGoles']").value = ""
    }
}

function intercambiarFormularios(formulario1, formulario2) {
    formulario1.style.display = "none"
    formulario2.style.display = "block"

    formulario1.querySelector("form").reset()
}

function manejarVisibilidadBotonesAlta(botonAlta, botonModificar, botonEliminar) {
    botonAlta.style.display = "block"
    botonModificar.style.display = "none"
    botonEliminar.style.display = "none"
}

function manejarVisibilidadBotonesModificacion(botonAlta, botonModificar, botonEliminar) {
    botonAlta.style.display = "none"
    botonModificar.style.display = "block"
    botonEliminar.style.display = "block"
}