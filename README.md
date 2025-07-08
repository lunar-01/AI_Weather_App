# 🌤️ Weather App with AI Chatbot

A sleek, modern weather app that lets you check current weather conditions by city or geolocation — and even ask an AI chatbot weather-related questions based on the current forecast!

---

## 🚀 Features

- 🔍 **City-Based Weather Search**
- 📍 **Geolocation Weather Detection**
- 🌙/☀️ **Dark & Light Mode Toggle**
- 🌡️ **Temperature Unit Switch (°C/°F)**
- 💬 **AI Chatbot using Gemini API**
- 📱 **Responsive Design for Mobile & Desktop**

---

## 🛠️ Tech Stack

- HTML5 + CSS3 + JavaScript (Vanilla)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Google Gemini AI API](https://ai.google.dev/)
- CSS Glassmorphism & Animations

---

## 📦 Folder Structure
weather-app/
│
├── index.html # Main HTML file
├── style.css # Styling and themes
├── script.js # All interactivity + API logic
├── README.md # Project overview


## 🔑 API Keys Required

### 1. OpenWeatherMap API Key

- Sign up at: https://home.openweathermap.org/users/sign_up
- Replace the value of `API_KEY` in `script.js` with your key.

### 2. Google Gemini API Key

- Enable Gemini API in Google Cloud Console
- Get API key from: https://makersuite.google.com/app
- Replace the value of `GEMINI_API_KEY` in `script.js`

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/4f71f985-c3b6-4cf9-a43c-626f3815b8d4)

![image](https://github.com/user-attachments/assets/85b99da7-39c3-4647-bc8c-959bbbbc3462)

![image](https://github.com/user-attachments/assets/71338324-b0bc-480d-a8ea-d2558dd913f5)



---

## ✨ Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app

   Open index.html in your browser.

2.💡 You can also deploy it using GitHub Pages or any static hosting provider like Netlify or Vercel.

3.💡 Chatbot Prompt Logic
The chatbot uses the current temperature and weather conditions to enrich your question before sending it to Gemini API. Example:

"Based on the current temperature in London with a temperature of 26°C, clear sky: Should I carry an umbrella?"


