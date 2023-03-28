// Using MongoDB to persist account credentials and allow users to sign up and log in:
// Create a MongoDB database to store user account information.
// Use a server-side framework like Express to handle authentication and route requests to the appropriate server-side functions.
// Implement a user registration and login system using Passport.js.
// Hash and salt user passwords using bcrypt to ensure secure storage.



// Import required modules
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;

// Set up MongoDB connection
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

// Set up passport local strategy for authentication
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    if (!user.verifyPassword(password)) { return done(null, false); }
    return done(null, user);
  });
}));

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Set up express app and middleware
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('express-session')({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Set up routes for user authentication
app.post('/signup', (req, res) => {
  const newUser = new User({ username: req.body.username, password: bcrypt.hashSync(req.body.password, 10) });
  newUser.save((err) => {
    if (err) { return res.json({ success: false, message: 'Failed to create user.' }); }
    return res.json({ success: true, message: 'User created successfully.' });
  });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  return res.json({ success: true, message: 'Authentication successful.' });
});

app.get('/logout', (req, res) => {
  req.logout();
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// Start server
app.listen(3000, () => console.log('Server started on port 3000.'));
