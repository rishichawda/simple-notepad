const { ipcMain } = require('electron');
const { saveFile, readFile, saveNoteToFile } = require('./fileops');

function create_note(win) {
  win.webContents.send('GetFileContents', 'Did you get this?')
  ipcMain.once(
    'NewFileContents',
    (event, args) => {
      console.log(args);
  });
}

function save_note(win) {
  win.webContents.send('GetUpdatedFileContents')
  ipcMain.once(
    'UpdatedFileContents',
    (event, args) => {
      if (args) {
        saveNoteToFile(args);
      } else {
        console.log('nothing to change');
      }
  });
}

module.exports = {
  saveNote: save_note,
  createNote: create_note
}