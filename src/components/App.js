import React from 'react';
import '../assets/styles/App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import SideBar from './SideBar';
import DisplayContainer from './DisplayContainer';

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

  getTitles = () => {
    return [
      {
        title: 'This is a dummy note',
        content : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis totam incidunt excepturi dolor asperiores ex nihil consequuntur impedit maiores in?'
      },
      {
        title: 'This is another dummy note',
        content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolorem cum cumque, corporis architecto voluptatibus quasi nisi eos nostrum dolorum temporibus, voluptas sit sint eveniet?'
      },
      {
        title: 'Yet another dummy note',
        content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam suscipit quis mollitia natus, nesciunt esse consectetur voluptates voluptatum. Soluta ipsam illum, molestias dicta amet eius.'
      },
      {
        title: 'This a longer dummy note title to check title display',
        content : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae amet adipisci minima dicta necessitatibus architecto vitae, maxime assumenda, minus dolorum hic nesciunt, iure quisquam iste quibusdam ex id mollitia corrupti! Totam praesentium assumenda beatae eaque quia ducimus quos eligendi dicta sit et tenetur voluptates consequuntur facilis quaerat officiis magni eum, voluptate velit soluta nobis voluptatem animi! Facilis debitis quae laboriosam repellendus explicabo perspiciatis dolor recusandae cumque? Dicta, quas natus? Quos!'
      },
      {
        title: 'This an even longer dummy note title to check title display incase the title is too long',
        content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus corporis sint nihil. Temporibus modi incidunt minus est quia? Magni iusto fugit eum fuga doloribus provident sunt ullam? Quis distinctio unde soluta blanditiis magnam! Magnam numquam odio, quidem, nesciunt dolore alias iure totam veritatis error cumque, itaque ratione architecto? Quibusdam deserunt perspiciatis voluptate harum cupiditate! Animi laudantium blanditiis illum adipisci perspiciatis provident, quos, quidem natus facere, sapiente incidunt aut exercitationem consequuntur?'
      }
    ];
  }

  getContent = (title) => {
    var object = this.getTitles().filter(
      (value) => {
        if (value.title === title) {
          return value.content;
        }
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
          <SideBar on_click={this.handleClick} list={this.getTitles}/>
          <DisplayContainer selected_note_title={this.state.selected.title} selected_content={this.state.selected.content}/>
          <footer className="pr-2 text-muted text-right fixed-bottom"><small>Developed by Rishi Kumar Chawda</small></footer>
      </div>
    );
  }

}

