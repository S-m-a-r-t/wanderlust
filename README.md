# 🌍 Wanderlust

A community-driven platform where people can share and explore hidden, lesser-known travel spots from their cities — away from the noise and crowd of mainstream tourist destinations.

## 🚀 Project Overview

**Wanderlust** lets users list offbeat places, promoting peaceful and unique experiences. The project focuses on strong backend architecture, scalability, and clean code structure — with frontend improvements planned in future updates.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Templating Engine:** EJS  
- **Database:** MongoDB  
- **Cloud Storage:** Cloudinary  
- **Deployment:** Render

## ✨ Features

- 📍 Users can list hidden travel locations with image uploads  
- ☁️ Cloudinary integration for secure image storage  
- 🌙 Light/Dark theme toggle functionality  
- 🧩 Modular codebase with route handling, middleware, and schema validation  
- 🛠️ Error handling using custom utilities  
- 🌐 Deployed live using Render

## 📂 Project Structure
📁 controllers/ # Route logic
📁 routes/ # Route definitions
📁 views/ # EJS templates
📁 public/ # Static assets (CSS, JS)
📁 models/ # Mongoose models
📁 utils/ # Error handling and helper functions
📁 init/ # Cloudinary setup
📄 app.js # Main server file
📄 middleware.js # Custom middlewares
📄 cloudconfig.js # Cloudinary config
📄 vali_schema.js # Joi validation schema


## 🧪 Upcoming Features

- 🔒 User authentication & profiles  
- 📸 Multiple image uploads per location  
- ⭐ Rating and review system  
- 🔎 Advanced search & location-based suggestions  
- 🖼️ Improved modern UI with animations and transitions  

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone repo
   cd wanderlust
   npm install
   node app.js


Create a .env file and add your MongoDB URI and Cloudinary credentials:
CLOUD_NAME=your_cloud_name
CLOUD_KEY=your_api_key
CLOUD_SECRET=your_api_secret
DB_URL=your_mongodb_uri

