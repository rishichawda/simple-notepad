import React from 'react';
import '../assets/styles/App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import SideBar from './SideBar';
import DisplayContainer from './DisplayContainer';

const dummy_notes = [
  'This is a dummy note',
  'This is another dummy note',
  'Yet another dummy note',
  'This a longer dummy note title to check title display',
  'This an even longer dummy note title to check title display incase the title is too long'
];

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected : {
        title: '',
        content: ''
      }
    }
  }

  handleClick = (e) => {
    console.log('clicked')
    this.setState({
      selected: {
        title: e.target.innerHTML,
        content: 'lorem ipsum dolor sit amet'
      }
    });
  }

  render() {
    return (
      <div id="main-container" className="container-fluid w-100">
          <SideBar on_click={this.handleClick} list={dummy_notes}/>
          <DisplayContainer selected_note_title={this.state.selected.title} selected_content={this.state.selected.content}/>
          <footer className="pr-2 text-muted text-right fixed-bottom"><small>Developed by Rishi Kumar Chawda</small></footer>
      </div>
    );
  }

}

