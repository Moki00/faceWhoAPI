const config = require('./controllers/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1', /* local host */
    user : 'postgres',
    password : config.databaseCode,
    database : 'facewho'
  }
});

const app = express();

console.log(process.env)

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => { res.send('it is working!')})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})


/*
/ --> res = this is working
/ signin --> POST respond with success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user count
*/