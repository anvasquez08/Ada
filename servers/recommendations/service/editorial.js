const {getRecommendationsForImageUrl} = require('./imageTraits.js')

// Fetch inventory per image 
exports.getEditorialRecommendations = (args) => {
  const { images } = args[2]

  images.forEach((item) => {
    let { image } = item
    getRecommendationsForImageUrl(image, (err, response) => {
        if (err) {
          console.log(err)
        } else {
          item.iventory = response
        }
      })
    })
}

// exports.default = {getEditorialRecommendations}