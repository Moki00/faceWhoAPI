const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('all fields must be entered');
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
        .catch(err => res.status(400).json('unable to sign in'))
      } else {
        res.status(400).json('try again')
      }
    })
  .catch(err => res.status(400).json('wrong email/password combo'))
}

module.exports = {
  handleSignin: handleSignin
};