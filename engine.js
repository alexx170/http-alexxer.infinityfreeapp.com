const express = require('express');
const axios = require('axios');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define a route
app.get('/posts', async (req, res) => {
  try {
    // Fetch data from WordPress
    const response = await axios.get('https://alexxer.Infinityfreeapp.com');
    // Render the EJS template with the data
    res.render('posts', { posts: response.data });
  } catch (error) {
    console.error('Error fetching data from WordPress:', error);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
