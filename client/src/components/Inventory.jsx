import React from "react";
import inventory from "../../../databases/testData/asosWomen.json";
import { Grid, Image, Menu, Form, Checkbox, Card, Icon, Button } from "semantic-ui-react";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: ["$", "$$", "$$$", "$$$$"],
      inventory: inventory,
      totalInventory: inventory,
      brands: [],
      filters: []
    };
    this.filterBrands = this.filterBrands.bind(this);
  }

  componentDidMount() {
    let brands = inventory.map(item => {
      return { [item.brandName]: false };
    });
    this.setState({ brands: [...new Set(brands)] });
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

  render() {
    return (
      <div>
        <div style={{overflow: "hidden", maxHeight:"300px"}}>
        <Image src='https://i.imgur.com/nw6xJ3h.jpg' fluid/>
        </div>
        {/* INVENTORY FILTERS */}
        <Grid  style={{margin: "10px"}}>
          <Grid.Column width={3}>
            <Menu vertical>
              <Menu.Item>
                <Menu.Header>Price</Menu.Header>
                <Form>
                  {this.state.prices.map(price => {
                    return (
                      <Form.Field key={price}>
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
                  {this.state.brands.map((singlebrand, ind) => {
                    let name = Object.keys(singlebrand)[0];
                    let isChecked = Object.values(singlebrand)[0];
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
              {
                this.state.inventory.map((item) => {
                  return (
                    <Card key={item.id}>
                        <Card.Content>
                          <Image 
                            src={item.imageUrl} 
                            size='big' centered />
                          <p style={{fontSize:"15px" , color: "#909090"}}>{item.brandName}</p>
                          <p style={{fontWeight: "bold"}}>{item.name}</p>
                          <p>${item.price}</p>
                          <p style={{fontSize:"9px" , color: "#909090"}}>From {item.brandName}</p>
                          <Button size='mini'>Buy</Button>
                          <Button size='mini'>Details</Button>
                        </Card.Content>
                    </Card>
                  )
                })
              }
              </Card.Group>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Inventory;
