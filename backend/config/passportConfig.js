import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv';
import User from '../models/User.js' // Adjust the path as needed

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.YOUR_GOOGLE_CLIENT_ID,
  clientSecret: process.env.YOUR_GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ googleId: profile.id })

    if (existingUser) {
      return done(null, existingUser)
    }

    // If new, create and save user
    const newUser = new User({
      name: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id
    })

    await newUser.save()
    return done(null, newUser)
  } catch (err) {
    return done(err, null)
  }
}))

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})
