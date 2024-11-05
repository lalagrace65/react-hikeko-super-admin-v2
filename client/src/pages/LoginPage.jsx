import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';
import { baseURL } from '@/Url.jsx';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserContext);
  const navigateTo = useNavigate();
   // Function for sending login data to API
   async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try{
        const {data} = await axios.post(`${baseURL}/login`, {
            email,
            password,
        });
        setUser(data);
        toast.success('Login successful. You are now logged in.');
        navigateTo('/dashboard');
    } catch (e) {
        toast.error('Login failed. Please try again later.');
    }
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex w-3/4 lg:w-2/3 xl:w-1/2">
        
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="/hiking-welcomepage.jpg"
            alt="Login Image"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>

            {/* Don't have an account */}
            <div className="text-center py-2 text-gray-500">
              Don't have an account?{' '}
              <Link to={"/register"} className="text-blue-500 hover:underline">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
