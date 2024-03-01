const path = require('path');

const CreatPath = (page) => path.resolve(__dirname,'../views',`${page}.ejs`);

module.exports = CreatPath;
