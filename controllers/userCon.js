const { hashPassword, comparePassword } = require('../utils/hash');
const collection = require('../models/user');

// Register/Signup Users
async function register(req, res) {
  try {
    const { fullname, email, password, DOB } = req.body;

    // Check if user has already registered
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return res.status(400).redirect('/login?error=Email already exists'); // Redirect if user already exists
    }

    // Hash password synchronously
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    // Convert DOB to a valid Date object
    const dobDate = new Date(DOB).toDateString();

    // Create new user object
    const newUser = new collection({
      fullname,
      email,
      password: hashedPassword,
      DOB: dobDate
    });

    // Save the user
    await newUser.save();

    return res.status(201).redirect('/dashboard'); // Redirect to dashboard on success
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

// Login Users
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await collection.findOne({ email });
    console.log(existingUser)

    if (!existingUser) {
      return res.status(404).redirect('/signup'); // Redirect if user not found
    }

    // Compare Password
    const isMatch = await comparePassword(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).redirect('/login?error=Invalid credentials');
    }

    return res.status(200).redirect('/dashboard'); // Redirect to dashboard on success
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

module.exports = {
  register,
  login
};
