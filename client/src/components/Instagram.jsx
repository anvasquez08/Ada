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
      console.log("Array of selected Instagram photos: ", copy);
    } else {
      let copy = this.state.selectedPictures.slice()
      copy.push(url);
      this.setState({
        selectedPictures: copy
      })
      console.log("Array of selected Instagram photos: ", copy);
    }
  }

  render() {
    return (
      <div style={{marginLeft: "auto", marginRight: "auto"}}>
      <Grid columns={4}>
          {this.props.photos.map((photo, idx) => {
            return <div style={{margin: "20px 1px 18px 18px"}}><Grid.Column width={8}><InstagramEntry photo={photo} key={idx} select={this.select}/></Grid.Column></div>
            })
          }
      </Grid>
      </div>
    )
  }
}


export default Instagram;