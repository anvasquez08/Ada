// A simple script for seeding our database with test data

const inventory = require('../testData/asos.json');
const saveItem = require('../helpers.js').saveItem;

inventory.forEach((item) => {
  saveItem(
    item["id"],
    item["name"],
    item["brandName"],
    `http://www.asos.com/${item["url"]}`,
    `${item["baseImageUrl"]}`+`?$XXL$`,
    item["price"]["current"]["value"])
})