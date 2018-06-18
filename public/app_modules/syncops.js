let win;

function initialise(obj) { 
    win = obj;
}

  function inform(data) {
    win.webContents.send('UpdateStorage', JSON.stringify(data));
  }

  module.exports = {
    initialiseSyncUtility: initialise,
    informAppRenderer: inform
  }