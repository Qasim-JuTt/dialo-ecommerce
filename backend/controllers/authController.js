import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    })

    await newUser.save()

    res.status(201).json({ message: 'User registered successfully', user: { name, email } })
  } catch (error) {
    console.error('Signup Error:', error)
    res.status(500).json({ message: 'Server error during registration' })
  }
}
