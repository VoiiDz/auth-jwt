const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//IMPORT ROUTERS
const authRouter = require('./routers/auth');

dotenv.config();

//DB CONNECTION
mongoose.connect(process.env.DB_CONNECT, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('db connected')
);

//MIDDLEWARE
app.use(express.json());


//ROUTE MIDDLEWARE
app.use('/api/user', authRouter);

app.listen(3000, () => console.log('Server On'));