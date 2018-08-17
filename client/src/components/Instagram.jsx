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
      <div>
      <Grid style={{margin: "auto"}} columns={4}>
        {/* <Grid.Row> */}
        {/* <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}> */}
          {this.props.photos.map((photo, idx) => {
            return <div><Grid.Column width={8}><InstagramEntry photo={photo} key={idx} select={this.select}/></Grid.Column></div>
            })
          }
        {/* </div> */}
        {/* </Grid.Row> */}
      </Grid>
      </div>
    )
  }
}


export default Instagram;