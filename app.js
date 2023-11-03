require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const usersRoutes = require('./Routes/usersRoutes');
const blogRoutes = require('./Routes/BlogRoutes');
const app = express();
const cors = require('cors');

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
const uri = `mongodb+srv://kkelle832:${process.env.PASSWORD}@cluster0.ebsnw8y.mongodb.net/Blog`;


app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));


mongoose.connect(uri).then(()=>{
     console.log('Connected')
}).catch(err=>{
  new Error(err)
})


app.use(express.json());

app.use('/users', usersRoutes);
app.use('/blogs', blogRoutes); 

app.get('/', (req, res) => {
  res.send('Hello');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
