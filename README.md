# [Ada](http://18.222.219.218:4000/)
**An AI powered fashion stylist and retail aggregator offering clothing recommendations based on user submitted images**

Ada helps connect fashion with retailers. From bloggers to celebrities, it is increbibily easy to find fashion inspiration. 
However, finding clothing that matches that style can be a bit trickier. To help users navigate their shopping experience, 
Ada recommends inventory based on similar styles and colors. :high_heel: :tophat:


![https://media.giphy.com/media/XHyauDwmcBFsDhQfAf/giphy.gif](https://media.giphy.com/media/XHyauDwmcBFsDhQfAf/giphy.gif)

**How it works :mag_right:**

Images in the form of a JPEG or URL are passed through a TensorFlow model that tags clothing based on color 
and characteristic. For example, an image of a tux would receive tags like "black tuxido" and "white shirt". 
The TensorFlow model was trained with thousands of images to try to cover the most popular styles. Currently, 
it supports men styles. 

Major stores such as Macys, Zara and Bloomingdales were scraped for clothings and saved in a Mongo database. In order 
to enable a quick search by tagged characteristics, pairs of inventory ids and tags (i.e. black shirt, gray shoes) were indexed in a Mongo database. 
When a user's image is tagged with characterists, the server then searches the index database for matching inventory. 

**Learnings**

Learning to manipulate images and large sets of data was a fun challenge! I also enjoyed creating the React components 
on the home and search page. Using a webscrapper like Puppeteer JS to pull editorial stories for the home page was a great exercise to understand headless browsers.

The challenge of manually teaching a TensorFlow model made it difficult to include all possible style combination. 
Even after feeding it thousands of photos, it still returns off charactertics for obscure images.  Another consideration to make it sustainable would be to add a service
worker that periodically runs in order to keep inventory up to date.

Curious to test it out? Click [here](http://18.222.219.218:4000/) and try feeding it this image: 
https://www.footjoy.com/Community/resized-image.ashx/__size/640x0/__key/communityserver-discussions-components-files/11/2705.2018.png

## Core Tech Stack


Express, Puppeteer JS, React, React Router 4, MongoDB, Mongoose, AWS S3, TensorFlow 

**Team Members**

[Jack Lim](https://github.com/thecodingjack)

[David Kim](https://github.com/Chronobreak)

[Jon Izak](https://github.com/jonizak)
