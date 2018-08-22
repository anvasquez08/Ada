import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Input } from "semantic-ui-react";
import { graphql,  Query, Mutation , withApollo, ApolloConsumer} from "react-apollo";
import {gql} from "apollo-boost";
import 'babel-polyfill'
import client from '../index.jsx'

class UploadComponent extends Component {

  constructor(props) {
    super(props);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  handleImageUpload(e) {
    e.preventDefault()
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

  encodeImage(image) {
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = (e) => {
      this.props.mutate({
        variables: {input: e.target.result}
      })
      .then(result =>  {
        console.log('RESULTS', result.data)
        // this.props.handleStateChange('inventory', result.data.uploadLargeFile)
      })
      .catch(error =>  console.log('there was an error sending the query', error));
    }
  }

  //post 64 bit image to get recommendations
   async getRecommendations(image64, client) {
    var pic = new FormData();
    pic.append('file', image64);

    // axios.post('/recommend', data)
    // .then(({data}) => {
    //   this.props.handleStateChange('inventory', data)
    // });
}
    
    render() {
        return(  
          <div>         
              <Grid style={{margin: "10px"}}>
                  <Grid.Row centered columns={2}>
                    <Grid.Column>
                    <div>
                    <div>
                        <label htmlFor="embedpollfileinput" className="ui large red right floated button">
                          <input 
                            type="file" onChange={this.handleImageUpload} className="inputfile" id="embedpollfileinput" 
                            style={{width: "0.1px", height: "0.1px", opacity: "0", overflow: "hidden", position: "absolute", zIndex: "-1"}} />
                          <i className="ui upload icon"></i> 
                          Upload image
                        </label> 
                    </div>
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

export default graphql(
  gql`mutation uploadLargeFile($input: String!) {
  uploadLargeFile(input: $input) {
    _id
    name
    brandName
    timestamp
    url
    price
    imageUrl
  }
}`)(UploadComponent);
