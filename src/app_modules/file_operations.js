const { ipcMain } = require('electron');
const fs = require('fs');

function save_file(data, app) {
  const path = app.getPath('appData');
  fs.exists(path + 'savednotes=' + app.getName() + '.json', (exists) => {
    if (exists) {
      console.log('file found!')
    } else {
      console.log('not found')
    }
  });
}

function create_note(win, app) {
  win.webContents.send('GetFileContents', 'Did you get this?')
  ipcMain.once('NewFileContents', (event, args) => {
    console.log(args);
  });
}

function save_note(win, app) {
  win.webContents.send('GetUpdatedFileContents', 'Did you get this?')
  ipcMain.once('UpdatedFileContents', (event, args) => {
    if (args) {
      save_file(args, app);
    } else {
      console.log('Changes: '+args);
    }
  });
}

module.exports = {
  saveNote: save_note,
  createNote: create_note
}