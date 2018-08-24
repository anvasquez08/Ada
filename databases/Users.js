var mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost/users';

// Connect Mongoose to our local MongoDB via URI specified above and export it below
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to users database.");
});

let userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  // password: String,
  // email: String,
  history: {type: [String], default: []},
  favorites: {type: [String], default: []},
  age: {type: Number, default: 0},
  gender: {type: String, default: 'F'}
});

let User = mongoose.model('User', userSchema);

let saveUser = (username) => {
  console.log('SAVING USER', username);
  let newUser = new User({
    username: username
    // password: password,
    // email: email,
    // age: age,
    // gender: gender
  });

  newUser.save((err) => {
    if (err) console.log('Error creating new user', err);
    else console.log('Successfully saved data');
  });
}

let addHistoryToUser = (username, history) => {
  User.findOneAndUpdate({username: username}, {$push: {history: history}}, (err) => {
    if (err) {
      console.log('ERR ADDING HISTORY TO USER', err)
    }
  });
}

let addFavoriteToUser = (username, favorite) => {
  User.findOneAndUpdate({username: username}, {$push: {favorites: favorite}}, (err) => {
    if (err) {
      console.log('ERR ADDING FAVORITE TO USER', err)
    }
  });
}

let getUser = (username, callback) => {
  User.findOne({username: username}, (err, foundUser) => {
    if (err) {
      callback(err);
    } else {
      callback(null, foundUser);
    }
  })
}

module.exports = {
  db,
  saveUser,
  addHistoryToUser,
  addFavoriteToUser,
  getUser
}

