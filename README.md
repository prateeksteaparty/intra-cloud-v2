# IntraCloud – A SaaS-Based File Storage Platform

IntraCloud is a lightweight, full-stack cloud storage platform that allows users to securely sign up, log in, and upload files — similar to a simplified Google Drive. Built with the MERN stack (MongoDB, Express, React, Node.js), it enables users to manage personal files through a clean and modern interface.

## 🔧 Features

* 🔐 User authentication (signup/login with JWT)
* ☁️ File upload functionality (client to server to AWS S3)
* 🧾 Dashboard to view uploaded files
* 🗂 Organized folder-like UI (optional future improvement)
* 🧱 Built with MERN stack
* 📦 Ready for Docker containerization

## 💻 Tech Stack

* **Frontend**: React.js, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JWT (JSON Web Tokens)
* **File Storage**: AWS S3 using `aws-sdk` and `multer-s3`
* **Cloud Ready**: Docker support (coming soon)

## 📂 File Storage Implementation

Uploaded files are handled using `multer` and stored directly to an **AWS S3 bucket** via `multer-s3`. This ensures scalable, secure, and persistent cloud storage of user files.

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/prateeksteaparty/intra-cloud-v2.git
cd intra-cloud

# Start backend
cd backend
npm install
npm start

# Start frontend
cd frontend/intra-cloud
npm install
npm start
```

> 🔑 Make sure to set up your environment variables for MongoDB connection, JWT secret, and AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME`, etc.)

## 📸 Screenshots

![App Screenshot 1](https://i.ibb.co/mFykxGSy/img1.png)  
![App Screenshot 2](https://i.ibb.co/kgcZjZFZ/img2.png)  
![App Screenshot 3](https://i.ibb.co/8DCkTXSR/img3.png)  
![App Screenshot 4](https://i.ibb.co/JwWCR0zb/img4.png)  
![App Screenshot 5](https://i.ibb.co/wrJ9jmX2/img5.png)  
![App Screenshot 6](https://i.ibb.co/HDvsrQpQ/img6.png)







