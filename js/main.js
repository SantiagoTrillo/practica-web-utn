class Persona {
    id
    static contadorId = 0

    constructor(nombre, apellido, edad) {
        if (!nombre || !apellido || edad < 15) {
            throw new Error("Los datos ingresados son inválidos")
        }

        this.id = ++Persona.contadorId
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
    }

    toString() {
        return `ID: ${this.id} - Nombre: ${this.nombre} ${this.apellido} - Edad: ${this.edad}`
    }
}

class Futbolista extends Persona {
    constructor(nombre, apellido, edad, equipo, posicion, cantidadGoles) {
        if (!equipo || !posicion || cantidadGoles < -1) {
            throw new Error("Los datos ingresados son inválidos")
        }

        super(nombre, apellido, edad)
        this.equipo = equipo
        this.posicion = posicion
        this.cantidadGoles = cantidadGoles
    }

    toString() {
        return `${super.toString()} - Equipo: ${this.equipo} - Posición: ${this.posicion} - Cantidad de goles: ${this.cantidadGoles}`
    }
}

class Profesional extends Persona {
    constructor(nombre, apellido, edad, titulo, facultad, añoGraduacion) {
        if (!titulo || !facultad || añoGraduacion < 1950) {
            throw new Error("Los datos ingresados son inválidos")
        }

        super(nombre, apellido, edad)
        this.titulo = titulo
        this.facultad = facultad
        this.añoGraduacion = añoGraduacion
    }

    toString() {
        return `${super.toString()} - Título: ${this.titulo} - Facultad: ${this.facultad} - Año de graduación: ${this.añoGraduacion}`
    }
}

const datos = JSON.parse('[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "titulo":"Ingeniero", "facultad":"UTN", "añoGraduacion":2002},{"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "titulo":"Medico", "facultad":"UBA", "añoGraduacion":20012},{"id":3, "nombre":"Facundo", "apellido":"Cairo", "edad":30, "titulo":"Abogado", "facultad":"UCA", "añoGraduacion":2017},{"id":4, "nombre":"Fernando", "apellido":"Nieto", "edad":18, "equipo":"Independiente", "posicion":"Delantero", "cantidadGoles":7},{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20, "equipo":"Racing", "posicion":"Volante", "cantidadGoles":2},{"id":6, "nombre":"Nicolas", "apellido":"Serrano", "edad":23, "equipo":"Boca", "posicion":"Arquero", "cantidadGoles":0}]')

function mapeadorPersonas (personas) {
    return personas.map((persona) => {
        if (persona.titulo) {
            return new Profesional(persona.nombre, persona.apellido, persona.edad, persona.titulo, persona.facultad, persona.añoGraduacion)
        } else {
            return new Futbolista(persona.nombre, persona.apellido, persona.edad, persona.equipo, persona.posicion, persona.cantidadGoles)
        }
    })
}

const personas = mapeadorPersonas(datos)

let personasTabla = [].concat(personas)

personas.forEach((persona) => {
    console.log(persona.toString())
})

document.addEventListener("DOMContentLoaded", () => {
    const cuerpoTabla = document.querySelector("#tablaPersonas > tbody")
    const selector = document.getElementById("filtro")

    const botonCalcular = document.getElementById("botonCalcular")
    const inputEdad = document.getElementById("edadPromedio")

    const formularioDatos = document.getElementById("listado")
    const formularioABM = document.getElementById("ABM")
    const botonAgregar = document.getElementById("botonAgregar")
    const botonAlta = document.getElementById("botonAlta")

    render(cuerpoTabla, personas)

    selector.addEventListener("change", (evento) => {
        const tipo = evento.target.value
        const datosFiltrados = filtrarPorTipo(personas, tipo)

        renderizarTabla(cuerpoTabla, personasTabla)
    })

    botonCalcular.addEventListener("click", () => {
        calcularEdadPromedio(personasTabla)
        inputEdad.value = calcularEdadPromedio(personasTabla)
    })

    botonAgregar.addEventListener("click", (evento) => {
        intercambiarFormularios(formularioDatos, formularioABM)
    })

    botonAlta.addEventListener("click", (evento) => {
        altaPersona(formuularioABM)
        intercambiarFormularios(formularioABM, formularioDatos)
    })
})

function renderizarTabla (tabla, datos) {
    tabla.innerHTML = ""
    const filas = []

    for (const persona of datos) {
        let tr = document.createElement("tr")
        
        tr.innerHTML = `
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

        tr.addEventListener("doubleclick", () => {

        })
        filas.push(tr)
    }
    
    filas.forEach(fila => tabla.appendChild(fila))
}

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

function intercambiarFormularios(formulario1, formulario2) {
    formulario1.style.display = "none"
    formulario2.style.display = "block"
}

function altaPersona(formulario) {
    const datos = new FormData(formulario)

    for (const [key, value] of datos.entries()) {
    }
}