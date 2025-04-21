import React from 'react'
import Layout from '../../layout/Layout'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

const Login = () => {
  const handleGoogleLogin = () => {
    // TODO: Implement Google login logic
    console.log('Google login clicked')
  }

  const handleFacebookLogin = () => {
    // TODO: Implement Facebook login logic
    console.log('Facebook login clicked')
  }

  return (
    <Layout>
      <section className="bg-gray-100 py-6 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl my-2 sm:my-4 md:my-8 lg:my-12">
            <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Login to Your Account</h2>

            {/* Social Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <FcGoogle className="text-xl" />
                <span className="text-sm font-medium">Login with Google</span>
              </button>
              <button
                onClick={handleFacebookLogin}
                className="flex items-center justify-center gap-3 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FaFacebook className="text-xl" />
                <span className="text-sm font-medium">Login with Facebook</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="px-3 text-gray-500 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            {/* Login Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
              >
                Log In
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-teal-600 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}


export default Login
