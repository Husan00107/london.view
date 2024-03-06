const express  = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config();

const router = require('./router/town');


const app = express();





mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Mongoga ulandi');
}).catch((err)=>{
    console.log(err);
});


app.use('/img',express.static('img/people'));
app.use('/img',express.static('img/static'));
app.use('/style',express.static('style'));
app.use('/script.js',express.static('script'));
app.use('/views/particles/add.ejs',express.static('particles'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(process.env.PORT,(error)=>{
    error ? console.log(error): console.log(`localhost:${process.env.PORT}`);
});