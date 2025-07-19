const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());

// app listen and created server
app.listen( PORT ,() => {
    console.log(`Server is runinng in this port : ${PORT}`);
});