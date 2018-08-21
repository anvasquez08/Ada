import React from 'react';
import InstagramEntry from '../components/InstagramEntry.jsx';
import { Grid } from "semantic-ui-react";

class Instagram extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPictures: []
    }
    this.select = this.select.bind(this);
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

  render() {
    return (
      <div>
        <Grid centered>
          {this.props.photos.map((photo, idx) => {
            return (<div style={{margin: "12px 5px 20px 0px"}} key={idx}>
              <Grid.Column>
              <InstagramEntry photo={photo} select={this.select}/>
              </Grid.Column>
            </div>)
            })}
        </Grid>
      </div>
    )
  }
}


export default Instagram;