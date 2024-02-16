const express  = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const mongoose = require('mongoose');
const Town = require('./schema/town')
const db = "mongodb+srv://hmi764421:077001717@terminal.pletswj.mongodb.net/?retryWrites=true&w=majority";
const PORT = '8000';
const mysite = 'localhost';


mongoose.connect(db).then(()=>{
    console.log('Mongoga ulandi');
}).catch((err)=>{
    console.log(err);
});

/*const*/





/* app.use*/
app.use('/img',express.static('img/people'));
app.use('/img',express.static('img/static'));
app.use('/style',express.static('style'));
app.use('/script.js',express.static('script'));
app.use('/views/particles/add.ejs',express.static('particles'))
app.use(bodyParser.urlencoded({ extended: true }));


const CreatPath = (page) => path.resolve(__dirname,'views', `${page}.ejs`);

app.get('/',(req,res)=>{
    res.render(CreatPath('index'));
});

app.get('/about',(req,res)=>{
    Town.find()
    .then((basic)=>{
        res.render(CreatPath('about'),{basic}); 
    });
});

app.get('/contact',(req,res)=>{
    res.render(CreatPath('add'));
});
app.post('/addtown',upload.single('avatar'),(req,res)=>{
    const file = req.file;
    const filename = writeimg(file,1);
    const town = new Town({title:req.body.cityname,mail:req.body.mail,area:req.body.about,src:filename});
    town.save()
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.log(error);
    });
    Town.find()
    .then((basic)=>{
        res.render(CreatPath('about'),{basic}); 
    });
});
/*function*/
function writeimg(file,count){
    let newFilePath = path.join(__dirname, 'img/people/', count+file.originalname);
    console.log(newFilePath);
    fs.access(newFilePath, (err) => {
        if(err){
            fs.rename(file.path, newFilePath, (err) => {
                if (err) {
                  console.error('Ошибка при перемещении файла:', err);
                  res.status(500).send('Ошибка при перемещении файла');
                }
              });
        }
        else{
            count++;
            writeimg(file,count);
        }
    });
    return count+file.originalname;
}

app.use((req, res)=>{
    res.status(404).render(CreatPath('error'));
});
app.listen(PORT,mysite,(error)=>{
    error ? console.log(error): console.log(`localhost:${PORT}`);
});

/*delete
let deleteHome = document.createElement("delete");
deleteHome.setAttribute('id', 'delete-btn');
deleteHome.innerText = "delete listing";
deleteHome.addEventListener("click", function (event){
    if (event.target.id === 'delete-btn'){
        fetch('localhost:8000/about/${about.id}'{
            METHODS:'DELETE';
            Headers:{
                "content-type", "aplication/json"
                accept: "aplication/json";
            }
        })
        .then(resp => resp.json())
        .then(() => {
        homeDiv.innerHTML = "";
        home.remove();*/