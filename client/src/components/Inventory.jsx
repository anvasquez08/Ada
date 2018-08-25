import React from "react";
import UploadComponent from "./UploadComponent.jsx";
import { ApolloConsumer } from "react-apollo";
import InventoryItem from './InventoryItem.jsx';

import axios from "axios";
import {
  Grid,
  Image,
  Menu,
  Form,
  Checkbox,
  Card,
  Icon,
  Button
} from "semantic-ui-react";

class Inventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      priceTiers: [
        { val: "$", isSelected: false, bracket: [0, 60] },
        { val: "$$", isSelected: false, bracket: [61, 130] },
        { val: "$$$", isSelected: false, bracket: [131, 300] },
        { val: "$$$$", isSelected: false, bracket: [301, 2000] }
      ],
      filteredPrices: [],
      filteredBrands: [],
      filteredInventory: []
    };
    this.addFavorite = this.addFavorite.bind(this);
  }

  // Filter brands where "isSelected" = true 
  handleBrandChange() {
    let filtered = this.props.brands.filter(brand => {
      return brand.isSelected === true && brand
    })
    this.setState({filteredBrands: filtered}, 
      () => {this.filter()})
  }

  // Filter categories where "isSelected" = true
  handlePriceChange() {
    let filtered = this.state.priceTiers.filter(priceCat => {
      return priceCat.isSelected === true && priceCat;
    });
    this.setState({ filteredPrices: filtered}, 
      () => {this.filter()});
  }

  // Filter inventory by stores and price range 
  filter() {
    let temp = [], finalArr = [];
    let { filteredPrices, filteredBrands } = this.state;
    let { inventory } = this.props
    
    //Filtering brands
    if (filteredBrands.length > 0) {
      for (let k = 0; k < filteredBrands.length; k++) {
        for (let j = 0; j < inventory.length; j++) {
          if (filteredBrands[k].brandName === inventory[j].brandName) {
            temp.push(inventory[j]);
          }
        }
      }
    } 

    //Filtering price range
    if (filteredPrices.length > 0) {
      let tempInven = temp.length > 0 ? temp : inventory
      temp = []
      for (let i = 0; i < filteredPrices.length; i++) {
        for (let m = 0; m < tempInven.length; m++) {
          if (tempInven[m].price >=  filteredPrices[i].bracket[0] && tempInven[m].price <= filteredPrices[i].bracket[1]) {
            temp.push(tempInven[m]);
          }
        }
      }
    } 
    console.log('this is temp', temp)
    this.setState({filteredInventory: temp})
  }

  addFavorite(inventoryItem) {
    axios
      .post(`/favorites/${this.props.username}/${inventoryItem._id}`)
      .then(({ data }) => {
        console.log("favorite saved");
      })
      .cathch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <div>
              {/* HEADER IMAGE */}
              <div style={{ overflow: "hidden", maxHeight: "300px" }}>
                <Image src="../assets/banner.jpg" fluid />
              </div>
              {/* UPLOAD COMPONENT */}
              <Grid style={{ margin: "10px" }}>
                <Grid.Row centered>
                  <UploadComponent
                    handleStateChange={this.props.handleStateChange}
                    username={this.props.username}
                    handleImageUrl={this.props.handleImageUrl}
                    imageUrl={this.props.imageUrl}
                  />
                </Grid.Row>
              </Grid>
              <Grid centered>{!!this.props.inventory.length ? <img src={this.props.imageUrl}></img> : null}</Grid>
              {/* INVENTORY FILTERS COMPONENT */}
              {!!this.props.brands.length && (
                <Grid style={{ margin: "10px" }}>
                  <Grid.Column width={2}>
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
                                    }}
                                  />
                                </Form.Field>
                              );
                            })}
                        </Form>
                      </Menu.Item>
                    </Menu>
                  </Grid.Column>
                  {/* INVENTORY RESULTS */}
                  {
                  this.state.filteredInventory.length > 0 ? (
                 
                      <Grid.Column width={12}>
                        <div>
                          <Card.Group itemsPerRow={4}>
                          {this.props.inventory &&
                              this.state.filteredInventory.map((item, i) => {
                                return (<InventoryItem item={item} addFavorite={this.addFavorite} key={i}/>);
                          })}
                          </Card.Group>
                         </div>
                      </Grid.Column>
                 ) : ( 
                    <Grid.Column width={12}>
                        <div>
                          <Card.Group itemsPerRow={4}>
                          {this.props.inventory &&
                          this.props.inventory.map((item, i) => {
                            return (
                              <InventoryItem item={item} addFavorite={this.addFavorite} key={i}/>
                            );
                          })}
                          </Card.Group>
                         </div>
                      </Grid.Column>
                  )
                  }  
             </Grid>
              )}
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Inventory;