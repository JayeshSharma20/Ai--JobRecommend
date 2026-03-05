import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaBrain, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../reduxStore/reducer/authReducer.js';
// import { Button } from 'react-bootstrap';
// import { Button } from '../Utils/Button.jsx';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('*Username is required'),
  password: Yup.string().required('*Password is required'),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/auth/login',
        { username: values.username, password: values.password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      dispatch(login({ isLog: true, user: data }));
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-violet-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-4 flex flex-col lg:flex-row items-center gap-8">
        
        <div className="hidden lg:flex flex-col items-center justify-center lg:w-1/2 text-center">
          {/* Animated Brain Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <FaBrain className="text-white text-5xl" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 animate-gradient">
            Welcome to SmartHire
          </h1>
          <p className="text-l text-gray-300 mb-8 max-w-md">
            Your AI-powered career companion for intelligent job recommendations
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm text-gray-300">Smart Matching</p>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-sm text-gray-300">Instant Results</p>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm text-gray-300">Secure & Private</p>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-2xl mb-2">📈</div>
              <p className="text-sm text-gray-300">Career Growth</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50">
            
            <div className="lg:hidden flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                <FaBrain className="text-white text-3xl" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Sign <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">In</span>
              </h2>
              <p className="text-gray-400 text-sm">Your job recommendations start here</p>
            </div>

            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  
                  <div>
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
                      Username
                    </label>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70"
                    />
                    <ErrorMessage 
                      name="username" 
                      component="div" 
                      className="text-red-400 text-xs mt-1 ml-1" 
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {showPassword ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                      </button>
                    </div>
                    <ErrorMessage 
                      name="password" 
                      component="div" 
                      className="text-red-400 text-xs mt-1 ml-1" 
                    />
                  </div>

                
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                      <input type="checkbox" className="mr-2 rounded" />
                      Remember me
                    </label>
                    <button
                      type="button"
                      onClick={() => navigate('/forgot-password')}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
                    >
                      Forgot password?
                    </button>
                  </div>

                 
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : 'Sign In'}
                  </button>
                

                
                  <div className="text-center pt-4 border-t border-gray-700/50">
                    <p className="text-sm text-gray-400">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/signup')}
                        className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200 hover:underline"
                      >
                        Sign Up
                      </button>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}