// <!-- Deploying the application using Vercel:
// Sign up for a Vercel account.
// Use the Vercel CLI to deploy your application.
// Ensure that your MongoDB database is accessible from the deployed application. -->



// <!-- Install the Vercel CLI:
// npm install -g vercel

// Log in to your Vercel account using the CLI:
// vercel login

// In your project directory, run the following command to deploy your application:
// vercel -->

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

