
const primaryRouter = require('express').Router();
const axios = require('axios')
const path = require('path');
// const recommendationRouter = require('./routes/recommendationRoutes');
const imageUpload = require('../imageUpload/uploadToBucket.js');
const userDB = require('../../databases/Users.js')
const recWorker = require('../recommendations/worker/recommendationWorker.js')
const recommendationService = require('../recommendations/service/imageTraits');
const helpers = require('../../databases/helpers.js');
const {getSavedEditorial, getInventoryForEditorial} = require('../../databases/models_edit.js');
const async = require('async');
const {getRecommendationsForImageUrl} = require('../recommendations/service/imageTraits.js')
const { NGROKURL } = require('../../config.js')
const labelsTable = require('../labels.js')
const scraper = require('../services/scraper.js')

const tuxes = [
    {
        "_id": {
            "$oid": "5b8468d42f3a543f4333e26e"
        },
        "labels": [
            "black",
            "suit-vest"
        ],
        "name": "HUGO Aylor Herys Tuxedo - Slim Fit",
        "brandName": "Bloomingdale's",
        "url": "https://www.bloomingdales.com/shop/product/hugo-aylor-herys-tuxedo-slim-fit?ID=1119498&CategoryID=3864#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D3156%26cm_kws%3Dmen%20black%20suit-vest%26spp%3D8%26pn%3D1%7C33%7C8%7C3156%26rsid%3Dundefined%26smp%3DpartialMatch",
        "imageUrl": "https://images.bloomingdalesassets.com/is/image/BLM/products/8/optimized/8626898_fpx.tif",
        "price": 895,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-27T21:10:44.969Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b8468d42f3a543f4333e26f"
        },
        "labels": [
            "black",
            "suit-vest"
        ],
        "name": "BOSS Stars Glamour Regular Fit Tuxedo",
        "brandName": "Bloomingdale's",
        "url": "https://www.bloomingdales.com/shop/product/boss-stars-glamour-regular-fit-tuxedo?ID=785175&CategoryID=3864#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D3156%26cm_kws%3Dmen%20black%20suit-vest%26spp%3D9%26pn%3D1%7C33%7C9%7C3156%26rsid%3Dundefined%26smp%3DpartialMatch",
        "imageUrl": "https://images.bloomingdalesassets.com/is/image/BLM/products/8/optimized/9302918_fpx.tif",
        "price": 795,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-27T21:10:44.970Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://greenweddingshoes.com/wp-content/uploads/2016/03/xedo-04.jpg",
        "price": 850,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://i1.wp.com/theblacktux.com/blog/wp-content/uploads/2017/09/ShawlLapel.jpg?w=1800&ssl=1",
        "price": 495,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://i0.wp.com/theblacktux.com/blog/wp-content/uploads/2017/09/DoubleBreastedTux.jpg?w=1800&ssl=1",
        "price": 529,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/18/_103851878.jpg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=2&quality=60",
        "price": 495,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/10/_11082230.jpg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=2&quality=60",
        "price": 700,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://media.yoox.biz/items/49/49284378xe_15_f.jpg",
        "price": 1695,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://images.menswearhouse.com/is/image/TMW/MW40_360M_10_PRONTO_UOMO_EV_FORMAL_SET?$40MainPDP$",
        "price": 950,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://images.menswearhouse.com/is/image/TMW/MW40_30X1_10_CALVIN_KLEIN_FORMAL_SET?$40MainPDP$",
        "price": 690,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://images.menswearhouse.com/is/image/TMW/MW40_11WP_66_KENNETH_COLE_NEW_YORK_CHARCOAL_PURPLE_PLAID_SET?$40MainPDP$",
        "price": 1050,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/9/_12079309.jpg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=2&quality=60",
        "price": 599,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/9/_12079309.jpg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=2&quality=60",
        "price": 699,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/5/_103261445.jpg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=2&quality=60",
        "price": 700,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5b86eb939d020482843b559f"
        },
        "labels": [
            "black",
            "dress-shirt"
        ],
        "name": "AlfaTech by Alfani Men's Athletic Fit Bedford Cord Dress Shirt, Created For Macy's Limited-Time Special $60.00 Sale $21.99 . Free ship at $49 Enjoy Free Shipping at $49! See exclusions. Free ship at $49 more like this",
        "brandName": "Macy's",
        "url": "https://www.macys.com/shop/product/alfatech-by-alfani-mens-athletic-fit-bedford-cord-dress-shirt-created-for-macys?ID=6524750&CategoryID=20635#fn=sp%3D1%26spc%3D89%26ruleId%3D75%26kws%3Dmen%20black%20dress-shirt%26searchPass%3DexactMultiMatch%26slotId%3D7",
        "imageUrl": "https://slimages.macysassets.com/is/image/MCY/products/2/optimized/9758792_fpx.tif",
        "price": 99,
        "gender": 0,
        "timestamp": {
            "$date": "2018-08-29T18:53:07.376Z"
        },
        "__v": 0
    }]


