import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'
// import Layout from '../../layout/Layout'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData)
      
      // Handle successful signup
      console.log('Signup successful:', response.data)
      alert('Registration successful! Please login.')
      navigate('/login-page')
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message)
      alert(error.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = () => {
    window.open('http://localhost:5000/api/auth/google', '_self')
  }
  

  return (
    <>
      <section className="py-2 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl my-4">
            <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Create Your Account</h2>

            {/* Google Sign-Up Button */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={handleGoogleSignUp}
                className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <FcGoogle className="text-xl" />
                <span className="text-sm font-medium">Sign up with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="px-3 text-gray-500 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            {/* Sign-Up Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{' '}
              <a href="/login-page" className="text-teal-600 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp