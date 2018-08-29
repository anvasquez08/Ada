import React from "react";
import {
  Image,
  Card,
  Button
} from "semantic-ui-react";

const InventoryItem = ({item, addFavorite}) => (
  <Card key={item._id}>
    <Card.Content>
      <Image src={item.imageUrl} size="big"  centered/>
        {/* <p style={{fontSize: "15px",color: "#909090" }} >{item.brandName}</p> */}
        {/* <p style={{ fontWeight: "bold" }}>{item.name.length > 50 ? item.name.substring(0, 50) + '...' : item.name}</p> */}
        <p>${item.price}</p>
        <p style={{ fontSize: "9px", color: "#909090" }} >From {item.brandName}</p>
        <Button size="mini" onClick={() => {  addFavorite(item) }} >Buy</Button>
        <Button size="mini"> <a href={item.url} target="_blank" className="button"> Details</a></Button>
    </Card.Content>
  </Card>
)

export default InventoryItem;