// primaryRouter.get('/scrape', scraper.scrape.bind(this,'bloomingdales'))
const dresses= [{
  "_id": {
      "$oid": "5b8467dd3acd203f13a6c760"
  },
  "labels": [
      "pink",
      "dress"
  ],
  "name": "GOAT Georgiana bow-trim cady dress",
  "brandName": "Bloomingdale's",
  "url": "https://www.matchesfashion.com/us/products/Goat-Georgiana-bow-trim-cady-dress-1227766",
  "imageUrl": "https://assetsprx.matchesfashion.com/img/product/1044/1227766_1.jpg",
  "price": 573,
  "gender": 1,
  "timestamp": {
      "$date": "2018-08-27T21:06:37.291Z"
  },
  "__v": 0
},
{
  "_id": {
      "$oid": "5b8467dd3acd203f13a6c760"
  },
  "labels": [
      "pink",
      "dress"
  ],
  "name": "Tyler Off the Shoulder Scuba Crepe Dress",
  "brandName": "Bloomingdale's",
  "url": "https://www.matchesfashion.com/us/products/Goat-Georgiana-bow-trim-cady-dress-1227766",
  "imageUrl": "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/9/_102877789.jpg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=2&quality=60",
  "price": 789,
  "gender": 1,
  "timestamp": {
      "$date": "2018-08-27T21:06:37.291Z"
  },
  "__v": 0
},
{
  "_id": {
      "$oid": "5b8467dd3acd203f13a6c760"
  },
  "labels": [
      "pink",
      "dress"
  ],
  "name": "Roland Mouret",
  "brandName": "Bloomingdale's",
  "url": "https://www.matchesfashion.com/us/products/Goat-Georgiana-bow-trim-cady-dress-1227766",
  "imageUrl": "https://static.orchardmile.us/resized/roland-mouret/900/61938203690f355bd547627a6ee46b6eb7a4c018.jpg",
  "price": 1098,
  "gender": 1,
  "timestamp": {
      "$date": "2018-08-27T21:06:37.291Z"
  },
  "__v": 0
},
{
  "_id": {
      "$oid": "5b8467dd3acd203f13a6c760"
  },
  "labels": [
      "pink",
      "dress"
  ],
  "name": "Glenda cady wrap dress",
  "brandName": "Bloomingdale's",
  "url": "https://www.matchesfashion.com/us/products/Goat-Georgiana-bow-trim-cady-dress-1227766",
  "imageUrl": "https://assetsprx.matchesfashion.com/img/product/1216525_1_large.jpg",
  "price": 498,
  "gender": 1,
  "timestamp": {
      "$date": "2018-08-27T21:06:37.291Z"
  },
  "__v": 0
},
{
  "_id": {
      "$oid": "5b8467dd3acd203f13a6c760"
  },
  "labels": [
      "pink",
      "dress"
  ],
  "name": "Off the Shoulder Sheath Dress",
  "brandName": "Nordstrom",
  "url": "https://www.matchesfashion.com/us/products/Goat-Georgiana-bow-trim-cady-dress-1227766",
  "imageUrl": "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/18/_102727958.jpg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=2&quality=60",
  "price": 1259,
  "gender": 1,
  "timestamp": {
      "$date": "2018-08-27T21:06:37.291Z"
  },
  "__v": 0
},
{
  "_id": {
      "$oid": "5b8467dd3acd203f13a6c760"
  },
  "labels": [
      "pink",
      "dress"
  ],
  "name": "Popover Midi Dress",
  "brandName": "Nordstrom",
  "url": "https://www.matchesfashion.com/us/products/Goat-Georgiana-bow-trim-cady-dress-1227766",
  "imageUrl": "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/8/_103185568.jpg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=2&quality=60",
  "price": 573,
  "gender": 1,
  "timestamp": {
      "$date": "2018-08-27T21:06:37.291Z"
  },
  "__v": 0
},{
  "_id": {
      "$oid": "5b8467dd3acd203f13a6c760"
  },
  "labels": [
      "pink",
      "dress"
  ],
  "name": "Off the Shoulder Midi Dress",
  "brandName": "Nordstrom",
  "url": "https://www.matchesfashion.com/us/products/Goat-Georgiana-bow-trim-cady-dress-1227766",
  "imageUrl": "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/10/_103165370.jpg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=2&quality=60",
  "price": 573,
  "gender": 1,
  "timestamp": {
      "$date": "2018-08-27T21:06:37.291Z"
  },
  "__v": 0
},{
  "_id": {
      "$oid": "5b8467dd3acd203f13a6c760"
  },
  "labels": [
      "pink",
      "dress"
  ],
  "name": "Siren - Nappa",
  "brandName": "Nordstrom",
  "url": "https://www.matchesfashion.com/us/products/Goat-Georgiana-bow-trim-cady-dress-1227766",
  "imageUrl": "https://cdn.shopify.com/s/files/1/1103/4464/products/Siren_105_Blush_Nappa_Pump_PDP_1_SIDE_1680x.jpg?v=1533409435",
  "price": 450,
  "gender": 1,
  "timestamp": {
      "$date": "2018-08-27T21:06:37.291Z"
  },
  "__v": 0
},{
  "_id": {
      "$oid": "5b8467dd3acd203f13a6c760"
  },
  "labels": [
      "pink",
      "dress"
  ],
  "name": "BB Pump",
  "brandName": "Bloomingdale's",
  "url": "https://www.matchesfashion.com/us/products/Goat-Georgiana-bow-trim-cady-dress-1227766",
  "imageUrl": "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/8/_103063128.jpg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838&dpr=2&quality=60",
  "price": 670,
  "gender": 1,
  "timestamp": {
      "$date": "2018-08-27T21:06:37.291Z"
  },
  "__v": 0
},{
  "_id": {
      "$oid": "5b8467dd3acd203f13a6c760"
  },
  "labels": [
      "pink",
      "dress"
  ],
  "name": "IDYLLE - Earring Silver, La Rose, Diamonds",
  "brandName": "Nordstrom",
  "url": "https://www.matchesfashion.com/us/products/Goat-Georgiana-bow-trim-cady-dress-1227766",
  "imageUrl": "http://vanessa-tugendhaft.com/5127-thickbox_default/idylle-earring-la-rose-diamonds.jpg",
  "price": 573,
  "gender": 1,
  "timestamp": {
      "$date": "2018-08-27T21:06:37.291Z"
  },
  "__v": 0
},{
  "_id": {
      "$oid": "5b8467dd3acd203f13a6c760"
  },
  "labels": [
      "pink",
      "dress"
  ],
  "name": "IDYLLE - Necklace La Rose Prestige, Diamonds",
  "brandName": "Nordstrom",
  "url": "https://www.matchesfashion.com/us/products/Goat-Georgiana-bow-trim-cady-dress-1227766",
  "imageUrl": "http://vanessa-tugendhaft.com/7533-thickbox_default/idylle-necklace-la-rose-xl-diamonds.jpg",
  "price": 573,
  "gender": 1,
  "timestamp": {
      "$date": "2018-08-27T21:06:37.291Z"
  },
  "__v": 0
},{
  "_id": {
      "$oid": "5b8467dd3acd203f13a6c760"
  },
  "labels": [
      "pink",
      "dress"
  ],
  "name": "Organic Crunch Linen Modern Tea Dress",
  "brandName": "Theory",
  "url": "https://www.matchesfashion.com/us/products/Goat-Georgiana-bow-trim-cady-dress-1227766",
  "imageUrl": "https://i1.adis.ws/i/theory/TH_I0303623_W4V_L0?$TH-pdp-desktop$",
  "price": 800,
  "gender": 1,
  "timestamp": {
      "$date": "2018-08-27T21:06:37.291Z"
  },
  "__v": 0
}
]
// server.express.get('/tags', scraper.getByTags)

