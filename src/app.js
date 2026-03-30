const express = require('express');
const cookies = require('cookie-parser');
const apiRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');
const app = express();

app.use(cookies());
app.use(express.json());
app.use('/api/music', musicRoutes);

app.use('/api/auth', apiRoutes);
module.exports = app;