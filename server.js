const express = require('express');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'John@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '123',
            name: 'silly',
            email: 'si11y@gmail.com',
            password: 'bananers',
            entries: 0,
            joined: new Date()
        },
    ]
}

app.get('/', (req, res) => {
    res.send('this is workin');
})

app.post('/signin', (req,res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('success');
        }   else {
            res.status(400).json('error loging in');
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