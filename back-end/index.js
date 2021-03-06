const Sequelize = require('sequelize');

if(process.env.DATABASE_URL){
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  false //true
  })
} else {
  const sequalize = new Sequelize("movies","postgres", process.env.dbPass, {
    "dialect": "postgres",
    "host": "localhost"
});
}

const Op = Sequelize.Op

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
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

//public folder
app.use(express.static('./public'));

//we are requiring in all the models in the models folder, and storing in variable db
const db = require('./models')

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})


//get UPC info
app.post('/getUpcInfo', (request, response) =>{
    let upc = request.body.upc
    let replyObj = {
        title:"",
        upc:"",
        disc:"",
        imgUrl:[]
    }
    axios.get(`https://api.upcitemdb.com/prod/trial/lookup?upc=${upc}`)
        .then((res)=>{
          //console.log(res.data.items)
          replyObj = {
            title:res.data.items[0].title,
            upc:res.data.items[0].upc,
            disc:"",
            imgUrl:res.data.items[0].images[0]
          }
          response.json(replyObj)
        })
        .catch((err) =>{
          console.log(err)
        })
})


  
//add new movie manually to db
app.post('/addMovieManually', (request, response) =>{
  let movieObj = request.body
  db.movies.create(movieObj)
    .then(newMovie => {
        console.log(newMovie);
    })
    .catch(err => {
        console.log(err);
    })
  response.json(movieObj)
})



//query db by UPC
app.post('/searchDBByUpc', (request, response) =>{
  db.movies.findAll({
    where: {
      upc: request.body.upc
    }
  })
  .then((dbres) =>{
    console.log(dbres)
    response.json(dbres)
  })
  .catch((err) =>{
    console.log(err)
    response.json(err)
  })
})


//query by title
app.post('/searchDbByTitle', (request, response) =>{
  db.movies.findAll({
    limit:10,
    where:{
      title:{
        [Op.iLike]:'%' + request.body.title + '%'
      }
    }
  })
  .then((dbres) =>{
    console.log(dbres)
    response.json(dbres)
  })
  .catch((err) =>{
    console.log(err)
    response.json(err)
  })
})





//delete movie (from back end / postman only)


app.listen(PORT, () =>{
    console.log("Listening on port: " + PORT)
})


//create a new movie EXAMPLE
// const blackPanther = {
//     title:"Black Panther 4K Ultra [Blu-ray]",
//     upc:"786936856316",
//     disc:"uhd",
//     imgUrl:"https://d29pz51ispcyrv.cloudfront.net/images/I/J3u8uowQRzyQ7O6x1.MD256.JPEG"
// }
// db.movies.create(blackPanther)
//     .then(newMovie => {
//         console.log(newMovie);
//     })
//     .catch(err => {
//         console.log(err);
//     })