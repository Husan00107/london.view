const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const townSchema = new Schema({
    title:{
        type: String,
        require: true,
    },

    mail:{
        type: String,
        require:true,
    },

    area:{
        type: String,
        require:true,
    },

    src:{
        type: String,
        require: true,
    }
}, { timestamps:true });

const Town = mongoose.model('Town', townSchema);

module.exports = Town;