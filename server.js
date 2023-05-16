require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');

const app = express();

mongoose.connect(process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

app.listen(5500, () => console.log('Server started'));
