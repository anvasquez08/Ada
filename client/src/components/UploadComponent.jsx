import React, { Component } from "react";
import axios from "axios";

import {
  graphql,
  Query,
  Mutation,
  withApollo,
  ApolloConsumer,
  compose
} from "react-apollo";
import { gql } from "apollo-boost";
import client from "../index.jsx";
import "babel-polyfill";
import { Grid, Input, Button } from "semantic-ui-react";


class UploadComponent extends Component {
  constructor(props) {
    super(props);
    this.sendImageUrl = this.sendImageUrl.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  handleImageUpload(e) {
    e.preventDefault();
    let input = document.getElementById("embedpollfileinput");
    let imageFile = input.files[0];
    this.encodeImage(imageFile);

    let data = new FormData()
    data.append('file', imageFile);
    this.props
    .imageUpload({ variables: { input: data } })
    .then(result => console.log('Console logging result from handleImageUpload: ', result))
    .catch(error => console.log(error));

    
    let endpoint = `/upload`;
    if (this.props.username.length > 0) {
      endpoint += `/${this.props.username}`
    }
    // console.log('UPLOADING WITH ENDPOINT', endpoint)
    axios.post(endpoint, data)
      .then(({data})=>{
        console.log('image uploaded')
    })
    .catch(err=>console.log("Console logging error from axios post: ", err))
  }

  encodeImage(image) {
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = e => {
      this.props
        .largeUpload({ variables: { input: e.target.result, name: this.props.username } })
        .then(result => this.props.handleStateChange("inventory", result.data.uploadLargeFile))
        .catch(error => console.log(error));
    };
  }

  sendImageUrl(){
    // Test with these urls:
    // https://images.asos-media.com/products/stradivarius-long-sleeve-shirt-in-white/10584462-1-white?$XL$
    // https://static.theblacktux.com/products/tuxedos/grosgrain-bound-tuxedo/1_20160811_HolidayEcom_GrosgrainBoundTuxedo_1473_1812x1875.jpg?impolicy=PDPdesktop
    console.log("Sending image URL!", this.props.imageUrl)
    let endpoint = `/recommend`;
    if (this.props.username.length > 0) {
      endpoint += `/${this.props.username}`
    }
    axios.post(endpoint, {params: this.props.imageUrl})
      .then(({data}) => {
        // console.log("Console logging return from sendImageUrl: ", result.data)
        this.props.handleStateChange('inventory', data);
      })
  }

  render() {
    return (
      <div>
        <Grid style={{ margin: "10px" }}>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <div>
                <div>
                  <label
                    htmlFor="embedpollfileinput"
                    className="ui large blue right floated button"
                  >
                    <input type="file"
                      onChange={this.handleImageUpload}
                      className="inputfile" id="embedpollfileinput"
                      style={{ width: "0.1px",   height: "0.1px",  opacity: "0", overflow: "hidden",  position: "absolute",    zIndex: "-1"
                      }}
                    />
                    <i className="ui upload icon" />
                    Upload image
                  </label>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div>
                <Input
                  action={<Button className="ui left floated button" onClick={this.sendImageUrl}>Upload</Button>}
                  size='large' 
                  placeholder='Upload with URL' 
                  value={this.props.imageUrl} 
                  onChange={this.props.handleImageUrl}/>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        

      </div>
    );
  }
}


const UPLOAD_FILE = gql`
  mutation singleUpload($input: Upload!) {
    singleUpload(input: $input) 
  }
`;

const UPLOAD_LARGE_FILE = gql`
  mutation uploadLargeFile($input: String!, $name: String) {
    uploadLargeFile(input: $input, name: $name) {
      _id
      name
      brandName
      timestamp
      url
      price
      imageUrl
    }
  }
`

export default compose(
  graphql( UPLOAD_LARGE_FILE, {name: "largeUpload"}),
  graphql( UPLOAD_FILE , { name: "imageUpload" })
)(UploadComponent);
