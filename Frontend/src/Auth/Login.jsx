// import React, { useState } from 'react';
// // import { useDispatch, } from 'react-redux';
// // import { login } from '../reduxStore/reducer/authReducer';
// // import { useNavigate } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import axios from 'axios';
// // import { toast } from 'react-toastify';
// import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// // //   const { islog } = useSelector((state) => state.user);

//   const loginSchema = Yup.object().shape({
//     username: Yup.string().required('This field is required.'),
//     password: Yup.string().required('This field is required.'),
//   });

// //   const togglePasswordVisibility = () => {
// //     setShowPassword(!showPassword);
// //   };

//   const handleLogin = async (values, { setSubmitting }) => {
//     try {
//       const response = await axios.post(
//         'https://dummyjson.com/auth/login',
//         { username: values.username, password: values.password },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       const data = response.data;
//       localStorage.setItem('user', JSON.stringify(data));
//       localStorage.setItem('token', data.token);
//       dispatch(login({ islog: true, user: data }));
//       toast.success('User Login Successfully.');
//       navigate('/products');
//     } catch (error) {
//       console.error('Login Error:', error);
//       toast.error('Login failed. Please check your credentials.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 ">
//       <div className="w-full max-w-sm  p-16">
//         <h2 className="text-3xl font-extrabold text-center mb-10 text-white">
//           Login Form
//         </h2>
        
//         <Formik
//           initialValues={{ username: '', password: '' }}
//           validationSchema={loginSchema}
//           onSubmit={handleLogin}
//         >
//           {({ isSubmitting }) => (
//             <FormikForm className="space-y-6">
//               <Form.Group controlId="username">
//                 <Form.Label className="font-small text-white">Username:</Form.Label>
//                 <Field
//                   id="username"
//                   name="username"
//                   type="text"
//                   placeholder="Enter username"
//                   className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <ErrorMessage name="username" component="div" className="text-red-600" />
//               </Form.Group>

//               <Form.Group controlId="password">
//                 <Form.Label className="font-small text-white">Password:</Form.Label>
//                 <div className="relative">
//                   <Field
//                     id="password"
//                     name="password"
//                     // type={showPassword ? 'text' : 'password'}
//                     placeholder="Password"
//                     className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <ErrorMessage name="password" component="div" className="text-red-600" />
//                   <span
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
//                     // onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? <FaEye /> : <FaEyeSlash />}
//                   </span>
//                 </div>
//               </Form.Group>

//               <Button
//                 type="submit"
//                 className="w-full py-2 mt-1 text-white font-bold rounded-lg transition-all"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Logging in...' : 'Login'}
//               </Button>
//             </FormikForm>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PdfUpload from '../Components/PdfUpload';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      // dispatch(login({ islog: true, user: data }));
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
     <div className="w-full flex justify-between items-center py-4 px-6 shadow-sm fixed top-0 bg-white z-10">
        <div className="text-purple-500 text-2xl font-bold">Job.<span className="text-gray-800">Recommend</span></div>
        <div className="flex items-center space-x-6 text-gray-600 font-medium">
          {/* <span className="hover:underline cursor-pointer">Blog</span>
          <span className="hover:underline cursor-pointer">Help</span>
          <span className="hover:underline cursor-pointer">Pricing</span> */}
        </div>
      </div>
    <div className="flex justify-center items-center mt-14">
      <div className="w-100  bg-white p-10 m-6 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-black">Login Form</h2>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-bold text-black mb-1">Username:</label>
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
                <label htmlFor="password" className="block text-sm font-bold text-black mb-1">Password:</label>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 border text-black border-gray-700 rounded-lg"
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-600 mt-1 text-sm min-h-[20px]" />
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
}
