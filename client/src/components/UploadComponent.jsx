import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Input } from "semantic-ui-react";

class UploadComponent extends Component {

    constructor(props) {
        super(props);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    handleUploadFile = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        // '/files' is your node.js route that triggers our middleware
        axios.post('/upload', data).then((response) => {
        console.log('Recommendations', response); // do something with the response
        this.props.handleStateChange('inventory', response.data)
      });
    }
    
    handleImageUpload(e){
      e.preventDefault()
      console.log('uploading')
      let input = document.getElementById('embedpollfileinput')
      let data = new FormData()
      data.append('image', input.files[0])
      data.append('name', 'image')
      axios.post("/send",data)
      .then(({data})=>{
        //do something with the data-scores
        console.log(data)
        this.props.handleStateChange('inventory', data)
      })
      .catch(err=>console.log(err))
    }
    
    render() {
        return(
          <div>         
              <Grid style={{margin: "10px"}}>
                  <Grid.Row centered columns={2}>
                    <Grid.Column>
                    <div>
                        <label htmlFor="embedpollfileinput" className="ui large red right floated button">
                          <input 
                            type="file" onChange={this.handleUploadFile} className="inputfile" id="embedpollfileinput" 
                            style={{width: "0.1px", height: "0.1px", opacity: "0", overflow: "hidden", position: "absolute", zIndex: "-1"}} />
                          <i className="ui upload icon"></i> 
                          Upload image
                        </label> 
                    </div>
                    </Grid.Column>
                    <Grid.Column>
                    <div><Input action='Upload' size='large'  placeholder='Upload with URL' /></div>
                    </Grid.Column>
                  </Grid.Row>
            </Grid>
          </div>
        )
    }
}


export default UploadComponent;
