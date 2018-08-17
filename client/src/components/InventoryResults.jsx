import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

class InventoryResults extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div>
            <GridList cellHeight={180} >
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">Results</ListSubheader>
            </GridListTile>      
            {
                this.props.inventory.map((item) => {
                  return (
                  <div key={item.id}>
                  <img src={item.imageUrl} alt={item.name}  width="100" height="130"/>
                  <h4>{item.brandName} {item.price}</h4>
                  </div>)
                })
          }
        </GridList>
      </div>
    )
  }
}

export default InventoryResults;