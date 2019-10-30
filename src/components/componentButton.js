import React, { Component } from 'react';

class ComponentButton extends Component{
    render(){
        const { show, onClick } = this.props
        return(
            <div>
                <br></br>
                    {
                        !show ? <button onClick={onClick}>SAVE TO DB</button> : ''
                    }
            </div>
        );
    }
}

export default ComponentButton