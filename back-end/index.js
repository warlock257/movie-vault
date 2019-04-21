const Sequelize = require('sequelize');
const sequalize = new Sequelize("movies","postgres", process.env.dbPass, {
    "dialect": "postgres",
    "host": "localhost"
});

//we are requiring in all the models in the models folder, and storing in variable db
const db = require('./models')

//create a new movie
const blackPanther = {
    title:"Black Panther 4K Ultra [Blu-ray]",
    upc:"786936856316",
    format:"uhd",
    imgUrl:"https://d29pz51ispcyrv.cloudfront.net/images/I/J3u8uowQRzyQ7O6x1.MD256.JPEG"
}
db.movies.create(blackPanther)
    .then(newMovie => {
        console.log(newMovie);
    })
    .catch(err => {
        console.log(err);
    })