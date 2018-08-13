
import React, { Component } from 'react';
import axios from 'axios';

class UploadComponent extends Component {

    constructor(props) {
        super(props);
        this.handleUploadFile = this.handleUploadFile.bind(this);
    }

    handleUploadFile = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        // '/files' is your node.js route that triggers our middleware
        axios.post('/upload', data).then((response) => {
        console.log(response); // do something with the response
        });
    }
    
    render() {
        return(
            <div>
                <input type="file" onChange={this.handleUploadFile} />
            </div>
        )
    }
}

export default UploadComponent;