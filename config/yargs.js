const descripcion = {
    demand: true,
    alias: "d",
    desc: "Descripcion de la tarea por hacer"
}
const completado = {
    alias: "c",
    desc: "marca como completado o pendiente la tarea"
}


const argv = require("yargs")
    .command("crear", "Crear un elemento por hacer", { descripcion })
    .command("actualizar", "Actualiza el estado completado de una tarea", { descripcion, completado })
    .command("borrar", "Lista las tareas por Hacer", { descripcion })
    .command("listar", "Lista las tareas por Hacer", { completado })
    .help()
    .argv;

module.exports = {
    argv
}