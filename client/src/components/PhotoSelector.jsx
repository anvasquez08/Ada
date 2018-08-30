import React from 'react';
import PhotoCard from '../components/PhotoCard.jsx';
import InventoryItem from './InventoryItem.jsx';
import { Grid, Button, Icon, Menu, Form, Checkbox, Image } from "semantic-ui-react";
import axios from 'axios';

class PhotoSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPictures: [],
      photos:[],
      inventory: [],
      priceTiers: [
        { val: "$", isSelected: false, bracket: [0, 60] },
        { val: "$$", isSelected: false, bracket: [61, 130] },
        { val: "$$$", isSelected: false, bracket: [131, 300] },
        { val: "$$$$", isSelected: false, bracket: [301, 2000] }
      ],
      filteredPrices: [],
      filteredBrands: [],
      filteredInventory: []
    }
    this.select = this.select.bind(this);
    this.submitPhotos = this.submitPhotos.bind(this);
    this.sendPhotosForRecommendations = this.sendPhotosForRecommendations.bind(this);
  }

  select(url) {
    if (this.state.selectedPictures.indexOf(url) > -1) {
      let copy = this.state.selectedPictures.slice()
      copy.splice(copy.indexOf(url), 1)
      this.setState({
        selectedPictures: copy
      })
    } else {
      let copy = this.state.selectedPictures.slice()
      copy.push(url);
      this.setState({
        selectedPictures: copy
      })
    }
  }

  submitPhotos(e) {
    e.preventDefault();
    axios.post(`instahistory/${this.props.username}`, {photos: this.state.selectedPictures})
    .then(() => {
      this.props.history.push('/style');
    }).catch((err) => {
      console.log(err);
    })
  }

  sendPhotosForRecommendations() {
    axios.post('/recommendinsta', {params: this.state.selectedPictures})
      .then((result) => {
        // console.log("Returning call from server: sendPhotosForRecommendations")
        // console.log(result.data);
        this.props.handleStateChange('inventory', result.data);
        // set state to the higher component, or change this.props.inventory below
      })
      .catch(() => console.log("Error setting state"))
  }

  componentDidMount() {
    if (this.state.photos.length === 0){
      let currentLocation = this.props.location.pathname
      // console.log('current location', currentLocation);
      if (currentLocation === '/insta') {
        // console.log('INSTA AUTH');
        axios.get('/auth/media')
        .then((result) => {this.setState({photos: result.data})})
      } else if (currentLocation === '/fb') {
        // console.log('FACEBOOK AUTH');
        axios.get('/auth/fbmedia')
        .then(
          (result) => {this.setState({photos: result.data}
        )}).catch((err) => {
          console.log(err);
        })
      }
    }
  }

  render() {
    return (
      <div style={{marginTop: 100}}>

      {this.props.username
        ?
        <div><Grid centered>
        <Grid.Row>
          <Button className="ui large blue floated button" onClick={this.sendPhotosForRecommendations}>Get Recommendations!</Button><br/>
        </Grid.Row>
          {this.state.photos.map((photo, idx) => {
            return (<div style={{margin: "12px 5px 20px 0px"}} key={idx}>
              <Grid.Column>
                <PhotoCard photo={photo} select={this.select}/>
              </Grid.Column>
            </div>)
            })}
        </Grid></div>
        : <h1 style={{color: 'black', textAlign: 'right'}}>Sign in with Instagram <Icon name='arrow alternate circle up outline'/></h1>
      }

    {!!this.props.brands.length && (
      <div>
        <Grid style={{ margin: "10px", display: "table" }} divided='vertically' columns='equal'>
        <Grid.Row columns={2}>
        <Grid.Column width={3}>
          <Menu vertical>
            <Menu.Item>
              <Menu.Header>Price</Menu.Header>
              <Form>
                <Form.Group grouped>
                  {this.props.brands.length > 0 &&
                    this.state.priceTiers.map((price, i) => {
                      return (
                        <Form.Field key={price.val}>
                          <Checkbox
                            label={price.val}
                            control="input"
                            type="checkbox"
                            onChange={() => {
                              let newState = this.state.priceTiers.slice();
                              newState[i].isSelected = !price.isSelected;
                              this.setState({ priceTiers: newState },
                                () => { this.handlePriceChange(price) }
                              );
                            }}
                          />
                        </Form.Field>
                      );
                    })}
                </Form.Group>
              </Form>
            </Menu.Item>
            <Menu.Item>
              <Menu.Header>Brands</Menu.Header>
              <Form>
                {this.props.inventory &&
                  this.props.brands.map((brand, i) => {
                    return (
                      <Form.Field key={i}>
                        <Checkbox
                          label={brand.brandName}
                          control="input"
                          type="checkbox"
                          onChange={ () => {
                            let newState = this.props.brands.slice();
                            newState[i].isSelected = !brand.isSelected;
                            this.props.handleAppBrandChange(newState)
                            this.handleBrandChange()
                          }}/>
                      </Form.Field>
                    )
                  })}
              </Form>
            </Menu.Item>
          </Menu>
          </Grid.Column>
          {/* </Grid.Row> */}

        {/* INVENTORY RESULTS */}

        {this.state.filteredInventory.length > 0 
          ? (
              <Grid.Column width={12}><Grid>
                {/* <Card.Group style={{margin: "auto"}}> */}
                <Grid.Row columns={4}>
                {this.props.inventory &&
                  this.state.filteredInventory.map((item, i) => {
                    return (<Grid.Column><InventoryItem item={item} addFavorite={this.addFavorite} key={i}/></Grid.Column>);
                  })}
                {/* </Card.Group> */}
                  </Grid.Row>
                </Grid>
            </Grid.Column>
            )
          : (
            <Grid.Column width={12}><Grid>
            <Grid.Row columns={4}>
                {/* <Card.Group style={{margin: "auto"}}> */}
                {this.props.inventory && 
                  this.props.inventory.map((item, i) => {
                    return (<Grid.Column><InventoryItem item={item} addFavorite={this.addFavorite} key={i}/></Grid.Column>);
                  })}
                {/* </Card.Group> */}
                  </Grid.Row>
                </Grid>
            </Grid.Column>
          )
        }
      </Grid.Row>
    </Grid></div>
    )}

      </div>
    )
  }
}


export default PhotoSelector;