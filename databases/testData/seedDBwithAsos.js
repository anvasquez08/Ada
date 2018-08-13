const inventory = require('../testData/asos.json');
const saveItem = require('../Inventory').saveItem;

inventory["products"].forEach((item) => {
  saveItem(
    item["id"],
    item["name"],
    item["brandName"],
    `${item["baseImageUrl"]}`+`?$S$`,
    //`http://www.asos.com/${item["url"]}`,
    item["price"]["current"]["value"])
})