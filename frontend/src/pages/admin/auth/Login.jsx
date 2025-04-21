import React from 'react'

const AdminLogin = () => {
  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Login to Your Account</h2>

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
  )
}

export default AdminLogin
