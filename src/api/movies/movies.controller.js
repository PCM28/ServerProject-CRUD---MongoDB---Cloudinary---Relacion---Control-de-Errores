const { deleteFile } = require('../../utils/middlewares/deleteFile.middleware');
const Movie = require('./movies.model');

const getAllMovies = async (req, res, next) => {
    try{
        const allMovies = await Movie.find();
        return res.status(200).json(allMovies);
    } catch(error){
        return next(error);
    }
}

const getMovie = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const movie = await Movie.findById(id);
        if(movie) return res.status(200).json(movie);
        else return res.status(404).json('Película no encontrada');
    }catch(error){
        return next(error);
    }
}

const postMovie = async(req,res,next)=>{
    try{
        const movie = await new Movie(req.body);
        if(req.file) movie.photo=req.file.path;
        const savedMovie = await movie.save();
        return res.status(201).json(savedMovie);
    }catch(error){
        return next(error);
    }
}

const putMovie = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const movie = new Movie(req.body);
        movie._id=id;
        if(req.file) movie.photo=req.file.path;
        const updateMovie = await Movie.findByIdAndDelete(id);
        return res.status(200).json(updateMovie);
    }catch(error){
        return next(error);
    }
}

const deleteMovie = async(req,res,next) => {
    try{
        const {id} = req.params;
        const movie = await Movie.findByIdAndDelete(id);
        if(movie.photo) deleteFile(movie.photo);
        return res.status(200).json(movie);
    } catch(error){
        return next(error);
    }
}

module.exports = {getAllMovies, getMovie, postMovie, putMovie, deleteMovie}