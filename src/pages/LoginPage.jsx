import React from "react";
import aiuImage from "../../public/aiu.jpg";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/login-bg.jpg")' }} // Place login-bg.jpg in public folder
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-2xl flex w-full max-w-3xl min-h-[400px] overflow-hidden"
      >
        {/* Left Side: Login Form */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex flex-col justify-center p-8 border-r bg-gradient-to-b from-blue-50 to-white"
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-700">Admin Login</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-700">Email</label>
              <motion.input
                type="email"
                id="email"
                whileFocus={{ scale: 1.05, boxShadow: "0 0 0 2px #3b82f6" }}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-700">Password</label>
              <motion.input
                type="password"
                id="password"
                whileFocus={{ scale: 1.05, boxShadow: "0 0 0 2px #3b82f6" }}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter your password"
              />
                <div className="mt-2 text-right">
                  <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Forget Password?</a>
                </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
        {/* Right Side: Description & Image */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-blue-50"
          style={{ background: 'rgba(255,255,255,0.0)' }}
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-blue-700"
          >
            Welcome to CGS staff
          </motion.h3>
          <div className="flex flex-col gap-2 mt-2">
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-lg md:text-xl font-bold text-blue-700">Register users</li>
              <li className="text-lg md:text-xl font-bold text-blue-700">Monitoring</li>
              <li className="text-lg md:text-xl font-bold text-blue-700">Verify documents</li>
            </ul>
              <div className="mt-6 text-center">
                <a href="#" className="text-blue-600 text-base font-semibold hover:underline">Contact Us</a>
              </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
