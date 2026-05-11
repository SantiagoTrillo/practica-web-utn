import { Profesional } from "./Profesional.js"
import { Futbolista } from "./Futbolista.js"

const datos = JSON.parse('[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "titulo":"Ingeniero", "facultad":"UTN", "añoGraduacion":2002},{"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "titulo":"Medico", "facultad":"UBA", "añoGraduacion":2012},{"id":3, "nombre":"Facundo", "apellido":"Cairo", "edad":30, "titulo":"Abogado", "facultad":"UCA", "añoGraduacion":2017},{"id":4, "nombre":"Fernando", "apellido":"Nieto", "edad":18, "equipo":"Independiente", "posicion":"Delantero", "cantidadGoles":7},{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20, "equipo":"Racing", "posicion":"Volante", "cantidadGoles":2},{"id":6, "nombre":"Nicolas", "apellido":"Serrano", "edad":23, "equipo":"Boca", "posicion":"Arquero", "cantidadGoles":0}]')

function mapeadorPersonas (datos) {
    return datos.map((persona) => {
        if (persona.titulo) {
            return new Profesional(persona.nombre, persona.apellido, persona.edad, persona.titulo, persona.facultad, persona.añoGraduacion)
        }
        return new Futbolista(persona.nombre, persona.apellido, persona.edad, persona.equipo, persona.posicion, persona.cantidadGoles)
    })
}

export const personas = mapeadorPersonas(datos)