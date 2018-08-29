import React from 'react';
import {
  Grid,
  Segment,
  Divider, 
  Image,
  Menu,
  Form,
  Checkbox,
  Card,
  Icon,
  Button,
  Label,
  Container,
  Header
  
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
      activeItemIndex: 0
    }
    this.fetchCarouselStyles = this.fetchCarouselStyles.bind(this);
  }

  componentDidMount() {
    this.fetchCarouselStyles()
  }


  fetchCarouselStyles() {
    axios.get('/trends')
    .then(res => { this.setState({children: res.data})})
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
      <Container>
        <Header as='h2' dividing>NYT Street Style</Header>
        <Grid columns={3} relaxed>
          <Grid.Column>
          <Segment style={{height: "100%"}}>
          <Image src={'https://i.imgur.com/hOq4pFe.jpg'} size='medium' />
              <Header as='h2'>Street Style: Governors Ball Music Festival</Header>
              <div>Bold patterns and colors dominated the style landscape of Randalls Island.</div>
              <h5>Photographs by Deidre SchooProduced by Elizabeth Bristow</h5>
          </Segment>
          </Grid.Column>

          <Grid.Column>
          <Segment>
          <Image src={'https://i.imgur.com/RntHgBy.jpg'} size='medium' />
           <Header as='h2'>Street Style: Governors Ball Music Festival</Header>
           <div>Bold patterns and colors dominated the style landscape of Randalls Island.</div>
              <h5>Photographs by Deidre SchooProduced by Elizabeth Bristow</h5>
          </Segment>
          </Grid.Column>
          <Grid.Column>
          <Segment>
          <Image src={'https://i.imgur.com/0JL4fc7.jpg'} size='medium' />
              <Header as='h2'>Street Style: Copenhagen</Header>
              <div>In Denmark’s capital, bicycles are the most common accessory..</div>
              <h5>Søren Jepsen</h5>
          </Segment>
          </Grid.Column>
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
    )
  }
}

export default Discover;
// AIzaSyCgU8c3xXbJn-wxAoxHAwzNbAYvtvzm1FI