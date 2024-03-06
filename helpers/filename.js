const path = require('path');
const fs = require('fs');

function writeimg(file,count){
    let newFilePath = path.resolve(__dirname, '../img/people/', count+file.originalname);
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

module.exports = writeimg;