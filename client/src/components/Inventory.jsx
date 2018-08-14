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
            <img src={`${item["baseImageUrl"]}`+`?$XXL$`} width="100" height="120"></img><br />
            Shopping link: <a href={`http://asos.com/${item["url"]}`}>Click here</a><br />
          </div>)
        })
      }
    </div>
    )}
}

export default Inventory;