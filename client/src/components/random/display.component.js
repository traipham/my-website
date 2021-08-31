import React from 'react';

export default class Display extends React.Component{
    constructor(props){
        super(props)
    }


    render(){
        return(
            <div className="container">
                <button type="button" id="test-btn" className="confirm-btn" onClick={this.props.testFunc}>Test Button</button>
                <p>{this.props.defaultTest}</p>
            </div>
        )
    }
}

Display.defaultProps = { defaultTest: "Default Text" };