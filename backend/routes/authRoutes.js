import express from 'express'
import passport from 'passport'
import {
  signup
} from "../controllers/authController.js";
const router = express.Router()

// Start Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/sign-up' }),
  (req, res) => {
    const { _id, email, name } = req.user;
    const redirectUrl = `http://localhost:5173/auth-success?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&id=${_id}`;
    res.redirect(redirectUrl);
  }
);


router.post('/signup', signup)


export default router
