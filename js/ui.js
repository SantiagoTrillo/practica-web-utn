export function renderizar (tabla, datos) {
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

export function manejarVisibilidadCheckbox(checkbox) {
    const columna = checkbox.dataset.columna
    const filasTabla = document.querySelectorAll("#tablaPersonas tr")

    filasTabla.forEach(fila => {
        fila.children[columna].style.display = checkbox.checked ? "" : "none"
    })
}

export function cargarPersonaFormularioABM(evento) {
    const fila = evento.target.parentElement
    const datos = {
        id: fila.children[0].textContent,
        nombre: fila.children[1].textContent,
        apellido: fila.children[2].textContent,
        edad: fila.children[3].textContent,
        equipo: fila.children[4].textContent ?? "",
        posicion: fila.children[5].textContent ?? "",
        cantidadGoles: fila.children[6].textContent ?? "",
        titulo: fila.children[7].textContent ?? "",
        facultad: fila.children[8].textContent ?? "",
        añoGraduacion: fila.children[9].textContent ?? ""
    }


}

export function intercambiarFormularios(formulario1, formulario2) {
    formulario1.style.display = "none"
    formulario2.style.display = "block"
}

export function altaPersona(formulario) {
    const datos = new FormData(formulario)

    for (const [key, value] of datos.entries()) {
    }
}