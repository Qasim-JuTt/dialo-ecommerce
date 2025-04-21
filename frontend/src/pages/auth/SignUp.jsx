import React from 'react'
import Layout from '../../layout/Layout'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

const SignUp = () => {
  const handleGoogleSignUp = () => {
    // TODO: Integrate Google Sign-In logic
    console.log('Google sign-up clicked')
  }

  const handleFacebookSignUp = () => {
    // TODO: Integrate Facebook Sign-In logic
    console.log('Facebook sign-up clicked')
  }

  return (
    <Layout>
      <section className="bg-gray-100 py-6 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl my-2 sm:my-4 md:my-8 lg:my-12">
            <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Create Your Account</h2>

            {/* Social Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={handleGoogleSignUp}
                className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <FcGoogle className="text-xl" />
                <span className="text-sm font-medium">Sign up with Google</span>
              </button>
              <button
                onClick={handleFacebookSignUp}
                className="flex items-center justify-center gap-3 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FaFacebook className="text-xl" />
                <span className="text-sm font-medium">Sign up with Facebook</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="px-3 text-gray-500 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            {/* Sign-Up Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
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
                Sign Up
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-teal-600 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SignUp
