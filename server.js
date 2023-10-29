// server.js

const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Serve static files (e.g., HTML, CSS) from a "public" directory

// Handle GET request for "/login" to show the username input form
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Handle POST request for "/login" to store the username in local storage and redirect to the main chat page
app.post('/login', (req, res) => {
  const { username } = req.body;
  res.cookie('username', username); // Store the username in a cookie
  res.redirect('/');
});

// Handle GET request for "/" to show the chat interface
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

// Handle POST request to store messages in a JSON file
app.post('/send', (req, res) => {
  const username = req.cookies.username;
  const message = req.body.message;
  
  // Read existing messages from the file
  let messages = [];
  try {
    const data = fs.readFileSync('messages.json', 'utf8');
    messages = JSON.parse(data);
  } catch (err) {
    // If the file doesn't exist or is empty, start with an empty array
  }

  // Add the new message to the array
  messages.push({ username, message });

  // Write the updated array back to the file
  fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));

  res.json({ status: 'Message sent successfully' });
});

// Handle GET request to retrieve and display messages
app.get('/messages', (req, res) => {
  let messages = [];
  try {
    const data = fs.readFileSync('messages.json', 'utf8');
    messages = JSON.parse(data);
  } catch (err) {
    // If the file doesn't exist or is empty, return an empty array
  }

  res.json(messages);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
