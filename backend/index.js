const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

// api connection
app.use('/api' , router);

// app listen and created server
app.listen( PORT ,() => {
    console.log(`Server is runinng in this port : ${PORT}`);
});