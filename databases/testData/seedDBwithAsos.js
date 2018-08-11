const inventory = require('../testData/asos.json');
const {saveItem} = require('../helpers')

inventory["products"].forEach((item) => {
  saveItem(item["id"], item["name"], item["brandName"], item["url"], item["images"][0]["url"], item["price"]["current"]["value"])
})
