import React, { useState, useEffect } from 'react';
const ROUTE_LINK = import.meta.env.REACT_APP_ROUTE_LINK;
import { 
  Cloud, 
  Shield, 
  Smartphone, 
  Share2, 
  ArrowRight, 
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Users,
  Zap,
  HardDrive,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Your files are encrypted and stored securely in the cloud with military-grade protection",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Smartphone,
      title: "Easy Access",
      description: "Access your files from any device, anywhere, anytime with seamless synchronization",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Share2,
      title: "File Sharing",
      description: "Share files easily with friends and colleagues using secure, time-limited links",
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  const stats = [
    { icon: Users, number: "2M+", label: "Active Users" },
    { icon: Zap, number: "99.9%", label: "Uptime" },
    { icon: HardDrive, number: "500PB", label: "Data Stored" },
    { icon: Globe, number: "150+", label: "Countries" }
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
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

            <div className="hidden md:flex items-center space-x-6">
              <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Features
              </button>
              <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Pricing
              </button>
              <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                About
              </button>
            </div>

            <button 
              className="md:hidden text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200">
              <div className="flex flex-col space-y-3 pt-4">
                <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-left">
                  Features
                </button>
                <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-left">
                  Pricing
                </button>
                <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-left">
                  About
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-200 text-sm font-medium">
                ✨ Welcome to Intra Cloud
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-slate-800">
              Securely Store,
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Access & Share
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience lightning-fast uploads, military-grade security, and seamless file sharing 
              across all your devices from anywhere in the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => { navigate('/register') }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl font-semibold text-white shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Free Today</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button
                onClick={() => { navigate('/login') }}
                className="px-8 py-4 border-2 border-slate-300 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 backdrop-blur-sm"
              >
                Sign In
              </button>
            </div>

            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-slate-400 mx-auto" />
            </div>
          </div>
        </div>
      </main>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Why Choose Intra Cloud?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built for the modern world, designed for tomorrow's challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Trusted by millions worldwide</h3>
            <p className="text-slate-600">Join our growing community of satisfied users</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-slate-800 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center p-12 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Join millions of users who trust Intra Cloud for their file storage needs. 
              Start your free account today and experience the difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => { navigate('/register') }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl font-semibold text-white shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button
                onClick={() => { navigate('/login') }}
                className="px-8 py-4 border-2 border-slate-300 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
              >
                Already have an account?
              </button>
            </div>
          </div>
        </div>
      </section>

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
