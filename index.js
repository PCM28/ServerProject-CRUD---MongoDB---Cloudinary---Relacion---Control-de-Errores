const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./src/utils/database/database');
const moviesRoutes = require('./src/api/movies/movies.routes');
const cinemasRoutes = require('./src/api/cinema/cinema.routes');//Por la relación
const cloudinary = require("cloudinary").v2;//*Cloudinary

dotenv.config();
db.connectDb();

cloudinary.config({//*Cloudinary->nombre que colocas en .env (name, api-key, api-secret)
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use(cors({
    origin: '*',
    credentials: true
}))

const PORT = process.env.PORT || 8000;

app.use('/movie', moviesRoutes);
app.use('/cinema', cinemasRoutes);//Por la relación


//---------Esto es la general------------
app.use('*',(req, res, next)=>{
    return res.status(404).json("Ruta no encontrada");
});
//------- CONTROLADOR DE ERRORES ---------
app.use((error, req, res, next)=>{
    return res
    .status(error.status || 500)
    .json(error.status || "Error inesperado");
});
// ---------------------------------------
app.listen(PORT,()=>{
    // console.log(`db: ${process.env.DB_URL}`);
    console.log(`Listening in http://localhost:${PORT}`);
})