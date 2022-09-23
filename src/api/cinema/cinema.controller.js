const Cinema = require('./cinema.model');

const getAllCinemas = async (req, res, next) => {
    try{
        const allCinemas = await Cinema.find().populate('movies');
        return res.status(200).json(allCinemas);
    } catch(error){
        return next(error);
    }
}

const getCinema = async (req,res,next) =>{
    try{
        const {id} = req.params;//Forma de recoger la id con destructuring
        const cinema = await Cinema.findById(id).populate('movies');//Como la linea 7 de ciema model
        if(cinema) return res.status(200).json(cinema);
        else return res.status(404).json('Cine no encontrado');
    }catch(error){
        return next(error);
    }
}

const postCinema = async(req,res,next)=>{
    try{
        const newCinema = new Cinema(req.body);
        const createCinema = await newCinema.save();
        return res.status(201).json(createCinema);
    }catch(error){
        return next(error);
    }
}

const putCinema = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const cinema = new Cinema(req.body);
        cinema._id=id;
        const updateCinema = await Cinema.findByIdAndUpdate(id, cinema);
        return next(updateCinema);
    }catch(error){
        return next(error);
    }
}

const deleteCinema = async(req,res,next) => {
    try{
        const {id} = req.params;
        const cinemaDb = await Cinema.findByIdAndDelete(id);
        return res.status(200).json(cinemaDb);
    } catch(error){
        return next(error);
    }
}

module.exports = {getAllCinemas, getCinema, postCinema, putCinema, deleteCinema}