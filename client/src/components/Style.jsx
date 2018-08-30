import React from "react";
import axios from "axios";
import {
  Grid,
  Image,
  Card,
  Button
} from "semantic-ui-react";
import InventoryItem from './InventoryItem.jsx'

class Style extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userPhotos: []
    };
  }

  componentDidMount() {
    if (this.props.username.length > 0 && this.state.userPhotos.length === 0) {
        axios.get(`/history/${this.props.username}`)
        .then(({data}) => {
            console.log(data);
            this.setState({
                userPhotos: data
            })
        })
    }
  }

  render() {
    return (
      <div>
        <h1>Testing view for Favorites.jsx component</h1>
          {/* HEADER IMAGE */}
        <div style={{ overflow: "hidden", maxHeight: "300px" }}>
          <Image src="../assets/banner.jpg" fluid />
        </div>

          {/* MY STYLE PHOTOS */}
          <Grid centered style={{margin: '100px'}}>
          <Grid.Row columns={4}>
            { this.state.userPhotos.map((item, index) => {
              return (
                <Grid.Column><InventoryItem item={item} isStyle={true} key={index}/></Grid.Column>
              );
            })}
            </Grid.Row>
          </Grid>
      </div>)
  }
}

export default Style;