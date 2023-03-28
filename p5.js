// # Add a route for the Google OAuth callback:
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to the home page
    res.redirect('/');
  });



