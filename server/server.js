const express = require('express');
const cors = require('cors');
// Help us connect to MongoDB database
const mongoose = require('mongoose');

// allows us to have environment variable in .env file
require('dotenv').config();

//How to create express server with port
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// allow us to parse json, we're sending and recieving server
app.use(express.json());

const uri = process.env.CONNECTION_URI;
// URI is where database is stored, the properties set in the 2nd argument is to make it easier to access MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
})

const goalsRouter = require('./routers/goals');
const blogRouter = require('./routers/blog');
// const interestRouter = require('./routers/interest');
// const wishListRouter = require('./routers/wish-list');

app.use('/goals', goalsRouter);
app.use('/blog', blogRouter);
// app.use('/interest', interestRouter);
// app.use('/wish-list', wishListRouter);

// This is how we start a server with a port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})