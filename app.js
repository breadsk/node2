const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://mern_user:Hakxf2n5$$00@cluster0.brtq3sz.mongodb.net/demo')
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
        nombre      : 'Curso de Node.js',
        autor       : 'Nicolás Cáceres',
        etiquetas   : ['nodejs', 'backend'],
        publicado   : true
    });
    await curso.save();
}



