const { Item } = require("./schema.js");

exports.saveItem = (id, name, brandName, url, imageUrl, price) => {
  new Item({
    id: id,
    name: name,
    brandName: brandName,
    url: url,
    imageUrl: imageUrl,
    price: price
  })
    .save()
    .then(response => console.log("Successfully saved data"))
    .catch(err => console.log("Error in database save function"));
};
