const cloudinary = require('cloudinary').v2;

const deleteFile = (imgUrl) => {
    //https://res.cloudinary.com/dbnqiixcu/image/upload/v1654511271/lotr/knhwukulcpcqgjclkosr.jpg
    const imgSplited = imgUrl.split('/'); //nos genera un array de todos los elementos separados que están separados por /
    const nameSplited = imgSplited[imgSplited.length - 1].split('.'); //cogemos el ultimo --> knhwukulcpcqgjclkosr.jpg y creamos un nuevo array por punto
    const folderSplited = imgSplited[imgSplited.length - 2]; //cogemos el penultimo elemento --> lotr
    const imgToDelete = `${folderSplited}/${nameSplited[0]}`; //concatenamos ambos elementos con / --> lotr/knhwukulcpcqgjclkosr
    cloudinary.uploader.destroy(imgToDelete, () => { //eliminamos ese elemento
        console.log("Image deleted successfully");
    });
}

module.exports = {deleteFile};