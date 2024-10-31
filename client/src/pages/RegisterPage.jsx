import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import  emailjs  from '@emailjs/browser';


export default function RegisterPage() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const form = React.useRef();

    // Function for sending registration data to API
    async function registerUser(ev) {
        ev.preventDefault();
        emailjs.sendForm('service_ehzzg2c', 'template_xc2nmxt', form.current, 'XczVijVc-NaoUCGic')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
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

            {/* Right Side - Register Form */}
            <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Register</h2>
            <form  ref={form} onSubmit={registerUser}>
                <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Username</label>
                <input
                    type="text"
                    id="text"
                    className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your username"
                    name='to_name'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                />
                </div>
                <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <input
                    type="email"
                    id="email"
                    className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your email"
                    name='to_email'
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
                className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                >
                Register
                </button>

                {/* Don't have an account */}
                <div className="text-center py-2 text-gray-500">
                Already a member?{' '}
                <Link to={"/"} className="text-blue-500 hover:underline">
                    Login
                </Link>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}
