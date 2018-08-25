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
// import Twit  from 'twit'

class Discover extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container>
         {/* HEADER IMAGE */}
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