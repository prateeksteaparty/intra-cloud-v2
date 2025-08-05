import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Cloud,
  Sparkles,
  Upload,
  RefreshCw,
  File,
  User,
  Search,
  Download,
  Trash2,
  Eye,
  Calendar,
  HardDrive,
  CheckCircle,
  AlertCircle,
  X,
  LogOut,
  Settings,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [countdowns, setCountdowns] = useState({});

  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";
  const maxStorage = 5 * 1024 * 1024 * 1024;

  const mockFiles = [
   
  ];

  useEffect(() => {
    setIsVisible(true);
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://intra-cloud-v2.onrender.com/api/posts', { 
        params: { username, t: Date.now() } 
      });
      setFiles(response.data);
    } catch (error) {
      console.error("Fetch files error:", error);
      showNotification('Failed to load files, showing demo data', 'error');
      setFiles(mockFiles);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewFile = (file) => {
    if (file.url && file.url !== "#") {
    
      window.open(file.url, '_blank');
      showNotification('File opened. Timer started for auto-deletion.', 'success');
    } else {
      showNotification('File preview not available', 'error');
    }
    
    startCountdown(file);
  };

const handleDownloadFile = (file) => {
  if (file.url && file.url !== "#") {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.originalName || file.imgName || 'download'; 
    link.target = '_blank'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Download started. Timer started for auto-deletion.', 'success');
  } else {
    showNotification('Download not available', 'error');
  }
  startCountdown(file);
};


 const startCountdown = (file) => {
  if (!countdowns[file.imgName]) {
    setCountdowns(prev => ({ ...prev, [file.imgName]: 60 }));

    const interval = setInterval(() => {
      setCountdowns(prevCountdowns => {
        const current = prevCountdowns[file.imgName];
        if (current > 1) {
          return { ...prevCountdowns, [file.imgName]: current - 1 };
        } else {
          clearInterval(interval);
          handleDeleteFile(file);
          const { [file.imgName]: _, ...rest } = prevCountdowns;
          return rest;
        }
      });
    }, 1000);
  }
};


  const handleDeleteFile = async (file) => {
    try {
   
      await axios.delete('https://intra-cloud-v2.onrender.com/api/delete', {
        data: { imgName: file.imgName, username }
      });
      
      
      setFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));
      
    
      setCountdowns(prev => {
        const { [file.imgName]: _, ...rest } = prev;
        return rest;
      });
      
      showNotification('File deleted successfully from cloud storage', 'success');
    } catch (error) {
      console.error("Delete error:", error);
      showNotification('Failed to delete file from cloud storage', 'error');
    }
  };

  const handleRefreshFiles = () => {
    fetchFiles();
  
    setCountdowns({});
    showNotification('Files refreshed', 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate('/');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      handleUpload(droppedFiles[0]);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      handleUpload(selectedFiles[0]);
    }
  };

  const handleUpload = async (fileToUpload) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('username', username);
    
    try {
      
      const response = await axios.post('https://intra-cloud-v2.onrender.com/api/upload', formData, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      });
      
      showNotification('File uploaded successfully to cloud storage!', 'success');
      
      await fetchFiles();
    } catch (error) {
      console.error("Upload error:", error);
      showNotification('File upload failed. Please try again.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const getTotalSize = () => files.reduce((acc, file) => acc + file.size, 0);

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'xls':
      case 'xlsx': return '📊';
      case 'ppt':
      case 'pptx': return '📽️';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return '🖼️';
      case 'mp4':
      case 'avi':
      case 'mov': return '🎬';
      default: return '📁';
    }
  };

  const filteredFiles = files.filter(file => (file.originalName || file.imgName).toLowerCase().includes(searchTerm.toLowerCase()));

  const storagePercentage = Math.min((getTotalSize() / maxStorage) * 100, 100);

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
            <div className="flex items-center space-x-4">
              <span className="text-slate-600 font-medium hidden sm:block">Welcome, {username}</span>
              <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200" title="Settings">
                <Settings className="w-5 h-5" />
              </button>
              <button onClick={handleLogout} className="text-slate-600 hover:text-red-600 transition-colors duration-200" title="Logout">
                <LogOut className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-200 text-sm font-medium">
              ☁️ Your Personal Cloud
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-800">Dashboard</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Manage your files securely and access them from anywhere in the world</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className={`bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Upload Files</h2>
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </div>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50/50 scale-105' : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/30'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
              >
                <input id="file-input" type="file" className="hidden" onChange={handleFileSelect} />
                <div className={`transition-all duration-300 ${isDragActive ? 'scale-110' : ''}`}>
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{isDragActive ? 'Drop files here' : 'Drag & drop files here'}</h3>
                  <p className="text-slate-600 mb-4">or click to browse your device</p>
                  <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-500">
                    <span className="px-3 py-1 bg-slate-100 rounded-full">PDF</span>
                    <span className="px-3 py-1 bg-slate-100 rounded-full">Images</span>
                    <span className="px-3 py-1 bg-slate-100 rounded-full">Documents</span>
                    <span className="px-3 py-1 bg-slate-100 rounded-full">+More</span>
                  </div>
                </div>
                {isDragActive && (
                  <div className="absolute inset-0 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                    <div className="text-blue-600 font-semibold text-lg">Release to upload</div>
                  </div>
                )}
              </div>
              {isUploading && (
                <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-medium text-blue-700">Uploading to cloud storage...</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div className={`bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-bold text-slate-800">Storage</h3>
                <div className="inline-flex p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                  <HardDrive className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500" style={{ width: `${storagePercentage}%` }}></div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-slate-600 mt-3">
                <span className="font-medium">{formatSize(getTotalSize())}</span>
                <span>{formatSize(maxStorage)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <div className="text-sm text-slate-500">{files.length} files stored</div>
              </div>
            </div>
            <div className={`bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={handleRefreshFiles} className="group w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all duration-300 hover:scale-105" aria-label="Refresh Files">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <RefreshCw className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-blue-700">Refresh Files</span>
                </button>
                <button onClick={() => document.querySelector('input[placeholder="Search files..."]')?.focus()} className="group w-full flex items-center space-x-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all duration-300 hover:scale-105" aria-label="Focus Search Input">
                  <div className="p-2 bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">Search Files</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`mt-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-800">Your Files</h2>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 text-slate-800 placeholder-slate-400"
                    aria-label="Search files"
                  />
                </div>
              </div>
            </div>
            <div className="p-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filteredFiles.length > 0 ? (
                <div className="space-y-3">
                  {filteredFiles.map((file, index) => (
                    <div key={file.id || index} className="group flex items-center justify-between p-4 bg-white/50 hover:bg-white/80 rounded-2xl border border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                          {getFileIcon(file.originalName || file.imgName)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-800 truncate">
                            {file.originalName || file.imgName}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                            </span>
                            <span>{formatSize(file.size)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                       
                        {countdowns[file.imgName] && (
                          <div className="relative group/timer">
                            <div className="p-2 text-orange-600 bg-orange-50 rounded-xl border border-orange-200 animate-pulse">
                              <Clock className="w-4 h-4" />
                            </div>
                            <span className="absolute -top-1 -right-2 text-[10px] font-bold text-orange-600 bg-white rounded-full px-1 border">
                              {countdowns[file.imgName]}
                            </span>
                         
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/timer:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              File will be deleted in {countdowns[file.imgName]}s
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                          </div>
                        )}
                        
                        <button onClick={() => handleViewFile(file)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110" title="View file">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDownloadFile(file)} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 hover:scale-110" title="Download file">
                          <Download className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteFile(file)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110" title="Delete file">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <File className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">{searchTerm ? 'No files found' : 'No files uploaded yet'}</h3>
                  <p className="text-slate-500">{searchTerm ? 'Try searching with different keywords' : 'Upload your first file to get started'}</p>
                </div>
              )}
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
            <p className="text-slate-600 text-center">© {new Date().getFullYear()} Intra Cloud. Built for the future.</p>
            <div className="flex space-x-6">
              <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200">Privacy</button>
              <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200">Terms</button>
              <button className="text-slate-600 hover:text-blue-600 transition-colors duration-200">Support</button>
            </div>
          </div>
        </div>
      </footer>
      {notification.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className={`flex items-center space-x-3 p-4 rounded-2xl shadow-xl backdrop-blur-xl border ${notification.type === 'success' ? 'bg-green-50/90 border-green-200 text-green-800' : 'bg-red-50/90 border-red-200 text-red-800'}`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span className="font-medium">{notification.message}</span>
            <button onClick={() => setNotification({ show: false, message: '', type: 'success' })} className="text-slate-400 hover:text-slate-600 transition-colors duration-200" aria-label="Close notification">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
}