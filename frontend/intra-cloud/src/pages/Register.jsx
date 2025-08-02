import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Cloud,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle
} from 'lucide-react';

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleUserNameChange = (e) => {
        setUsername(e.target.value);
        if (error) setError(''); 
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) setError(''); 
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (error) setError(''); 
    }

    const getData = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('https://intra-cloud-v2.onrender.com/register', {
                username,
                email,
                password
            });
            
            localStorage.setItem("token", response.data.token);
            navigate('/login');
            
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            setError("Registration failed. Please check your details and try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50">
            
            <header className="bg-white/80 backdrop-blur-xl border-b border-white/20">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Cloud className="w-8 h-8 text-blue-600" />
                                <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Intra Cloud
                            </h1>
                        </div>
                        
                        <button
                            onClick={() => navigate('/')}
                            className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-md">
                    <div className={`transform transition-all duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                     
                        <div className="text-center mb-8">
                            <div className="mb-6">
                                <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-200 text-sm font-medium">
                                    🚀 Join Intra Cloud
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-800">
                                Sign Up
                            </h1>
                            <p className="text-lg text-slate-600">
                                Create your secure cloud account
                            </p>
                        </div>

                        
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-8">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <span className="text-red-700 text-sm">{error}</span>
                                </div>
                            )}

                            <form onSubmit={getData} className="space-y-6">
                             
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={handleUserNameChange}
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 text-slate-800 placeholder-slate-400"
                                            placeholder="Enter your username"
                                        />
                                    </div>
                                </div>

                              
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 text-slate-800 placeholder-slate-400"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={handlePasswordChange}
                                            required
                                            className="w-full pl-12 pr-12 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 text-slate-800 placeholder-slate-400"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                               
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl font-semibold text-white shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Sign Up</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                        </>
                                    )}
                                </button>
                            </form>

                           
                            <div className="mt-8 text-center">
                                <p className="text-slate-600">
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        Sign in here
                                    </button>
                                </p>
                            </div>
                        </div>

                        
                        <div className="mt-6 text-center">
                            <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors duration-200">
                                Need help? Contact support
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="px-6 py-8 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-3">
                            <Cloud className="w-6 h-6 text-blue-600" />
                            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Intra Cloud
                            </span>
                        </div>
                        
                        <p className="text-slate-600 text-center">
                            © {new Date().getFullYear()} Intra Cloud. Built for the future.
                        </p>
                        
                        <div className="flex space-x-6">
                            <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                                Privacy
                            </button>
                            <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                                Terms
                            </button>
                            <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                                Support
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}