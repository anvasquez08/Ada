import React from 'react';
import {
  Container,
  Header,
  Grid,
  Segment,
  Image,
} from "semantic-ui-react";

import ItemsCarousel from 'react-items-carousel';
import { Motion, spring, presets } from 'react-motion';
import range from 'lodash/range';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import axios from 'axios';

class Discover extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      children: [],
      editorial: [],
      activeItemIndex: 0
    }
    this.fetchEditorial = this.fetchEditorial.bind(this);
  }

  componentDidMount() {
    this.fetchEditorial()
  }


  fetchEditorial() {
    axios.get('/trends')
    .then(res => this.setState({editorial: res.data}))
    .catch(err => console.log(err))
  }

  fetchLatestProducts() {
    axios.get('./latestProds')
    .then(res => console.log( res.data))
    .catch(err => console.log(err))
  }

  galleryItems() {
    return (
      this.state.children.map((item, i) => (
        <div>
            <Image src={item.imageUrl} size='medium' onDragStart={this.handleOnDragStart}  centered />
            <h3 className="ui center aligned header">{item.name}</h3>
        </div>
      ))
    )
  };

  render() {
    return (
  <div>
    <h1>Testing view for Style.jsx component</h1>
    {/* HEADER IMAGE */}
    <div style={{ overflow: "hidden", maxHeight: "300px" }}>
      <Image src="../assets/banner.jpg" fluid />
    </div>


    <Container>
        <Header as='h2' dividing style={{marginTop: "25px", marginBottom: "25px"}}> Discover | Editorial Fashion Trends </Header>
        <Grid>
          <div className="ui three column doubling stackable masonry grid">
            {
              this.state.editorial.map((story) => {
                return (
                  <Grid.Column key={story._id}>
                  <Segment>
                  <Image src={story.images[0].image} size='medium' />
                      <Header as='h3'>{story.title}</Header>
                      <div>{story.paragraph}</div>
                      <h5>{story.publicationName}</h5>
                  </Segment>
                  </Grid.Column>
                )
              })
            }
          </div>
          </Grid>

        <Header as='h2' dividing style={{marginTop: "25px", marginBottom: "25px"}}> Discover | Newest Clothing </Header>
        <Grid>
        <AliceCarousel 
                items={this.galleryItems()}
                style={{border: "none !important"}}
                mouseDragEnabled 
                dotsDisabled={true} 
                infinite={true}
                autoPlay={true}
                autoPlayInterval={5000}
                fadeOutAnimation={true}/>
        </Grid>
      </Container>
  </div>
  )
  }
}

export default Discover;

