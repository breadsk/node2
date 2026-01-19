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
        nombre      : 'Curso de Java',
        autor       : 'Nicolás Cáceres',
        etiquetas   : ['Java', 'poo'],
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
    // const cursos = await Curso
    //     .find({precio: {$gte:10, $lte:30}})
    //     .find({precio: {$in: [10,15,25]}})
    //     .limit(10)
    //     .sort({autor : 1})//1 ascendente , -1 descendente
    //     .select({nombre : 1, etiquetas : 1});//Con 1 las muestra
    // console.log(cursos);
    const cursos = await Curso
        .find({nombre : 'Curso de Java'})
        .limit(10)
        .sort({autor : 1})//1 ascendente , -1 descendente
        .select({nombre : 1, etiquetas : 1});//Con 1 las muestra
    console.log(cursos);
}

listarCursos();
