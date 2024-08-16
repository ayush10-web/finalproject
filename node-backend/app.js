const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define a schema and model for the collection
const exampleSchema = new Schema({
  name: String,
  age: Number
});
const Example = mongoose.model('Example', exampleSchema);

// Route to fetch all documents from the example collection
app.get('/api/ayushdb', async (req, res) => {
  try {
    const data = await Example.find();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error retrieving data from MongoDB');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