primaryRouter.post('/index', function(req, res) {
    let url = 'http://greenwoodhypno.co.uk/wp-content/uploads/2014/09/test-image.png'
    let testID = 999;
    recWorker.indexAnalyzeInventoryItem(testID, url, (err) => {   
      imageUpload.uploadImage(username, imageFile, (err, imageUrl) => {
          if (err) {
              res.send(err)
          } else {
              res.send('success');
              res.status(200).send(imageUrl);
          }
      });
    })
  })
  
  // //Adds inventoryId to users favorites
  
primaryRouter.post('/favorites/:user/:inventoryId', (req,res) => {
    let username = req.params.user;
    let inventoryId = req.params.inventoryId;
    userDB.addFavoriteToUser(username, inventoryId);
})
  
  // //returns user's favorites
  
//   primaryRouter.get('/favorites/:user', (req,res) => { 
//       let username = req.params.user;
  
//       userDB.getUser(username, (err, userProfile) => {
//       imageUpload.uploadImage(null, imageFile, (err, imageUrl) => {
//           if (err) {
//               res.status(500).send(err);
//           } else {
//               res.status(200).send(imageUrl);
//           }
//       })
//   })
//   })
  
// primaryRouter.post('/upload', (req,res) => {
    
//   let imageFile = req.files.file;
//   console.log("Console logging imageFile from /upload: ", imageFile);
  
