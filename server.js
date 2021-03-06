const express = require('express'); // Express middleware for routing
const cors = require('cors');
// const Grid = require('gridfs-stream');
// Help us connect to MongoDB database
const mongoose = require('mongoose');
const path = require('path');

// allows us to have environment variable in .env file
require('dotenv').config();

//How to create express server with port
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// allow us to parse json, we're sending and recieving server
app.use(express.json());

// Router to different collection defined by files in router folders
const goalsRouter = require('./server/routers/goals');
const blogRouter = require('./server/routers/blog');
const interestRouter = require('./server/routers/interest');
const wishListRouter = require('./server/routers/wish-list');
const adminRouter = require('./server/routers/admin');

// const resumePage = require('./client/src/components/resume/resume')
// Using these routers
// app.use('/resume', resumePage)
app.use('/admin', adminRouter)
app.use('/goals', goalsRouter);
app.use('/blog', blogRouter);
app.use('/interest', interestRouter);
app.use('/wish-list', wishListRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send("development running!")
    })
}



const uri = process.env.MONGODB_URI;

// URI is where database is stored, the properties set in the 2nd argument is to make it easier to access MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

// let gfs; // Grif FS for storing images

// Mongo Connection
const connection = mongoose.connection;
connection.once('open', () => {
    // gfs = Grid(connection.db, mongoose.mongo);
    // gfs.collection("photos");

    console.log("MongoDB database connection established successfully!");
})

// This is how we start a server with a port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})