// # Adding Google OAuth as an option to sign in:
// # Register your application with the Google API console and obtain a client ID and secret.
// # Use Passport.js to authenticate users using Google OAuth.
// # Add a "Login with Google" button to your application's login page that initiates the OAuth flow.

// # # Register your application with the Google API console and obtain a client ID and secret.
// # # Install the necessary packages:
// #  npm install passport-google-oauth20


// # Configure Passport.js to use Google OAuth:
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Use the profile information (e.g. name, email) to create or update a user account
    // Return the user object to the callback
  }
));


