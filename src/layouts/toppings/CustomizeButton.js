import React, { Component } from 'react'

class CustomizeButton extends Component {
    render() {
        return (
            <div>
                <a href="#" onClick={(event) =>
                    {
                        event.preventDefault();
                    }
                }>
                    Customize
                </a>
            }
            </div>
        );
    }
}

export default CustomizeButton