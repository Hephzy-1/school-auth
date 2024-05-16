const express = require('express');
const authRoute = require('./routes/userRoutes');
require('dotenv').config();
require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000

// Convert to json format
app.use(express.json());

// Static file
app.use(express.static('public'));

// URL Encoding
app.use(express.urlencoded({extended: false}));

// EJS files
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.status(200).render('home')
});

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.use(authRoute);

app.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

// Throw error if the route doesn't exists
app.use((req, res, next) => {
  res.status(404).json({message: `PAGE NOT FOUND ${req.method} ${req.url}`})
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})