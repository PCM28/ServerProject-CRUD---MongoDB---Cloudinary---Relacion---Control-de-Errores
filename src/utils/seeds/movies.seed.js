const mongoose = require('mongoose');
const db = require('../database/database');
const Movie = require('../../api/movies/movies.model');

const initialMovies = [
    {
      title: 'The Matrix',
      director: 'Hermanas Wachowski',
      year: 1999,
      genre: 'Acción',
    },
    {
      title: 'The Matrix Reloaded',
      director: 'Hermanas Wachowski',
      year: 2003,
      genre: 'Acción',
    },
    {
      title: 'Buscando a Nemo',
      director: 'Andrew Stanton',
      year: 2003,
      genre: 'Animación',
   },
   {
      title: 'Buscando a Dory',
      director: 'Andrew Stanton',
      year: 2016,
      genre: 'Animación',
    },
    {
      title: 'Interestelar',
      director: 'Christopher Nolan',
      year: 2014,
      genre: 'Ciencia ficción',
   },
   {
      title: '50 primeras citas',
      director: 'Peter Segal',
      year: 2004,
      genre: 'Comedia romántica',
    },
  ];

  mongoose
    .connect(db.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async()=>{
        const allMovies = await Movie.find();
        if(allMovies.length){
            console.log('Eliminando colección de movies...');
            await Movie.collection.drop();
        } else console.log('No hay movies en la base de datos... procediendo a añadir las movies');
    })
    .catch(error=>console.log('Error al borrar la colleción de la base de datos', error))
    .then(async()=>{
        await Movie.insertMany(initialMovies);
        console.log('Movies añadidos con éxito...');
    })
    .catch(error=> console.log('Error al añadir movies a la base de datos', error))
    .finally(()=> mongoose.disconnect());