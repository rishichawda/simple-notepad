const {app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron')

  let win
  let menu

  function create_new() { 
    win.webContents.send('GetFileContents','Did you get this?')
    ipcMain.once('NewFileContents',(event, args)=>{
      console.log(args);
    });
   }

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
            click: () => { 
              create_new();
             }
          }),
          new MenuItem({
            label: 'Save',
            accelerator: 'CmdOrCtrl+S',
            click: () => { console.log('time to print stuff') }
          }),
          new MenuItem({
            label: 'Save as',
            accelerator: 'CmdOrCtrl+Shift+S',
            click: () => { console.log('time to print stuff') }
          }),
        ]
      }
    ]
    menu = new Menu.buildFromTemplate(template)

    menu.append(new MenuItem({
      label: 'Print',
      accelerator: 'CmdOrCtrl+P',
      click: () => { console.log('time to print stuff') }
    }))

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
