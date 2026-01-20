const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoBD...'))
    .catch(err => console.error('No se pudo conectar a MongoBD...', err));

const cursoSchema = new mongoose.Schema({
    nombre          :String,
    autor           :String,
    etiquetas       : [String],
    fecha           : {type: Date, default: Date.now } ,
    publicado       : Boolean
});

const Curso = mongoose.model('Curso', cursoSchema);

const crearCurso = async() => {
    const curso = new Curso({
        nombre      : 'Ingenieria de Software',
        autor       : 'Juan Cartez',
        etiquetas   : ['Isf', 'Arquitectura'],
        publicado   : true
    });
    const resultado = await curso.save();
    console.log(resultado);
}

//crearCurso();

const listarCursos = async() => {
    //Operadores de comparacion
    //eq (equal,igual)
    //ne (not equal,no igual)
    //gt (greater than, mayor que)
    //gte (greater than or equal to, mayor o igual que)
    //lt (less than, menor que)
    //lte (less than or equal to, menor o igual que)
    //in ( indicar si hay valores o varios en una consulta especifica)
    //nin (not in, no esta en)
    // or ( o una u otra condicion)
    // and ( una y otra condicion)
    // const cursos = await Curso
    //     .find({precio: {$gte:10, $lte:30}})
    //     .find({precio: {$in: [10,15,25]}})
    //     .find()
    //     .find({autor:'Nicolás Cáceres'}, {publicado: true}) como si fuera un if
    //     .and([{autor:'Nicolás Cáceres'}, {publicado: true}])//Ambas condiciones deben cumplirse
    //     .or([{autor:'Nicolás Cáceres'}, {publicado: true}])//Es uno o el otro
    //     Empiece con la palabra Nic
    //     .find({autor: /^Nic/ })
    //     .limit(10)
    //     .sort({autor : 1})//1 ascendente , -1 descendente
    //     .select({nombre : 1, etiquetas : 1});//Con 1 las muestra
    // console.log(cursos);
    const numeroPage = 2;
    const sizePage = 10;
    // api/cursos?numeroPage=4&sizePage=10
    const cursos = await Curso
        //.find({nombre : 'Curso de Java'})
        //.find({autor: /^Nic/ })
        //.find({autor: /res$/})//termina        
        ////.find({autor: /.*col.*/})//cuando un campo tiene un contenido especifico
        .find({autor: /^Nic/ })
        .skip((numeroPage - 1) * sizePage)        
        .limit(10)
        .sort({autor : 1})//1 ascendente , -1 descendente
        .select({nombre : 1, etiquetas : 1, autor: 1});//Con 1 las muestra
    console.log(cursos);
}

//listarCursos();

//Con esto me devuelve el documento pero antes de ser actualizado
const actualizarCurso = async(id) => {
    const resultado = await Curso.findByIdAndUpdate(id,{
        $set: {
            autor:'Nicolas Caceres',
            publicado: true
        }
    },{ new: true });//con new:true me devuelve el documento actualizado
    console.log(resultado);      
}

// const actualizarCurso = async(id) => {
//     const curso = await Curso.findById(id);
//     if(!curso){
//         console.log('El curso no existe');
//         return;
//     }
//     curso.publicado = false;
//     curso.autor = 'nikin';
//     // curso.set({
//     //     publicado : false,
//     //     autor: 'draculin'
//     // });

//     const resultado = await curso.save();
//     console.log(resultado);
// }

actualizarCurso('697006ef27e80e662782b295');
