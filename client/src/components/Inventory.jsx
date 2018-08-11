import React from 'react'
import inventory from '../../../databases/testData/asos.json'

class Inventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    return (
    <div>
      {
        inventory["products"].map((item, idx) => {
          return (
          <div key={idx}>
            Id: {item["id"]}, Brand: {item["brandName"]}<br />
            Name: {item["name"]}<br />
            Price: {item["price"]["current"]["value"]}<br />
            <img src={item["images"][0]["url"]} width="100" height="130"></img>
          </div>)
        })
      }
    </div>
    )}
}

export default Inventory;