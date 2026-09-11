# 📘 InternPrep Notes App

A responsive **cloud-based notes management web application** built with React.js and Firebase.

InternPrep Notes App allows users to securely sign up, log in, and manage their personal notes through a clean and responsive dashboard. Notes are stored in **Firebase Firestore**, providing cloud-based data persistence and real-time database integration.

🌐 **Live Demo:** https://internprep-notes-app.netlify.app/

---

## 📌 Project Overview

This project was developed to practice building a modern frontend application with:

- React component-based architecture
- Client-side routing
- User authentication
- Cloud database integration
- Protected application routes
- Responsive UI development
- Continuous deployment

The project also provided practical experience integrating a React frontend with Firebase services and deploying the application through Netlify.

---

## ✨ Features

### 🔐 Authentication

- User registration and login
- Firebase Authentication integration
- Protected application routes
- Logout functionality

### 📝 Notes Management

- Create and manage personal notes
- Cloud-based note storage
- Real-time Firestore database integration

### 🖥️ Dashboard

- Clean and simple dashboard interface
- Navigation between application sections
- User logout functionality

### 📱 Responsive Design

- Responsive layout for different screen sizes
- Custom CSS styling
- Simple and user-friendly interface

### 🚀 Deployment

- Hosted on Netlify
- GitHub-based source control
- Continuous deployment workflow

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React.js | Frontend application |
| Vite | Development and build tooling |
| Firebase Authentication | User authentication |
| Firebase Firestore | Cloud database |
| React Router | Client-side routing |
| CSS3 | Styling and responsive UI |
| Netlify | Hosting and deployment |
| GitHub | Version control |

---

## 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React + Vite UI   │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │ Firebase Auth   │        │ Firestore DB    │
        │                 │        │                 │
        │ Login / Signup  │        │ Notes Storage   │
        └─────────────────┘        └─────────────────┘
                              
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Netlify        │
                    │      Hosting        │
                    └─────────────────────┘
                    
