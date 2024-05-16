const { hashPassword, comparePassword } = require('../utils/hash');
const collection = require('../models/user');

// Register/Signup Users
async function register(req, res) {
  try {
    const { fullname, email, password, DOB } = req.body;

    // Check if user has already registered
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      throw new Error('User Found');
    }

    // Hash password synchronously
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword)

    // Convert DOB to a valid Date object
    // const dobDate = new Date(DOB).toDateString();

    // Create new user object
    const newUser = new collection({
      fullname,
      email,
      password: hashedPassword,
      DOB
    });

    // Save the user
    await newUser.save();

    res.status(201).json({ message: 'You have been registered' });
  } catch (err) {
    if (err === 'User Found') {
      res.status(400).redirect('/login')
      res.json({message: 'This email has already been registered. Please use another email'})
    } else {
      console.error(err)
      res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
  }
}

// Login Users
async function login (req, res) {
  try {
    const { email, password } = req.body

    // Check if user exists
    const existingUser = await collection.findOne({ email });

    if (!existingUser) {
      throw Error('Not Found');
    }

    // Compare Password
    const isMatch = comparePassword(password, existingUser.password);
    if (!isMatch) {
      throw Error('Invalid');
    } else {
      res.status(200).json({message: 'Welcome to your school dashboard'});
    }
  } catch (err) {
    if (err === 'Not Found') {
      res.status(404),redirect('/signup')
      res.json({message: 'User not found. Please register'})
    } else if (err === 'Invalid') {
      res.status(400).json({message: 'Invalid credentials. Please try again'})
    } else {
      console.error(err);
      res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
  }
}

module.exports = {
  register,
  login
}