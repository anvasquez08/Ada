import React from "react";
import {
  Image,
  Card,
  Button,
  Icon,
  Link
} from "semantic-ui-react";

const InventoryItem = ({item, addFavorite, isStyle}) => (
  <Card key={item._id} style={{marginLeft: 25, marginTop: 1, marginBottom: 25}}>
    <Card.Content>
      <Image src={isStyle ? item : item.imageUrl} size="medium"/>
        <p style={isStyle ? {display: 'none'} : {display: 'block'}}>${item.price}</p>
        <p style={isStyle ? {display: 'none'} : {fontSize: "12px", color: "#909090", display: 'block'}}> {item.brandName}</p>
        <Button 
        size="mini" 
        onClick={() => { addFavorite(item) }} 
        className="ui icon button"
        style={addFavorite || !isStyle ? {display: 'inline-block'} : {display: 'none'}}>
          <Icon className="heart"></Icon>
        </Button>
        <Button size="mini" href={item.url} style={isStyle ? {display: 'none'} : {display: 'inline-block'}}>Details</Button>
    </Card.Content>
  </Card>
)

export default InventoryItem;