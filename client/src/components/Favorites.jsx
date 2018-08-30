import React from "react";
import axios from "axios";
import InventoryItem from "./InventoryItem.jsx";
import {
  Grid,
  Image,
  Card,
} from "semantic-ui-react";

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userPhotos: []
    };
  }

  componentDidMount() {
    if (this.props.username.length > 0 && this.state.userPhotos.length === 0) {
      axios.get(`/favorites/${this.props.username}`)
      .then(({data}) => {
          console.log("Console log from /favorites/username endpoint: ", data);
          this.setState({
              userPhotos: data
          })
      })
    }
  }

  render() {
    return (
      <div style={{paddingTop: 42}}>
          {/* HEADER IMAGE */}
        <div style={{ overflow: "hidden", maxHeight: "300px" }}>
          <Image src="../assets/banner.jpg" fluid />
        </div>

          {/* MY STYLE PHOTOS */}
          <Grid centered style={{margin: '100px'}}>
          <Grid.Row columns={4}>
            { this.state.userPhotos.map((item, index) => {
              return (
                <Grid.Column><InventoryItem item={item} key={index}/></Grid.Column>
              );
            })}
            </Grid.Row>
          </Grid>
      </div>)
  }
}

export default Favorites;