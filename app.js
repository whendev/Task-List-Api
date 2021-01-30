// Carregar Modulos
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json({
  limit: '5mb',
}));

// Habilita o CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Carregar Models
const userModel = require('./src/models/user');
const projectModel = require('./src/models/project');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect( process.env.CONECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
// Carregar Routes
const index = require('./src/routes/index');
const userRouter = require('./src/routes/user');
const projectRouter = require('./src/routes/project');

// Define os prefixos às rotas
app.use('/', index);
app.use('/user', userRouter);
app.use('/project', projectRouter);

module.exports = app;
