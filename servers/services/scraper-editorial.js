const puppeteer = require('puppeteer')
const {saveScrapedEditorial} = require('../../databases/models_edit.js')
// const {getEditorialRecommendations} = require('../recommendations/service/editorial.js')

let memo = {
  popsugar: ['body > div.body-container > div.feature-section.clearfix.ikb.vertical > div.clearfix > a:nth-child(1) > div.hero-content > div.hero-title',
  'body > div.body-container > div.feature-section.clearfix.ikb.vertical > div.clearfix > a:nth-child(2) > div.hero-content > div.hero-title', 
  'body > div.body-container > div.feature-section.clearfix.ikb.vertical > div.clearfix > a:nth-child(3) > div.hero-content > div.hero-title,',
  'body > div.body-container > div.feature-section.clearfix.ikb.vertical > div.clearfix > a:nth-child(4) > div.hero-content > div.hero-title', 
  'body > div.body-container > div.feature-section.clearfix.ikb.vertical > div.featured-post > a > div.top-story-info > div.top-story-title'
]
}

var popsugar1 = async (req,res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.popsugar.com/fashion/') 
  await page.click('body > div.body-container > div.feature-section.clearfix.ikb.vertical > div.featured-post > a > div.top-story-info > div.top-story-title');
  await page.waitFor(2000);

  /* FETCH TITLE AND PARAGRAPH TEXT */
  const titleDescription = await page.evaluate(() => {
    let title = document.querySelector('h2').innerText;
    let paragraph = document.querySelector('.body-wrap').innerText;

    // let paragraph = document.querySelector('.body-wrap').innerText.substring(0, 600);
    return [{title}, {paragraph}]
  });
  await page.waitFor(2000);

  /* FETCH SOURCE AND IMAGE FROM GALARY */
  // await page.click('#slide-container > div > div.contents > img') // WORKS
  await page.click('#start-slideshow')
  const image1 = await page.evaluate(() => {
    let source = document.querySelector('#photo-source').innerText || null;
    let numOfImages = document.querySelector('.slide-count').innerText || null;
    let image = document.querySelector('#slide-container img').getAttribute('src') || null

    // let arr = numOfImages.split('of ')
    // let num =  arr[arr.length - 1] * 1
    return {source, numOfImages, image}
  });

  await page.waitFor(2000);
  await page.keyboard.press('ArrowRight');

  const image2 = await page.evaluate(() => {
    let source = document.querySelector('#photo-source').innerText || null;
    let numOfImages = document.querySelector('.slide-count').innerText || null;
    let image = document.querySelector('#slide-container img').getAttribute('src') || null

    return {source, numOfImages, image}
  });

  await page.keyboard.press('ArrowRight');
  const image3 = await page.evaluate(() => {
    let source = document.querySelector('#photo-source').innerText || null;
    let numOfImages = document.querySelector('.slide-count').innerText || null;
    let image = document.querySelector('#slide-container img').getAttribute('src') || null

    return {source, numOfImages, image}
  });
  await page.waitFor(2000);

  await page.keyboard.press('ArrowRight');
  const image4 = await page.evaluate(() => {
    let source = document.querySelector('#photo-source').innerText || null;
    let numOfImages = document.querySelector('.slide-count').innerText || null;
    let image = document.querySelector('#slide-container img').getAttribute('src') || null

    return {source, numOfImages, image}
  });
  await page.waitFor(2000);

  await page.keyboard.press('ArrowRight');
  const image5 = await page.evaluate(() => {
    let source = document.querySelector('#photo-source').innerText || null;
    let numOfImages = document.querySelector('.slide-count').innerText || null;
    let image = document.querySelector('#slide-container img').getAttribute('src') || null

    return {source, numOfImages, image}
  });

  browser.close();

  let photoObj = {images: [image1, image2, image3, image4, image5]}
  titleDescription.push(photoObj)
  return titleDescription;
}

popsugar1().then((value) => {
  console.log('here')
  saveScrapedEditorial(value, 'POPSUGAR')
  }
)



module.exports = {
  popsugar1
};
