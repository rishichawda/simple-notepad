import React from 'react';

const sidebar_style = {
    float: 'left'
};

const list_style = {
    whiteSpace:'nowrap',
    overflow:'hidden',
    textOverflow: 'ellipsis'
};

export default class SideBar extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    list_notes(list){
        return list.map( 
            (value,key) => {
                return (
                    <div className="note-item" key={key} onClick={this.props.on_click}>
                        <div id={'note'+(key+1)} className="pl-2 py-3" style={list_style}>
                            {value.title}
                        </div>
                    </div>
                );
            }
         )
    }

    render() {
        return (
            <div className="w-25" style={sidebar_style}>
                {this.list_notes(this.props.list)}
            </div>
        );
    }
}