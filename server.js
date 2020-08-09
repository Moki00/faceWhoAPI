const databaseCode  = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { hash } = require('bcrypt');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1', /* local host */
    user : 'postgres',
    password : databaseCode,
    database : 'facewho'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => { res.send(facewho.users)})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {register.handleProfile(req, res, db)})

app.put('/image', (req, res) => {register.handleImage(req, res, db)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})


/*
/ --> res = this is working
/ signin --> POST respond with success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user count
*/