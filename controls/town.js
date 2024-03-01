const CreatPath = require('../helpers/path');
const writeimg = require('../helpers/filename');
const Town = require('../schema/town');

const home = (req,res)=>{
    res.render(CreatPath('index'));
}
const aboutget = (req,res)=>{
    Town
    .find()
    .sort({createdAt: -1})
    .then(basic=>{
        res.render(CreatPath('about'),{basic});
    })
}
const aboutdelete = (req,res)=>{
    Town
    .findByIdAndDelete(req.params.id)
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((error)=> {
        console.log(error);
    });
}
const contact = (req,res)=>{
    res.render(CreatPath('add'));
}

const addtown = (req,res)=>{
    const file = req.file;
    const filename = writeimg(file,1);
    const town = new Town({title:req.body.cityname,mail:req.body.mail,area:req.body.about,src:filename});
    town.save()
    .catch((error)=>{
        console.log(error);
    });
    Town.find()
    .then((basic)=>{
        res.redirect('/about'); 
    });
}

module.exports = {home,aboutget,aboutdelete,contact,addtown};