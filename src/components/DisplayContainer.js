import React from 'react';

const container_style = {
    height: '100vh',
    float: 'right',
    borderLeft: 'solid 1px rgba(0, 0, 0, 0.2)'
};

export default class DisplayContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.selected_note_title,
            content: this.props.selected_content,
        }
    }

    componentDidMount() {
        window.require('electron').ipcRenderer.on(
            'GetUpdatedFileContents',
            (event, args)=>{
                if(this.state.content !== document.getElementsByTagName('textarea')[0].value) {
                    event.sender.send(
                        'UpdatedFileContents',
                        {
                            title: this.state.title,
                            content: document.getElementsByTagName('textarea')[0].value
                        }
                    );
                    this.setState({
                        content: document.getElementsByTagName('textarea')[0].value
                    })
                } else {
                    event.sender.send('UpdatedFileContents', false);
                }
        });
    }

    componentDidUpdate(){
        if(this.state.title !== this.props.selected_note_title) {
            this.setState({
                title: this.props.selected_note_title,
                content: this.props.selected_content,
            });
        }
        document.getElementsByTagName('textarea')[0].value = this.state.content;
    }

    render() {
        return (
            <div className="container-fluid w-75 bg-light p-0" style={container_style}>
                <div className="d-flex w-100 justify-content-between">
                    <div id="note-title" className="card-body lead w-50">
                        {this.state.title}
                    </div>
                    <small className="text-muted pr-2 pt-2">07th June, 2018</small>
                    <small className="text-muted pr-2 pt-2">07 : 07 : 07 (GMT)</small>
                </div>
                <div id="editor" className="container bg-white pl-5 pt-4 lead">
                    <textarea className="w-100 h-100"></textarea>
                </div>
            </div>
        );
    }
}