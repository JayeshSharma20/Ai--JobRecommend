import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import image from '../assets/Pic1.png'
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../reduxStore/reducer/authReducer.js';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('*Username is required'),
  password: Yup.string().required('*Password is required'),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const islog = useSelector((state)=> state.user.isLog);
  console.log('islog:', islog);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/auth/login',
        { username: values.username, password: values.password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const data = response.data;
      console.log('Login Response:', data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      dispatch(login({ isLog: true, user: data }));
      // toast.success('User Login Successfully.');
      navigate('/pdfupload');
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className='flex h-screen w-full'>
        <div className='hidden md:block md:w-1/2 bg-gray-800'>
          <h1 className="flex flex-col justify-center items-center mt-20  text-3xl sm:text-4xl font-extrabold text-gray-500 mb-6 ">Welcome to <span className='text-purple-500'>Job.</span>Recommend</h1>
          <img
            src={image}
            alt="Job Illustration"
            className="w-[70%] max-w-[400px] h-auto ml-22"
           />
        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 sm:px-10 bg-white" >
          <div className="w-full max-w-md">

            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-6">
                  <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-500">
                    Your <span className='text-purple-400'>Job Recommendation</span> Starts Here
                    </h2>
                  <div>
                    <label htmlFor="username" className="block text-sm font-bold text-gray-500 mb-1">Username:</label>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter username"
                      className="w-full px-4 py-2 bg-white text-gray-500 border border-gray-700 rounded-lg"
                    />
                    <ErrorMessage name="username" component="div" className="text-red-600 mt-1 text-sm min-h-[20px]" />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-bold text-gray-500 mb-1">Password:</label>
                    <div className="relative">
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        className="w-full px-4 py-2 border text-gray-500 border-gray-700 rounded-lg"
                      />
                      <span
                        className="w-6 sm:w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-600 mt-1 text-sm min-h-[20px]" />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing in...' : 'SIGN IN'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
