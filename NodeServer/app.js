const express = require('express');
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const app = express();
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017/MarvinBot'

/*const dbName = 'MarvinBot'
let user

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
  
    // Storing a reference to the database so you can use it later
    db = client.db(dbName)
    console.log(`Connected MongoDB: ${url}`)
    console.log(`Database: ${dbName}`)
  })*/


  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
  .then(client => {
    // ...
    const db = client.db('MarvinBot')
    const userCollection = db.collection('user')

    // ...
  })


  mongoose.connect(url, { useNewUrlParser: true })

  const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.listen(3000, function() {
    console.log('listening on 3000')
  })

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')})

    
  /*  app.post('/quotes', (req, res) => {
        console.log(req.body)
      })*/
 
      app.post('/user', (req, res) => {
        userCollection.insertOne(req.body)
          .then(result => {
            console.log(result)
          })
          .catch(error => console.error(error))
      }