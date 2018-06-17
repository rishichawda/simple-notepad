import React from 'react';
import '../assets/styles/App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import SideBar from './SideBar';
import DisplayContainer from './DisplayContainer';

export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      note_items: [],
      selected : {
        title: '',
        content: ''
      }
    };
    this.getNotesList();
  }
  
  getNotesList() {
    window.require('electron').ipcRenderer.on(
      'UpdateStorage',
      (event, data)=>{
        var notes = JSON.parse(data);
        this.setState({
          note_items: notes
        });
        console.log('read storage')
    });
    window.require('electron').ipcRenderer.send('GetNotes');
    window.require('electron').ipcRenderer.on(
      'ReadStorageContents',
      (event, data) => {
        var notes = JSON.parse(data);
        this.setState({
          note_items: notes
        });
        console.log('read storage')
      }
    );
  }

  updateNotesList = (data) => {
    console.log(data);
  }

  getContent = (title) => {
    var object = this.state.note_items.filter(
      (value) => {
        return value.title === title
      }
    );
    return object[0].content;
  }

  handleClick = (e) => {
    this.setState({
      selected: {
        title: e.target.innerHTML,
        content: this.getContent(e.target.innerHTML)
      }
    });
    document.getElementsByTagName('textarea')[0].focus();
  }

  render() {
    return (
      <div id="main-container" className="container-fluid w-100">
          <SideBar on_click={this.handleClick} list={this.state.note_items}/>
          <DisplayContainer selected_note_title={this.state.selected.title} selected_content={this.state.selected.content}/>
          <footer className="pr-2 text-muted text-right fixed-bottom"><small>Developed by Rishi Kumar Chawda</small></footer>
      </div>
    );
  }
}

