const {app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron')
const fs = require('fs');

const { createNote, saveNote } = require('./app_modules/file_operations.js');

  let win
  let menu

  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 1100, height: 700});
    win.loadURL('http://localhost:3000')
    const template = [
      {
        label: app.getName(),
        submenu: [
          {role: 'about'},
          {type: 'separator'},
          {role: 'services', submenu: []},
          {type: 'separator'},
          {role: 'hide'},
          {role: 'hideothers'},
          {role: 'unhide'},
          {type: 'separator'},
          {role: 'quit'}
        ]
      },
      {
        label: 'File',
        submenu: [
          new MenuItem({
            label: 'New',
            accelerator: 'CmdOrCtrl+N',
            click: () => { createNote(win, app); }
          }),
          new MenuItem({
            label: 'Save',
            accelerator: 'CmdOrCtrl+S',
            click: () => { saveNote(win, app); }
          })
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {role: 'undo'},
          {role: 'redo'},
          {type: 'separator'},
          {role: 'cut'},
          {role: 'copy'},
          {role: 'paste'},
          {role: 'pasteandmatchstyle'},
          {role: 'delete'},
          {role: 'selectall'}
        ]
      },
      {
        label: 'View',
        submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          {type: 'separator'},
          {role: 'resetzoom'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      },
      {
        role: 'window',
        submenu: [
          {role: 'minimize'},
          {role: 'close'},
          {role: 'maximize'}
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click () { require('electron').shell.openExternal('https://rishichawda.github.io') }
          }
        ]
      }
    ]
    menu = new Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu);
    // and load the index.html of the app.
    win.loadURL('http://localhost:3000')
  
    // Open the DevTools.
    win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      win = null
    })
  }
  
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })
