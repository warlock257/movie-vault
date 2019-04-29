const Sequelize = require('sequelize');
const sequalize = new Sequelize("movies","postgres", process.env.dbPass, {
    "dialect": "postgres",
    "host": "localhost"
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()
const PORT = process.env.PORT || 8080;
const axios = require('axios')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors({
    origin:"http://localhost:3000"
}))

//we are requiring in all the models in the models folder, and storing in variable db
const db = require('./models')

//create a new movie EXAMPLE
// const blackPanther = {
//     title:"Black Panther 4K Ultra [Blu-ray]",
//     upc:"786936856316",
//     format:"uhd",
//     imgUrl:"https://d29pz51ispcyrv.cloudfront.net/images/I/J3u8uowQRzyQ7O6x1.MD256.JPEG"
// }
// db.movies.create(blackPanther)
//     .then(newMovie => {
//         console.log(newMovie);
//     })
//     .catch(err => {
//         console.log(err);
//     })


//add new movie by UPC
app.post('/getUpcInfo', (request, response) =>{
    let upc = request.body.upc
    let replyObj = {
        title:"",
        upc:"",
        format:"",
        imgUrl:[]
    }

    axios.get(`https://api.upcitemdb.com/prod/trial/lookup?upc=${upc}`)
        .then((res)=>{
          //console.log(res.data.items)
          replyObj = {
            title:res.data.items[0].title,
            upc:res.data.items[0].upc,
            format:"",
            imgUrl:res.data.items[0].images[0]
          }
          response.json(replyObj)
        })
        .catch((err) =>{
          console.log(err)
        })
})

  

//add new movie manually

//query db

//delete movie (from back end / postman only)



app.listen(PORT, () =>{
    console.log("Listening on port: " + PORT)
})