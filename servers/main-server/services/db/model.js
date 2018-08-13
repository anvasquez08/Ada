// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// // let {DBURL} = require('../../../../config')

// mongoose.connect(DBURL);
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("db connected")
// });

// let itemSchema = new Schema({
//   tags: [String],
//   imageUrl: {type: String, unique: true, sparse:true},
//   visitUrl: {type: String, unique: true, sparse:true},
// })

// let Item = mongoose.model('item', itemSchema)

// let saveItem = ({tags, imageUrl, visitUrl}, cb)=>{
//   new Item({tags,imageUrl,visitUrl}).save()
//     .then(item=>cb(null,item))
// }

// module.exports = {
//   saveItem
// }