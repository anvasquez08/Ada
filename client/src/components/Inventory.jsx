import React from 'react';
import InventoryResults from './InventoryResults.jsx';
import inventory from '../../../databases/testData/asosWomen.json';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

/* Add isSelected to DB */

class Inventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inventory: inventory, 
      totalInventory: inventory,
      brands: []
    }
    this.filterBrands = this.filterBrands.bind(this);
  }

  componentDidMount() {
    let brands = inventory.map((item) => {return {[item.brandName]: false}})
    this.setState({brands: [... new Set(brands)]})
  }

  filterBrands(name) {
    let filtered = this.state.brands.slice()

    for (let i = 0; i < filtered.length; i++) {
      if (Object.keys(filtered[i])[0] === name) {
        let val = filtered[i][name]
        filtered[i][name] = !val
      }
    }   
    this.setState({brands: filtered})
  }

  render() {
    return (
      <Grid container direction="row">
      
      {/*FORM FOR BRANDS */}
        <Grid item lg={2}>
        <FormControl component="fieldset">
      {
        this.state.brands.map((singlebrand, ind) => {
          let name = Object.keys(singlebrand)[0]
          let isChecked = Object.values(singlebrand)[0]
          return (
            <div key={ind}>
            <FormControlLabel
              control={
                <Checkbox
                    name={name}
                    checked={isChecked}
                    onChange={ (e) => {this.filterBrands(e.target.name)}}
                    value={name}
                  />}
                  label={name}
                  />
            </div>
          )
        })
      }
      </FormControl>   
        
    </Grid>
       {/* RESULTS */}
        <Grid item lg={8}>
        <InventoryResults inventory={this.state.inventory}/>
        </Grid>
    </Grid>
  )}
}

export default Inventory;