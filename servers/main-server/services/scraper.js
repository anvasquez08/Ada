const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
var cheerio = require('cheerio');
var model = require('./db/model')

var googleScrape = (req,res)=>{
  var colors = ['white', 'black', 'blue', 'green', 'yellow', 'red', 'orange', 'purple', 'pink', 'gray']
  var clothings = ['shirt', 'pants', 'jeans', 'hoodie', 'jacket', 'shorts', 'hat', 'socks', 'dress', 'shoes']
  var keywords = []
  colors.forEach(color=>clothings.forEach(clothing=> keywords.push(`${color} ${clothing}`)))
  var results = []
  var entry = `https://images.google.com/`
  keywords.reduce(function(accumulator, keyword) {
    var tags = keyword.split(" ")
    return accumulator.then(function() {
      return nightmare.goto(entry)
        .wait('body')
        .type('#lst-ib', `${keyword}\u000d`)
        .evaluate(()=> (document.querySelector('body').innerHTML))
        .then((html)=>{
          var $ = cheerio.load(html);
          $('.rg_meta').filter((i,el)=>{
            var data = $(el)
            var json = JSON.parse(data.text())
            var imageUrl = json.ou
            var visitUrl = json.ru
            if(visitUrl) results.push({visitUrl,imageUrl})
            model.saveItem({tags,imageUrl,visitUrl},(err,result)=>{
              console.log(result)
            })
          })
        })
    });
  }, Promise.resolve([])).then(()=>res.send(results));
}

var getByTags = (req,res)=>{
  var tags = req.query.q.toLowerCase().split(" ")
  console.log(tags)
  model.getByTags(tags,(err,results)=>{
    res.send(results)
  })
}

module.exports = {
  googleScrape,
  getByTags
};