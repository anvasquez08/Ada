import React from 'react';
import InstagramEntry from '../components/InstagramEntry.jsx';
import { Grid, Button, Input } from "semantic-ui-react";
import axios from 'axios';

class Instagram extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPictures: []
    }
    this.select = this.select.bind(this);
    this.submitPhotos = this.submitPhotos.bind(this);
    this.sendPhotosForRecommendations = this.sendPhotosForRecommendations.bind(this);
  }

  select(url) {
    if (this.state.selectedPictures.indexOf(url) > -1) {
      let copy = this.state.selectedPictures.slice()
      copy.splice(copy.indexOf(url), 1)
      console.log("Instagram selected photos: ", copy)
      this.setState({
        selectedPictures: copy
      })
    } else {
      let copy = this.state.selectedPictures.slice()
      copy.push(url);
      console.log("Instagram selected photos: ", copy)
      this.setState({
        selectedPictures: copy
      })
    }
  }

  submitPhotos(e) {
    e.preventDefault();
    axios.post(`instahistory/${this.props.username}`, {photos: this.state.selectedPictures})
    .then(() => {
      this.props.history.push('/style');
    }).catch((err) => {
      console.log(err);
    })
  }

  sendPhotosForRecommendations() {
    // console.log("Sending instagram recs to server: ", this.state.selectedPictures)
    console.log("Firing send photos array")
    axios.post('/recommend/insta', {params: this.state.selectedPictures})
      .then(() => {console.log("Returning call from server: sendPhotosForRecommendations")})

  }

  render() {
    return (
      <div style={{marginTop: 100}}>

      {this.props.username
        ?
        <div><Grid centered>
        <Grid.Row>
          <Button className="ui large blue floated button" onClick={this.sendPhotosForRecommendations}>Get Recommendations!</Button><br/>
        </Grid.Row>
          {this.props.photos.map((photo, idx) => {
            return (<div style={{margin: "12px 5px 20px 0px"}} key={idx}>
              <Grid.Column>
                <InstagramEntry photo={photo} select={this.select}/>
              </Grid.Column>
            </div>)
            })}
        </Grid></div>
        : <center>Sign in with Instagram</center>
      }
        {/* <div>
          <button type='Submit' onClick={this.submitPhotos}>Submit</button>
        </div> */}
      </div>
    )
  }
}


export default Instagram;