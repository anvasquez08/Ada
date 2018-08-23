import React from "react";
import UploadComponent from "./UploadComponent.jsx";
import inventory from "../../../databases/testData/asosWomen.json";
import axios from 'axios';
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
      prices: ["$", "$$", "$$$", "$$$$"],
      filters: [],
      filteredBrands: []
    };
    this.filterBrands = this.filterBrands.bind(this);
  }

  filterBrands(name) {
    let filtered = this.state.brands.slice();

    for (let i = 0; i < filtered.length; i++) {
      if (Object.keys(filtered[i])[0] === name) {
        let val = filtered[i][name];
        filtered[i][name] = !val;
      }
    }
    this.setState({ brands: filtered });
  }

  addFavorite(inventoryItem) {
    axios.post(`/favorites/${this.props.username}/${inventoryItem._id}`)
    .then(({data}) => {
      console.log('favorite saved')
    }).cathch((err) => {
      console.log(err);
    })
  }

  render() {
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
            handleImageUrl={this.props.handleImageUrl}
            imageUrl={this.props.imageUrl}
            username={this.props.username}/>
          </Grid.Row>
        </Grid>
        {/* INVENTORY FILTERS */}
        {!!this.props.brands.length && (
        <Grid style={{ margin: "10px" }}>
          <Grid.Column width={3}>
            <Menu vertical>
              <Menu.Item>
                <Menu.Header>Price</Menu.Header>
                <Form>
                  { this.props.brands.length > 0 && this.state.prices.map((price, ind) => {
                    return (
                      <Form.Field key={ind}>
                        <Checkbox
                          radio
                          label={price}
                          name={price}
                          value={price}
                          checked={this.state.value === "this"}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    );
                  })}
                </Form>
              </Menu.Item>
              <Menu.Item>
                <Menu.Header>Brands</Menu.Header>
                <Form>
                  {this.props.brands && this.props.brands.map((singlebrand, ind) => {
                    let name = singlebrand
                    // let isChecked = Object.values(singlebrand)[0];
                    return (
                      <Form.Field key={ind}>
                        <Checkbox
                          radio
                          label={name}
                          name={name}
                          value={name}
                          checked={this.state.value === "this"}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    );
                  })}
                </Form>
              </Menu.Item>
            </Menu>
          </Grid.Column>

          {/* INVENTORY RESULTS */}
          <Grid.Column width={12}>
            <div>
              <Card.Group itemsPerRow={4}>
                { this.props.inventory && this.props.inventory.map(item => {
                  return (
                    <Card key={item._id}>
                      <Card.Content>
                        <Image src={item.imageUrl} size="big" centered />
                        <p style={{ fontSize: "15px", color: "#909090" }}>
                          {item.brandName}
                        </p>
                        <p style={{ fontWeight: "bold" }}>{item.name}</p>
                        <p>${item.price}</p>
                        <p style={{ fontSize: "9px", color: "#909090" }}>
                          From {item.brandName}
                        </p>
                        <Button size="mini" onClick={() => {this.addFavorite(item)}}>Buy</Button>
                        <Button size="mini">Details</Button>
                      </Card.Content>
                    </Card>
                  );
                })}
              </Card.Group>
            </div>
          </Grid.Column>
        </Grid>)
        }
        
      </div>
    );
  }
}

export default Inventory;