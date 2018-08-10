const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
var cheerio = require('cheerio');

var googleScrape = (req,res)=>{
  var results = []
  var keyword = req.query.q
  var entry = `https://images.google.com/`
  nightmare
    .goto(entry)
    .type('#lst-ib', `${keyword}\u000d`)
    .evaluate(()=> (document.querySelector('body').innerHTML))
    .then((html)=>{
      var $ = cheerio.load(html);
      $('.rg_meta').filter((i,el)=>{
        var data = $(el)
        var json = JSON.parse(data.text())
        var shopUrl = json.ru
        var imageUrl = json.ou
        if(shopUrl) results.push({shopUrl,imageUrl})
      })
      res.send(results)
    })
}

module.exports = {
  googleScrape
};