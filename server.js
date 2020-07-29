const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('this is workin');
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