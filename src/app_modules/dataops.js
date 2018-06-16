const { ipcMain } = require('electron');
const { saveFile, readFile } = require('./fileops');

function create_note(win) {
  win.webContents.send('GetFileContents', 'Did you get this?')
  ipcMain.once('NewFileContents', (event, args) => {
    console.log(args);
  });
}

function save_note(win) {
  win.webContents.send('GetUpdatedFileContents', 'Did you get this?')
  ipcMain.once('UpdatedFileContents', (event, args) => {
    if (args) {
      console.log('Changes: '+args);
    } else {
      console.log('First write a function to save files, you idiot!!');
    }
  });
}

module.exports = {
  saveNote: save_note,
  createNote: create_note
}