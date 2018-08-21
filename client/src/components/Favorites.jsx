import React from "react";
import axios from "axios";
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

  componentDidUpdate() {
    if (this.state.userPhotos.length === 0) {
        axios.get(`/favorites/${this.props.username}`)
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
          {/* HEADER IMAGE */}
        <div style={{ overflow: "hidden", maxHeight: "300px" }}>
          <Image src="../assets/banner.jpg" fluid />
        </div>

          {/* MY STYLE PHOTOS */}
          <Grid.Column width={12}>
            <div>
              <Card.Group itemsPerRow={4}>
                { this.state.userPhotos.map(item => {
                  return (
                    <Card>
                      <Card.Content>
                        <Image src={item.imageUrl} size="big" centered />
                      </Card.Content>
                    </Card>
                  );
                })}
              </Card.Group>
            </div>
          </Grid.Column>
      </div>)
  }
}

export default Favorites;