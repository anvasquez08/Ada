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

class Discover extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      children: [],
      activeItemIndex: 0
    }
    this.createChildren = this.createChildren.bind(this)
    this.handleOnDragStart = this.handleOnDragStart.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        children: this.createChildren(20),
      })
    }, 100);
  }

  createChildren(n) {
    return range(n).map(i => <div key={i} style={{ height: 200, background: '#333' }}>{i}</div>);
  }
 
  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  onSlideChange(e) {
    console.log('Item`s position during a change: ', e.item);
    console.log('Slide`s position during a change: ', e.slide);
  };

  onSlideChanged(e) {
    console.log('Item`s position after changes: ', e.item);
    console.log('Slide`s position after changes: ', e.slide);
  };
  
  galleryItems() {
    return (
      [1, 2, 3, 4, 5].map((item, i) => (
        <div key={`key-${i}`} className="yours-custom-class"><h2>{item}</h2></div>
      ))
    )
  };
  handleOnDragStart(e) {
    e.preventDefault()
  } 

  render() {
    const {
      activeItemIndex,
      children,
    } = this.state;
    const items = this.galleryItems();
    
    return (
      <Container >

<div style={{border: "none !important"}}>
      <AliceCarousel 
        style={{border: "none !important"}}
        mouseDragEnabled 
        dotsDisabled={true} 
        infinite={true}
        autoPlay={true}
        autoPlayInterval={7000}
        fadeOutAnimation={true}
        onSlideChange={this.onSlideChange}
        onSlideChanged={this.onSlideChanged}
       >
        <div>
              <Image src={'https://images.asos-media.com/products/suncoo-cut-out-detail-shirt/10597700-1-blanccasse?$XL$'} size='medium'  onDragStart={this.handleOnDragStart}  centered />
             <h4>ASOS DESIGN oversized check shirt with aztec design in red</h4>
        </div>
        <div>
        <Image src={'https://images.asos-media.com/products/deby-debo-cena-smock-shirt/9764377-1-white'} size='medium'  onDragStart={this.handleOnDragStart}  centered />
             {/* <img src={'https://images.asos-media.com/products/deby-debo-cena-smock-shirt/9764377-1-white'} onDragStart={this.handleOnDragStart} className="style" style={{width: "35%", position: "center"}} /> */}
             <h4>ASOS DESIGN oversized overhead half zip cord shirt in black</h4>
        </div>
        
      </AliceCarousel>
</div>

        <ItemsCarousel
                // Placeholder configurations
                enablePlaceholder
                numberOfPlaceholderItems={5}
                minimumPlaceholderTime={1000}
                placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}
        
                // Carousel configurations
                numberOfCards={5}
                gutter={12}
                showSlither={true}
                firstAndLastGutter={true}
                freeScrolling={false}

                // Active item configurations
                requestToChangeActive={this.changeActiveItem}
                activeItemIndex={activeItemIndex}
                activePosition={'center'}
        
                chevronWidth={24}
                rightChevron={'>'}
                leftChevron={'<'}
                outsideChevron={false}
              >
                {children}
        </ItemsCarousel>

        <Header size='huge'>Style</Header>
        <Header as='h3' dividing> Who We Love</Header>
        <Grid columns={3} relaxed>
          <Grid.Column>
          <Segment>
          <Image src={'https://i.imgur.com/QFUR54m.jpg'} size='medium' />
              <Header as='h2'>How to Transform Your Nightgown into an Outfit</Header>
              <h5>By: Blank Itinerary | PAOLA ALBERDI</h5>
          </Segment>
          </Grid.Column>

          <Grid.Column>
          <Segment>
          <Image src={'https://i.imgur.com/QFUR54m.jpg'} size='medium' />
           <Header as='h2'>How to Transform Your Nightgown into an Outfit</Header>
              <h5>By: Blank Itinerary | PAOLA ALBERDI</h5>
          </Segment>
          </Grid.Column>
          <Grid.Column>
          <Segment>
          <Image src={'https://i.imgur.com/QFUR54m.jpg'} size='medium' />
              <Header as='h2'>How to Transform Your Nightgown into an Outfit</Header>
              <h5>By: Blank Itinerary | PAOLA ALBERDI</h5>
          </Segment>
          </Grid.Column>
        </Grid>
      
        </Container>

    )
  }
}

export default Discover;
// AIzaSyCgU8c3xXbJn-wxAoxHAwzNbAYvtvzm1FI