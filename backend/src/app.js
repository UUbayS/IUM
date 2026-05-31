const express = require('express');
const cors = require('cors');
const path = require('path');

const publicRegistrationRoutes = require('./routes/publicRegistrationRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const adminRegistrationRoutes = require('./routes/adminRegistrationRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.APP_ENV === 'development') {
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
}

app.use('/api', publicRegistrationRoutes);
app.use('/api', adminAuthRoutes);
app.use('/api', adminRegistrationRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend PSB Pondok Pesantren berjalan',
  });
});

app.use(errorMiddleware);

module.exports = app;
