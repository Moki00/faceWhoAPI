const databaseCode  = require('./config.js');
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

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                .where('email', '=', req.body.email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('unable to get yo user'))
            } else {
                res.status(400).json('try again')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
    .catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if(user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('not found x')
      }
  })
  .catch(err => res.status(400).json('error trying to get user'))
})

app.put('/image', (req, res) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
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


db.select('*').from('users').then(data =>{
    console.log(data);


        bcrypt.compare("apples", '$2a$10$fj2x4AS5uEIQKaF//bFPkeF2BlKyxa5yoROOiJ8gDKvndY/yLg4DS', function(err, res) {
        console.log('this hash matches', res)

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



app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid){
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wtf get off my git ')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
});
*/