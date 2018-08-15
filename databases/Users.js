var mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost/users';

// Connect Mongoose to our local MongoDB via URI specified above and export it below
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mongoDB - users database");
});

let userSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  username: String,
  password: String,
  email: String
});

let User = mongoose.model('User', userSchema);

let saveUser = (username, password, email) => {
  let newUser = new User({
    username: username,
    password: password,
    email: email
  });

  newUser.save((err) => {
    if (err) console.log('Error in database save function');
    else console.log('Successfully saved data');
  });
}

module.exports = {
  db,
  saveUser
}

