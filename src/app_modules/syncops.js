let win;

function initialise(obj) { 
    win = obj;
}

  function inform(data) {
    win.webContents.send('UpdateStorage', data);
  }

  module.exports = {
    initialiseSyncUtility: initialise,
    informAppRenderer: inform
  }