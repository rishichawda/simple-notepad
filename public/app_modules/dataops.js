const { ipcMain, dialog } = require('electron');
const { saveFile, readFile, saveNoteToFile } = require('./fileops');

function create_note(win) {
  console.log('Write code to create new');
  // win.webContents.send('GetFileContents', 'Did you get this?')
  // ipcMain.once(
  //   'NewFileContents',
  //   (event, args) => {
  //     console.log(args);
  // });
}

function save_note(win) {
  win.webContents.send('GetUpdatedFileContents')
  ipcMain.once(
    'UpdatedFileContents',
    (event, args) => {
      if(args.title === '') {
        if(args.content.indexOf('.')===-1) {
          if(args.content.indexOf('\n')===-1) {
            args.title = args.content
          } else {
            args.title = args.content.substring(0, args.content.indexOf('\n') + 1);
          }
        } else {
          args.title = args.content.substring(0, args.content.indexOf('.') + 1);
        }
      }
      if (args.title !== '' && args) {
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