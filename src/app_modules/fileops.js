const { app, ipcMain } = require('electron');
const { informAppRenderer } = require('./syncops');
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
          }
          fs.writeFileSync(file, JSON.stringify({}));
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

function update_flie(data) {
  var key;
  var filedata = read_file();
  filedata.data.filter((value, index)=>{
    if (value.title === data.title) {
      key = index
    }
  });
  filedata.data[key] = data;
  save_file(filedata);
  informAppRenderer(filedata.data);
}

module.exports = {
  readFile: read_file,
  saveFile: save_file,
  initStorage: init_file,
  getSavedNotes: read_file,
  saveNoteToFile: update_flie
}