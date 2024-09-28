const express = require('express');
const axios = require('axios');
const app = express();


// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define a route
app.get('/posts', async (req, res) => {
  try {
    // Fetch data from WordPress API (corrected URL)
    const response = await axios.get('https://www.alexxer.infinityfreeapp.com/');

    // Log the response to inspect its structure
    console.log(response.data);

    // Assuming the response contains an array of posts, adjust the structure accordingly.
    // For example, if posts are in response.data.posts, change this line:
    const posts = response.data.posts || []; // Use the correct path to posts array
    
    // Render the EJS template with the data
    res.render('posts', { posts });
  } catch (error) {
    console.error('Error fetching data from https://www.alexxer.infinityfreeapp.com/:', error);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
