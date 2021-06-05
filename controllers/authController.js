const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

exports.signIn = async (req, res) => {

  const user = await User.findOne({ email: req.body.email});
  if(!user) res.status(400).send({message: 'wrong email or password'});


  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if(validPassword){
    const secret = process.env.SECRET_HASH;
    const token = await jwt.sign({userid: user._id, email: user.email}, secret);
    res.send(token);
  }else{
    res.status(400).send({message: 'wrong email or password'});
  }


  //res.send('sign in');
}

exports.signUp = async (req, res) => {
  //check if email already used
  const user = await User.findOne({ email: req.body.email});
  if(user) res.status(400).send({message: 'email already exist'})

  const newUser = new User({
    email : req.body.email,
    password : req.body.password
  });

  await newUser.save();


  res.status(201).json(newUser);
}