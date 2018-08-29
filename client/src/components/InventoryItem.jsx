import React from "react";
import {
  Image,
  Card,
  Button,
  Icon
} from "semantic-ui-react";

const InventoryItem = ({item, addFavorite}) => (
  <Card key={item._id} style={{marginLeft: 25, marginTop: 1, marginBottom: 25}}>
    <Card.Content>
      <Image src={item.imageUrl} size="medium"/>
        <p>${item.price}</p>
        <p style={{ fontSize: "12px", color: "#909090" }}> {item.brandName}</p>
        <Button size="mini" onClick={() => { addFavorite(item) }} className="ui icon button"><Icon className="heart"></Icon></Button>
        <Button size="mini"> <a href={item.url} target="_blank" className="button">Details</a></Button>
    </Card.Content>
  </Card>
)

export default InventoryItem;