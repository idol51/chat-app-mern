const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log('Database Connected Successfully!'))
    .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use(cors());


const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
})

require('./utils/socket')(io);

