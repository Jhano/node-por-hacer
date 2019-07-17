//requiere File System
const fs = require("fs");

//las notas las almaceno en un arreglo
//permite trabjar las notas de forma independiente
let listadoPorHacer = []; //arreglo de objetos

const guardarDB = () => {
    //data que quiero grabar
    let data = JSON.stringify(listadoPorHacer); // JSON.stringify transforma un objeto a lenguaje JSON
    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err) {
            throw new Error("No se pudo grabar")
        } else {
            console.log("Tarea Creada");
            //return `Tarea Creada`;
        }
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require("../db/data.json"); //REQUIRE Esta funcion toma el objeto json y lo serializa para transformarlo enn objeto javascript
    } catch (error) {
        listadoPorHacer = []; // si falla siempre habra un arreglo vacio
    }


}

const crear = (descripcion) => {


    cargarDB();

    //crear el por hacer
    let porHacer = {
        descripcion, //es igual a la descripcion que se le pasa
        completado: false
    };

    listadoPorHacer.push(porHacer); //agrego el objeto al arreglo (lo inserto con push) es decir objeto porhacer1 insertado en listadoPoHacer[1]

    guardarDB();
    return porHacer; //asi tengo una retroalimentacion ed lo que se acaba de crear (lo puedo ver);  
}

const getListado = (completado) => {
    cargarDB();
    console.log(completado);
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado == completado)
    switch (completado) {
        case "true":
            return nuevoListado;
            break;
        case "false":
            let nuevoListado2 = listadoPorHacer.filter(tarea => tarea.completado === false)
            return nuevoListado2;
            break;
        default:
            return listadoPorHacer;
            break;
    }

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    //es igual a la posición index, del elemento que coincide con la descrioción dentro de listado por hacer
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion); //me entrega un valor(0,1,2,3 posicion del arreglo) de la ubicacion de la tarea donde coincide la descripcion
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    /*OTRA FORMA

    //filter, filtra el arreglo y con la condicioón, deja todos los elementos que sean distntos a la descripcion preguntada
    let nuevoListado = listadorPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if(listadoPorHacer.lenght === nuevoListado.lenght){
        retuen false
    }else{
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
    */

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1); //splice elimina un elemento del array splice(x,1) donde x es el indice a eliminar
        guardarDB();
        return true;
    } else {
        return false;
    }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}