//   imageUpload.uploadImage(null, imageFile, (err, imageUrl) => {
//       if (err) {
//           res.status(500).send(err);
//       } else {
//           res.status(200).send(imageUrl);
//       }
//   })
// })
  
  // User uploads image. Saves image, adds image to user's history
// primaryRouter.post('/upload/:user', (req,res) => {
//     let username = req.params.user;
//     let imageFile = req.files.file;
//     imageUpload.uploadImage(username, imageFile, (err, imageUrl) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             console.log("Console logging imageUrl: ",imageUrl);
//             res.status(200).send(imageUrl);
//         }
//     })
// })
  
  // //Adds inventoryId to users favorites
primaryRouter.post('/favorites/:user/:inventoryId', (req,res) => {
    let username = req.params.user;
    let inventoryId = req.params.inventoryId;
    userDB.addFavoriteToUser(username, inventoryId);
    res.status(200).send('hope this saved. clean me up later');
})
  
  
  // //returns user's favorites
primaryRouter.get('/favorites/:user', (req,res) => { 
    let username = req.params.user;

    userDB.getUser(username, (err, userProfile) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (userProfile === null) {
                res.status(400).send('User not found');
            }
            helpers.inventoryItemsWithIds(userProfile.favorites, (err, favorites) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send(favorites);
                }
            })
        }
    })
})
  
  // //Adds inventoryId to users favorites
primaryRouter.post('/instahistory/:user', (req,res) => {
    let username = req.params.user;
    let inventoryIDs = req.body.photos;
    console.log('username', username);
    console.log('inventoryIds', inventoryIDs);
    inventoryIDs.forEach(photoUrl => {
        userDB.addHistoryToUser(username, photoUrl);
    });
    res.status(200).send('hope these saved. clean me up later')
})

//return user's image upload history
primaryRouter.get('/history/:user', (req,res) => { 
    console.log('GETTING HISTORY')
    let username = req.params.user;

    userDB.getUser(username, (err, userProfile) => {
        if (userProfile === null) {
            res.status(400).send('User not found');
        }
        res.status(200).send(userProfile.history);
    });
});

//   primaryRouter.post('/recommend', function(req, res) {
//     console.log('recommend params');
//     if (typeof req.body.params === 'string') {
//         console.log("Receiving URL, proceeding to get recommendations from Image URL")
//         let imageUrl = req.body.params
//         recommendationService.getRecommendationsForImageUrl(imageUrl, (err, recommendations) => {
//             if (err) {
//                 console.log("Error getting recommendations using image URL", err)
//                 res.status(500).send();
//             } else {
//                 res.status(200).send(recommendations);
//             }
//         })
//     } 
//   });

primaryRouter.post('/recommendinsta', (req, res) => {
  let aggregateLabels = []; // using this later, when aggregating labels
  let instagramPhotos = req.body.params;
  for (var i = 0; i < 1; i++) {
      recommendationService.getRecommendationsForImageUrl(instagramPhotos[i], (err, recommendations) => {
          if (err) {
              console.log("Error getting recommendations using image URL", err)
              res.status(500).send();
          } else {
              aggregateLabels.push(recommendations);
          //   console.log("Console logging recommendations length: ", recommendations.length)
          //   // res.status(200).send(recommendations);
          //   console.log("Console logging aggregateLabels length", aggregateLabels.length )
          //   res.status(200).send();
              console.log(aggregateLabels);
              res.send(recommendations);
          }
      })
  }
});
  
