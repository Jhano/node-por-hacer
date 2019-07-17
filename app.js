const { argv } = require("./config/yargs");
const { crear, getListado, actualizar, borrar } = require("./por-hacer/por-hacer");
const colors = require("colors");

console.log(argv);

let comando = argv._[0];

switch (comando) {
    case "crear":
        let tarea = crear(argv.descripcion);
        console.log(tarea);
        break;

    case "listar":
        let listado = getListado(argv.c);

        //cada listado es guardado en una tarea, hasta que no hay mas listado
        for (let tarea of listado) {
            console.log("===========Por Hacer===========".green);
            console.log(tarea.descripcion);
            console.log("Estado: ", tarea.completado);
            console.log("===============================".green);
        }

        break;

    case "actualizar":
        //puede ser igual  actualizar(argv.d, argv.c)
        let realizado = actualizar(argv.descripcion, argv.completado);
        if (realizado) {
            console.log("La tarea ha sido actualizada", realizado);
        } else {
            console.log("La tarea no ha sido actualizada", realizado);
        }

        break;

    case "borrar":

        let borrado = borrar(argv.descripcion);
        if (borrado) {
            console.log("Tarea borrada");
        } else {
            console.log("Error: No se pudo borrar tarea");
        }
        break;

    default:
        console.log("Comando no reconocido");
        break;

}