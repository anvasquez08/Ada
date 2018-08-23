import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Input, Button } from "semantic-ui-react";

class UploadComponent extends Component {

  constructor(props) {
    super(props);
    // this.handleUploadFile = this.handleUploadFile.bind(this);
    this.sendImageUrl = this.sendImageUrl.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  // handleUploadFile = (event) => {
  //     const data = new FormData();
  //     data.append('file', event.target.files[0]);
  //     // '/files' is your node.js route that triggers our middleware
  //     axios.post('/upload', data).then((response) => {
  //     console.log('Recommendations', response); // do something with the response
  //     this.props.handleStateChange('inventory', response.data)
  //   });
  // }
  
  handleImageUpload(e){
    e.preventDefault()
    
    //get recommendations
    let input = document.getElementById('embedpollfileinput');
    let imageFile = input.files[0];
    console.log("First console log from UploadComponent: ", imageFile);
    this.encodeImage(imageFile);

    //uploadImage
    let data = new FormData()
    data.append('image', imageFile)
    data.append('name', 'image')

    let endpoint = `/upload`;
    if (this.props.username.length > 0) {
      endpoint += `/${this.props.username}`
    }

    axios.post(endpoint, data)
    .then(({data})=>{
      console.log('Image sent to /upload')
    })
    .catch(err=>console.log("Console logging error from /upload: ", err))
  }

  //encode image to 64bit
  encodeImage(file) {
    var reader = new FileReader();
    reader.onloadend = (e) => {
        this.getRecommendations(e.target.result)
    }
    reader.readAsDataURL(file);
  }

  //post 64 bit image to get recommendations
  getRecommendations(image64) {
    var data = new FormData();
    data.append('file', image64);
    axios.post('/recommend', data)
    .then(({data}) => {
      console.log("Console logging recommendations: ", data)
      this.props.handleStateChange('inventory', data)
    });
  }

  sendImageUrl(){
    console.log("Sending image URL!", this.props.imageUrl)
    axios.post('/recommend', {params: this.props.imageUrl})
      .then(({data}) => {
        // console.log("Console logging return from sendImageUrl: ", result.data)
        this.props.handleStateChange('inventory', data);
      })
  }
  
  
  render() {
    return (
      <div>         
        <Grid>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <div>
                <label htmlFor="embedpollfileinput" className="ui large blue right floated button">
                  <input 
                    type="file" onChange={this.handleImageUpload} className="inputfile" id="embedpollfileinput" 
                    style={{width: "0.1px", height: "0.1px", opacity: "0", overflow: "hidden", position: "absolute", zIndex: "-1"}} />
                  <i className="ui upload icon"></i> 
                  Upload image
                </label> 
              </div>
            </Grid.Column>
            <Grid.Column>
            <div><Input
                    action={<Button className="ui left floated button" onClick={this.sendImageUrl}>Upload</Button>}
                    size='large' 
                    placeholder='Upload with URL' 
                    value={this.props.imageUrl} 
                    onChange={this.props.handleImageUrl}
                    /></div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        

      </div>
    )
  }
}

export default UploadComponent;
