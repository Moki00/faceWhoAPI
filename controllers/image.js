const Clarifai = require ('clarifai');
// const config  = require('./config.js');
const { json } = require('body-parser');

const app = new Clarifai.App({
  apiKey: '8f0cda828a77432c934646605e4b73bd'
});

const handleApiCall = (req, res) => {
  app.models
  .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}