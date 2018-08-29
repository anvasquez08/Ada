import React from 'react';
import PhotoCard from '../components/PhotoCard.jsx';
import { Grid, Button, Icon } from "semantic-ui-react";
import axios from 'axios';

class PhotoSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPictures: [],
      photos:[]
    }
    this.select = this.select.bind(this);
    this.submitPhotos = this.submitPhotos.bind(this);
    this.sendPhotosForRecommendations = this.sendPhotosForRecommendations.bind(this);
  }

  select(url) {
    if (this.state.selectedPictures.indexOf(url) > -1) {
      let copy = this.state.selectedPictures.slice()
      copy.splice(copy.indexOf(url), 1)
      this.setState({
        selectedPictures: copy
      })
    } else {
      let copy = this.state.selectedPictures.slice()
      copy.push(url);
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
    axios.post('/recommendinsta', {params: this.state.selectedPictures})
      .then(() => {console.log("Returning call from server: sendPhotosForRecommendations")})
  }

  componentDidMount() {
    if (this.state.photos.length === 0){
      let currentLocation = this.props.location.pathname
      // console.log('current location', currentLocation);
      if (currentLocation === '/insta') {
        // console.log('INSTA AUTH');
        axios.get('/auth/media')
        .then((result) => {this.setState({photos: result.data})})
      } else if (currentLocation === '/fb') {
        // console.log('FACEBOOK AUTH');
        axios.get('/auth/fbmedia')
        .then(
          (result) => {this.setState({photos: result.data}
        )}).catch((err) => {
          console.log(err);
        })
      }
    }
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
          {this.state.photos.map((photo, idx) => {
            return (<div style={{margin: "12px 5px 20px 0px"}} key={idx}>
              <Grid.Column>
                <PhotoCard photo={photo} select={this.select}/>
              </Grid.Column>
            </div>)
            })}
        </Grid></div>
        : <h1 style={{color: 'black', textAlign: 'right'}}>Sign in with Instagram <Icon name='arrow alternate circle up outline'/></h1>
      }
      </div>
    )
  }
}


export default PhotoSelector;