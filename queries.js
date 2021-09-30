const Pool = require('pg').Pool
const pool = new Pool ({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'uK4qas8U',
    port: 5432,
})
// GETS ALL USERS 
const getUsers = (request, response) => { 
    pool.query('select * from users order by id asc', (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
//GET USER BY ID 

const getUserByID = (request, response) => {
    const id = parseInt(request.params.id) 

    pool.query('Select * from users where id =  $1', [id], (error, results) => {
    if (error) {
        throw error 
    }
    response.status(200).json(results.rows)
    })
}

//POST NEW USER 

const createUser = (request, response) => {
    const {name, email} = request.body 

    pool.query('insert into users (name,email) values ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })
}

//PUT UPDATED DATA IN AN EXISTING USER 

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {name, email} = request.body

    pool.query ('update users set name = $1, email = $2 where id = $3', [name, email, id], (error, results) => {
        if (error) {
            throw error 
        }
        response.status(200).send(`User modified with ID: ${id}`)
    })
}

//DELETE A USER 

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id) 

    pool.query('dekete from users where id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.stauts(204).send(`User delete with ID: ${id}`)
    })
}


//EXPORTING CRUD FUNCTIONS 

module.exports = {getUsers, getUserByID, createUser, updateUser, deleteUser}