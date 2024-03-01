const CreatPath = require('../helpers/path');

const Error = (req, res)=>{
    res.status(404).render(CreatPath('error'));
}

module.exports = Error