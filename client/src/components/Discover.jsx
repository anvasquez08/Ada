import React from 'react';
import {
  Container,
  Header,
  Grid,
  Segment,
  Image,
  Modal,
  Button,
  Icon
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
    this.changeActiveItem = this.changeActiveItem.bind(this)
    this.modalGallery = this.modalGallery.bind(this);
  }


  componentDidMount() {
    this.fetchEditorial()
    this.fetchLatestProducts()
  }

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  fetchEditorial() {
    axios.get('/trends')
    .then(res => {
      let imageArray = [], editorial = res.data[0]
      for (let i = 0; i < res.data[1].length; i+=5) {
        let subArr = res.data[1].slice(i, i + 5)
        subArr = subArr.reduce((acc, curr) => acc.concat(curr), [])
        imageArray.push(subArr)
      }
      imageArray.forEach((smallerImageArr, i) =>  {
        editorial[i].inventory = smallerImageArr
      })
      
      this.setState({editorial: editorial})
    })
    .catch(err => console.log(err))
  }

  fetchLatestProducts() {
    axios.get('./latestProds')
    .then(res => this.setState({children: res.data}))
    .catch(err => console.log(err))
  }

  galleryItems() {
    return (
      this.state.children.map((item, i) => (
        <div>
            <Image src={item.imageUrl} size='medium'  centered />
            <h3 className="ui center aligned header">{item.name}</h3>
        </div>
      ))
    )
  };

  modalGallery(arr) {
    return (
      arr.map((item, i) =>(
        <div key={i}>
          <p>{item.brandName} | {item.name}</p>
          <img src={item.imageUrl}   style={{ height: 200, background: '#333' }}/>
        </div>
      ))
    )
  }

  render() {
    return (
    <div>
      <Container>
        <Header as='h2' dividing style={{marginTop: "25px", marginBottom: "25px"}}> Editorial Fashion Trends </Header>
          <Grid>
            <div className="ui three column doubling stackable masonry grid">
              {
                this.state.editorial.map((story) => {
                  return (
                    <Grid.Column key={story._id}>
                    <Segment>
                    <Image src={story.images[0].image} size='medium'/>
                      <Header as='h3'>{story.title}</Header>
                        <div>{story.paragraph.split('.').slice(0, 2).join('.') + '.'}</div>
                        <div>
                          <Image src='https://i.imgur.com/h4Fen0q.png' avatar/>
                          <span>{story.publicationName}.com</span>
                        </div>
                    <Modal trigger={<Button>View Full Story & Inventory</Button>}closeIcon>

                    <Modal.Header>{story.title}
                      <h5>By: {story.publicationName}.com</h5>
                    </Modal.Header>

                    <Modal.Content image scrolling>
                        <Grid  celled='internally'>
                          <Grid.Row> 
                            <Container>
                            <Header center="true">Browse Simiar Collection</Header>
                            <ItemsCarousel
                              numberOfCards={3}
                              gutter={0}
                              showSlither={true}
                              firstAndLastGutter={true}
                              requestToChangeActive={this.changeActiveItem}
                              activeItemIndex={this.state.activeItemIndex}
                              activePosition={'center'}
                              chevronWidth={2}
                              rightChevron={'>'}
                              leftChevron={'<'}
                              outsideChevron={true}>

                                {this.modalGallery(story.inventory)}                         
                            </ItemsCarousel>   
                            </Container> 
                          </Grid.Row>
                          <Grid.Row> 
                          <Grid.Column width={4}>
                            <Header center="true">Article Photos</Header>
                                {
                                  story.images.map((image) => {
                                    return (<div key={image._id} style={{padding: '5px'}}><Image size='small' src={image.image} /></div>)
                                    })
                                }
                              </Grid.Column>

                              <Grid.Column width={9}><p style={{fontSize: '110%'}}>{story.paragraph}</p>  </Grid.Column>
                            </Grid.Row>
                          </Grid>
                          </Modal.Content>
                        </Modal>

                    </Segment>
                    </Grid.Column>
                  )
                })
              }
            </div>
            </Grid>

          <Header as='h2' dividing style={{marginTop: "25px", marginBottom: "25px"}}> New Releases </Header>
          <Grid>
          <AliceCarousel 
                  items={this.galleryItems()}
                  mouseDragEnabled 
                  dotsDisabled={true} 
                  infinite={true}
                  autoPlay={true}
                  autoPlayInterval={5000}
                  fadeOutAnimation={true}/>
          <div>
          </div>
          </Grid>
        </Container>
    </div>
  )
  }
}

export default Discover;
