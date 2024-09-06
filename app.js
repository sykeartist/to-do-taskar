

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const route = require('./src/route/api');  
const rateLimit= require ('express-rate-limit')


app.use(
  rateLimit({
    windows: 15*60*100,
    max:100,
  })
)

app.use(cors())
app.use(bodyParser.json())


app.use("/", route)
app.use('*',(req, res)=>{
    res.status(404).json({
        message: "not found"
    })
})



// dataBase connection

const userName= 'floodycode'
const password= 'floodycode'
const dataBaseName= 'floodycode'
const options={ autoIndex: true}


const uri=`mongodb+srv://${userName}:${password}@cluster0.i7mru.mongodb.net/${dataBaseName}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(uri, options)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
  });




module.exports= app