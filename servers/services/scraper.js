const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
var cheerio = require('cheerio');
const puppeteer = require('puppeteer')
var model = require('../../databases/helpers')

let memo = {
  google:{
    entry: 'https://images.google.com/',
    searchInput: '#lst-ib',

  },
  bloomingdales:{
    entry: 'https://www.bloomingdales.com',
    brandName: "Bloomingdale's",
    searchInput: '.aboveNavSearchBox',
    product: '.productThumbnail',
    imgTag: 'img',
    imgUrlModifier: 'https://www.bloomingdales.com',
    nameTag: '.productDescription',
    priceTag: '.regular',
  },
  zara:{
    entry: 'https://www.zara.com/us/en/search',
    brandName: "Zara",
    searchInput: '#search-term',
    product: '._product',
    imgTag: '._img',
    imgUrlModifier: 'https:',
    nameTag: '.product-info-item-name',
    priceTag: '.product-info-item-price',
  },
  macys:{
    entry: 'https://www.macys.com',
    brandName: "Macy's",
    searchInput: '#globalSearchInputField',
    product: '.productThumbnail',
    imgTag: 'img',
    imgUrlModifier: 'https://www.macys.com',
    nameTag: '.productDescription',
    priceTag: '.regular',
  }
}

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
            var url = json.ru
            if(url) results.push({url,imageUrl})
            // model.saveItem({tags,imageUrl,url},(err,result)=>{
            //   console.log(result)
            // })
          })
        })
    });
  }, Promise.resolve([])).then(()=>res.send(results));
}


var scrape = async(site,req,res)=>{
  let target = memo[site]
  let { brandName, entry, searchInput, product, imgTag, imgUrlModifier, nameTag, priceTag} = target
  var colors = ['white', 'black', 'blue', 'green', 'yellow', 'red', 'orange', 'purple', 'pink', 'gray']
  var clothings = ['shirt', 'pants', 'jeans', 'hoodie', 'jacket', 'shorts', 'hat', 'socks', 'dress', 'shoes']
  var keywords = []
  colors.forEach(color=>clothings.forEach(clothing=> keywords.push(`${color} ${clothing}`)))
  var results = []
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  //bypass antiautomation test
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' + 
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
  await page.setUserAgent(userAgent);
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3, 4, 5],
    });
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
    window.chrome = {
      runtime: true
    };
    window.navigator.chrome = {
      runtime: true,
    };
    const originalQuery = window.navigator.permissions.query;
    return window.navigator.permissions.query = (parameters) => (
      parameters.name === 'notifications' ?
        Promise.resolve({ state: Notification.permission }) :
        originalQuery(parameters)
    );
  });

  await page.goto(entry);
  keywords.reduce((accumulator,keyword)=>{
    let labels = keyword.split(' ')
    return  accumulator.then(async()=>{
        
        await page.$(searchInput)
        await page.click(searchInput,{clickCount: 3})
        await page.keyboard.type(`${keyword}\u000d`)
        await page.waitForNavigation()
        await page.evaluate(async () => {
          await new Promise((resolve, reject) => {
            let totalHeight = 0
            let count = 0;
            let distance = 100
            let timer = setInterval(() => {
              let scrollHeight = document.body.scrollHeight
              window.scrollBy(0, distance)
              totalHeight += distance
              if(totalHeight >= scrollHeight || ++count >= 100){
                clearInterval(timer)
                resolve()
              }
            }, 30)
          })
        })
        if (await page.$('.shq_exit') !== null) await page.click('.shq_exit')
        // if (await page.$('.nextArrow') !== null) await page.click('.nextArrow')

        const bodyHandle = await page.$('body')
        const html = await page.evaluate(body => body.innerHTML, bodyHandle);
        var $ = cheerio.load(html);
        var results = []
        $(product).filter((i,el)=>{
          var data = $(el)
          var imageUrl = data.find(imgTag).first().attr('src')
          if(imageUrl){
            imageUrl = imageUrl.substring(0,imageUrl.indexOf('?'))
            if(imageUrl[0] === '/') imageUrl = imgUrlModifier + imageUrl
          }
          var name = data.find(nameTag).text().trim().replace(/\s\s+/g, ' ')
          var price = data.find(priceTag).text().match(/\d+\.\d\d/)[0]
          var url = data.find('a').first().attr('href')
          if (url && url[0] === '/') url = entry + url
          model.saveItem({name, brandName, url, imageUrl, price, labels},(err,result)=>{
            if(err) console.log(err)
            else console.log(result)
          })
        })
    })
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
  scrape
  // googleScrape,
  // bloomingScrape,
  // macyScrape,
  // getByTags
};