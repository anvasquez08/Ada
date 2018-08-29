const { Editorial } = require("./schema.js");
const async = require('async');

const saveScrapedEditorial = (args, publication) => {
  const {title} = args[0]
  const {paragraph} = args[1]
  const {images} = args[2]

  new Editorial({
    publicationName: publication,
    title: title,
    paragraph: paragraph,
    images: images
  })
    .save()
    .then(response => console.log("Successfully saved data"))
    .catch(err => console.log("Error in database save function", err));
}


const getSavedEditorial = (callback) => {
  Editorial.find({}).exec((err, items) => {
    if (err) {
      callback(err);
    } else {
      callback(null, items);
    }
  })
}

module.exports = {getSavedEditorial}
