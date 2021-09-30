const express = require('express');
const bodyParser = require('body-parser')
const app = express() 
const port = 3029
const db = require('./queries')

app.use(express())

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'})
})

// set up crud functions 
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserByID)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
