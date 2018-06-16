const { app } = require('electron');
const fs = require('fs');

const path = app.getPath('appData');
const filepath = path + `/ElectronNotes/savednotes.json`;

function init_file() {
  fs.exists(path+'/ElectronNotes', (exists) => {
    if(exists){
      fs.exists(
        filepath,
        (exists) => {
          if (!exists) {
            file = fs.openSync(
              filepath,
              'w'
            );
            fs.writeFileSync(file, JSON.stringify({}));
          } else {
            fs.write
          }
      });
    } else {
      fs.mkdirSync(
        path+'/ElectronNotes'
      );
      init_file();
    }
  });
}

function read_file() {
  return JSON.parse(fs.readFileSync(
    filepath,
    () => {
      console.log('error in reading file at fileops.js line - 36')
  }));
 }

function save_file(data) {
  fs.writeFileSync(
    filepath,
    JSON.stringify(data)
  );
}

module.exports = {
  readFile: read_file,
  saveFile: save_file,
  initStorage: init_file,
  getSavedNotes: read_file
}