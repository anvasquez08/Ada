import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Input } from "semantic-ui-react";

class UploadComponent extends Component {

    constructor(props) {
        super(props);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    handleImageUpload(e) {
      e.preventDefault()
      
      //get recommendations
      let input = document.getElementById('embedpollfileinput');
      let imageFile = input.files[0];
      this.encodeImage(imageFile);

      //uploadImage
      /*let data = new FormData()
      data.append('image', imageFile)
      data.append('name', 'image')

      let endpoint = `/upload`;
      if (this.props.username.length > 0) {
        endpoint += `/${this.props.username}`
      }

      axios.post(endpoint, data)
      .then(({data})=>{
        console.log('image uploaded')
      })
      .catch(err=>console.log(err))*/
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
      console.log('this is the data!!', data)
      this.props.handleStateChange('inventory', data)

    });
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
                            type="file" onChange={this.handleImageUpload} className="inputfile" id="embedpollfileinput" 
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
