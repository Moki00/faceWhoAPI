const handleProfile = (req, res, db) => {
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
}

module.exports = {
  handleProfile
};