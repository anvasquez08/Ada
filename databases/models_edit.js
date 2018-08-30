const { Editorial } = require("./schema.js");
const async = require('async');
const {getRecommendationsForImageUrl} = require('../servers/recommendations/service/imageTraits.js')

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

const getSavedEditorial = () => {
  return new Promise((resolve, reject) => {
    Editorial.find({}).exec((err, items) => {
      if (err) reject(err)
      else resolve(items); 
    })
  })
}

const getInventoryForEditorial = (image) => {
  return new Promise((resolve, reject) => {
    getRecommendationsForImageUrl(image, (err, data) => {
        if (err) reject(err);
        else resolve(data)
      })
    })
}

module.exports = {getSavedEditorial, saveScrapedEditorial, getInventoryForEditorial}
