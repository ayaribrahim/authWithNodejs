const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const auth = require('./routes/auth');
const { authMiddleware } = require('./middlewares/auth.js');
const app = express();

app.use(express.json());

app.use('/api/auth', auth);


app.get('/dashboard', authMiddleware, (req, res) => {
  res.send('DASHBOARD!!');
})

const mongodb_url = process.env.MONGODB_STRING;
const port = process.env.PORT || 5000;


mongoose.connect(mongodb_url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).then(() => {
  console.log('DATABASE SUCCESS...')
  app.listen(port, () => {
    console.log(`SERVER IS UP ON ${port}..`);
  });
}).catch(err => {
  console.log(err.message)
})