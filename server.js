
const databaseCode  = require('./config.js');
console.log('databaseCode:'+databaseCode);
console.log(databaseCode );

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1', /* local host */
        user : 'postgres',
        password : databaseCode,
        database : 'facewho'
    }
});

db.select('*').from('users').then(data =>{
    console.log(data);
})

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'silly',
            password: 'bananas',
            email: 'si11y@gmail.com',
            entries: 0,
            joined: new Date()
        },
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    bcrypt.compare("apples", '$2a$10$fj2x4AS5uEIQKaF//bFPkeF2BlKyxa5yoROOiJ8gDKvndY/yLg4DS', function(err, res) {
        console.log('this hash matches', res)
    });

    let match = false
    bcrypt.compare(req.body.password, database.users[0].password, function(err, res){
        match=res
    })
    if (req.body.email === database.users[0].email &&
        match) {
            res.json('success');
        }   else {
            res.status(400).json('error loging in');
        }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    db('users').insert({
        email: email,
        name: name,
        joined: new Date()
    }).then(console.log)
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        } 
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

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