//   primaryRouter.post('/recommend/:user', function(req, res) {
//       let username = req.params.user;
//       if (typeof req.body.params === 'string') {
//           let imageUrl = req.body.params
//           recommendationService.getRecommendationsForImageUrl(imageUrl, (err, recommendations) => {
//               if (err) {
//                   console.log("Error getting recommendations using image URL", err)
//                   res.status(500).send();
//               } else {
//                   if (username) {
//                       userDB.addHistoryToUser(username, imageUrl);
//                   }
//                   res.status(200).send(recommendations);
//               }
//           })
//       } 
//   });
  
  // //using this endpoint starts the recommendation worker: checks inventory for new items to add to recommendation DB.
  // //TODO: Run worker occasionally instead of running this test endpoint
primaryRouter.post('/update', function(req, res) {
    recWorker.updateIndexDB((err) => {
        if (err) {
            console.log("Console logging error in /update: ", err);
        }
    });
});

primaryRouter.get('/upload2', function(req, res) {
  console.log('upload2')
  res.send(dresses)
});

primaryRouter.post('/send', (req,res) => {

  let body
  if(req.files && req.files.image) body = {image: req.files.image}
  if(req.body.imageUrl) body = {imageUrl: req.body.imageUrl}
  axios.post(NGROKURL,body)
  .then(({data})=>{
    let label = Object.keys(data).reduce(function(a, b){ return data[a] > data[b] ? a : b }).split(" ").join("-")
    console.log("Console logging labels destructured from /send: ", {label})
    recommendationService.getRecommendationsFromLabels(label, (err, recommendations, occurenceObject) => {
      if (err) return res.send(err)
      recommendationService.inventoryFromRecommendations(recommendations, occurenceObject, (err, inventories) => {
        if (err) return res.send(err)
          if(req.body.imageUrl){
            userDB.addHistoryToUser(req.body.username, req.body.imageUrl) //urlupload
          } else {
            imageUpload.uploadImage(req.body.username, req.files.image, (err,link)=>console.log(err,link)) //fileupload
          }
          //res.send(inventories);
      })
    })
  })

  setTimeout(() => {
    res.send(tuxes);
  })

})

primaryRouter.post('/send2', (req,res) => {

    let body
    if(req.files && req.files.image) body = {image: req.files.image}
    if(req.body.imageUrl) body = {imageUrl: req.body.imageUrl}
    axios.post(NGROKURL,body)
    .then(({data})=>{
      let label = Object.keys(data).reduce(function(a, b){ return data[a] > data[b] ? a : b }).split(" ").join("-")
      console.log("Console logging labels destructured from /send: ", {label})
      recommendationService.getRecommendationsFromLabels(label, (err, recommendations, occurenceObject) => {
        if (err) return res.send(err)
        recommendationService.inventoryFromRecommendations(recommendations, occurenceObject, (err, inventories) => {
          if (err) return res.send(err)
            if(req.body.imageUrl){
              userDB.addHistoryToUser(req.body.username, req.body.imageUrl) //urlupload
            } else {
              imageUpload.uploadImage(req.body.username, req.files.image, (err,link)=>console.log(err,link)) //fileupload
            }
            //res.send(inventories);
        })
      })
    })
  
    setTimeout(() => {
      res.send(tuxes);
    })
  
  })

  // primaryRouter.post('/send2', (req,res) => {
  //   res.send(dresses)
  // })

primaryRouter.get('/latestProds', (req, res) => {
  helpers.retrievelast30items((err, data) => {
    if (err) res.sendStatus(404)
    else res.send(data)
  })
})


primaryRouter.get('/trends', (req, res) => {
  let res1 = []
  getSavedEditorial()
  .then((totalEditorial) => {
    res1.push(totalEditorial)
    let promiseArr = []
    totalEditorial.forEach((editorial) => {
      editorial.images.forEach((image) => {        
      let singlePromise = new Promise((resolve, reject) => {
        getInventoryForEditorial(image.image)
        .then(data => resolve(data))
        .catch(err => reject(err))
      })   
      promiseArr.push(singlePromise)       
      })
    })
    return Promise.all(promiseArr)
  })
  .then((finalImageData) => {
    res1.push(finalImageData)
    res.send(res1)
  })
})

primaryRouter.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '../../../client/dist' +'/index.html'));

})

module.exports = primaryRouter;