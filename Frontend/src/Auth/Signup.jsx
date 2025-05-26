import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/signup', { email, name, password });
      console.log(res.data.message);
    } catch (err) {
      console.log(err.response.data.message || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-700 min-h-screen">
           <div className="w-100 bg-white p-10 m-2 rounded-2xl shadow-6xl">
             <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-500">Sign Up with</h2>
   
             <Formik
               initialValues={{ username: '', password: '' }}
              //  validationSchema={loginSchema}
               onSubmit={handleSignup}
             >
               {({
                 isSubmitting

                }) => (
                 <Form className="flex flex-col gap-6">
                   <div>
                     <label htmlFor="username" className="block text-sm font-bold text-gray-500 mb-1">Username: </label>
                     <Field
                       id="username"
                       name="username"
                       type="text"
                       placeholder="Enter username"
                       className="w-full px-4 py-2 bg-white text-black border border-gray-700 rounded-lg"
                     />
                     <ErrorMessage name="username" component="div" className="text-red-600 mt-1 text-sm min-h-[20px]" />
                   </div>
                   <div>
                     <label htmlFor="username" className="block text-sm font-bold text-gray-500 mb-1">Name:</label>
                     <Field
                       id="name"
                       name="name"
                       type="text"
                       placeholder="Enter name"
                       className="w-full px-4 py-2 bg-white text-gray-500 border border-gray-700 rounded-lg"
                     />
                     <ErrorMessage name="name" component="div" className="text-red-600 mt-1 text-sm min-h-[20px]" />
                   </div>
   
                   <div>
                     <label htmlFor="password" className="block text-sm font-bold text-gray-500 mb-1">Password:</label>
                     <div className="relative">
                       <Field
                         id="password"
                         name="password"
                        //  type={showPassword ? 'text' : 'password'}
                         placeholder="Enter password"
                         className="w-full px-4 py-2 border text-gray-500 border-gray-700 rounded-lg"
                       />
                       <span
                         className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                        //  onClick={() => setShowPassword(!showPassword)}
                       >
                         {/* {showPassword ? <FaEye /> : <FaEyeSlash />} */}
                       </span>
                     </div>
                     <ErrorMessage name="password" component="div" className="text-red-600 mt-1 text-sm min-h-[20px]" />
                   </div>
   
                   {/* <button
                     type="submit"
                     className="w-full py-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all cursor-pointer"
                     disabled={isSubmitting}
                   >
                     {isSubmitting ? 'Logging in...' : 'Login'}
                   </button> */}
                   <Button 
                   type="submit"
                  //  onClick={() => navigate('/signup')}
                   className="w-full py-2 text-white bg-blue-500 hover:text-blue-700 font-bold rounded-lg transition-all cursor-pointer"
                   >
                     {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                       
                   </Button>
                    <Button 
                type="submit"
                onClick={() => navigate('/')}
                className="w-full py-2 text-gray-500 hover:text-blue-700 font-bold rounded-lg transition-all cursor-pointer"
                >
                  Already have Accont ? Login
                </Button>
                 </Form>
               )}
             </Formik>
           </div>
         </div>
  );
};

export default Signup;
