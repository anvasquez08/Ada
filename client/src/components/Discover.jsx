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

  fetchEditorialTrends() {
    
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

  {/* MY EDITORIAL */}
<Container>
<Grid columns={3} relaxed>

  {
    this.state.editorial.map((story) => {
      return (
        <Grid.Column>
        <Segment>
          {console.log(story)}
        <Image src={story.images[0].image} size='medium' />
            <Header as='h2'>{story.title}</Header>
            <div>{story.paragraph}</div>
            <h5>{story.publicationName}</h5>
        </Segment>
        </Grid.Column>
      )
    })
  }

</Grid>
<Header as='h2' dividing> Trending Styles</Header>
<div>
<AliceCarousel 
        items={this.galleryItems()}
        style={{border: "none !important"}}
        mouseDragEnabled 
        dotsDisabled={true} 
        infinite={true}
        autoPlay={true}
        autoPlayInterval={5000}
        fadeOutAnimation={true}/>
      </div>
      </Container>



</div>)
  }
}

export default Discover;

