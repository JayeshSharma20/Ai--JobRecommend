import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import image from "../assets/Pic1.png";
import * as Yup from "yup";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignup = async (e) => {
    // e.preventDefault();
    try {
      const res = await axios.post({ email, name, password });
      console.log(res.data.message);
    } catch (err) {
      console.log(err.response.data.message || "Signup failed");
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="hidden md:block md:w-1/1 bg-gradient-to-t from-black to-blue-500">
        <h1 className="flex flex-col justify-center items-center mt-20 text-xl sm:text-4xl font-extrabold text-white mb-6 ">
          Welcome to <span className="text-orange-500 underline">Job.</span>
          Recommend 
        <img
          src={image}
          alt="Job Illustration"
          className="max-w-[400px] h-auto"
        />
        </h1>
      </div>
      <div className="flex flex-col justify-center items-start w-full md:w-1/2 px-6 sm:px-10 bg-white">
        <h1 className="text-2xl sm:text-3xl font-extrabold items-start text-gray-700">
          Sign<span className="text-blue-500">_Up</span>
          <p className="text-sm sm:text-lg ">Start your professional journey with us.</p>
        </h1>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={signupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col sm:gap-6 mt-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-bold text-gray-500"
                >
                  Username:
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  className="w-full sm:w-100 px-4 py-2 bg-white text-gray-500 border border-gray-700 rounded-lg"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-600 mt-1 text-sm min-h-[20px]"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-500"
                >
                  Email:
                </label>
                <Field
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter Email"
                  className="sm:w-100 px-4 py-2 bg-white text-gray-500 border border-gray-700 rounded-lg"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 mt-1 text-sm min-h-[20px]"
                />
              </div>    
              <div className="">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-500"
                >
                  Password:
                </label>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    // type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="sm:w-100 px-4 py-2 border text-gray-500 border-gray-700 rounded-lg"
                  />
                  <span
                    className="w-6 sm:w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                    // onClick={() => setShowPassword(!showPassword)}
                  >
                    {/* {showPassword ? <FaEye /> : <FaEyeSlash />} */}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 mt-1 text-sm min-h-[20px]"
                />
              </div>
               <Button
               variant="primary"
                type="submit"
                 className="w-50 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                disabled={isSubmitting}
              >
                {/* {isSubmitting ? 'Signing up...' : 'Sign Up'}
                 */}{" "}
                Create an Account
              </Button>
            </Form>
          )}
        </Formik>
        
        <div>
          <p className="text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => {
                // setIsLogin(true);
                navigate("/");
              }}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
