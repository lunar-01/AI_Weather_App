// ✅ script.js

const API_KEY = "d44e12519b06d4fb5516a993fe89167c";
const GEMINI_API_KEY = "AIzaSyBH2KbqxPamuTUbyw63GuVLovFeBQ4ltds";

const weatherBtn = document.getElementById("weatherBtn");
const unitToggle = document.getElementById("unitToggle");
const cityInput = document.getElementById("cityInput");
const loader = document.getElementById("loader");
const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherEmoji = document.getElementById("weatherEmoji");
const error = document.getElementById("error");
const themeToggle = document.getElementById("themeToggle");
const chatBtn = document.getElementById("chatBtn");
const chatbotContainer = document.getElementById("chatbotContainer");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotMessages = document.getElementById("chatbotMessages");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotSend = document.getElementById("chatbotSend");
const typingIndicator = document.getElementById("typingIndicator");

let unit = "metric";
let currentWeather = null;

function showLoader() {
  loader.classList.add("show");
  weatherCard.classList.remove("show");
  error.classList.remove("show");
}

function hideLoader() {
  loader.classList.remove("show");
}

function getWeatherEmoji(id) {
  if (id >= 200 && id < 300) return "🌩️";
  if (id >= 300 && id < 500) return "🌦️";
  if (id >= 500 && id < 600) return "🌧️";
  if (id >= 600 && id < 700) return "❄️";
  if (id >= 700 && id < 800) return "🌫️";
  if (id === 800) return "☀️";
  if (id > 800) return "☁️";
  return "❓";
}

async function getWeather(city) {
  showLoader();
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
    );
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    currentWeather = data;
    updateUI(data);
  } catch (err) {
    showError(err.message);
  }
  weatherBtn.disabled = false;
}

async function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        showLoader();
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`
          );
          const data = await res.json();
          currentWeather = data;
          updateUI(data);
        } catch {
          showError("Failed to get location weather.");
        }
      },
      () => showError("Location permission denied.")
    );
  } else {
    showError("Geolocation not supported.");
  }
}

function updateUI(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}${
    unit === "metric" ? "°C" : "°F"
  }`;
  description.textContent = data.weather[0].description;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${data.wind.speed} ${
    unit === "metric" ? "m/s" : "mph"
  }`;
  weatherEmoji.textContent = getWeatherEmoji(data.weather[0].id);
  weatherCard.classList.add("show");
  hideLoader();
}

function showError(message) {
  error.textContent = message;
  error.classList.add("show");
  hideLoader();
}

function openChatbot() {
  chatbotContainer.classList.add("show");
  chatbotInput.focus();
}

function closeChatbot() {
  chatbotContainer.classList.remove("show");
  chatbotInput.value = "";
}

function addMessage(text, sender) {
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = sender === "user" ? "flex-end" : "flex-start";

  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;

  wrapper.appendChild(message);
  chatbotMessages.appendChild(wrapper);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function showTypingIndicator() {
  typingIndicator.classList.add("show");
}

function hideTypingIndicator() {
  typingIndicator.classList.remove("show");
}

async function sendMessage() {
  const messageText = chatbotInput.value.trim();
  if (!messageText) return;

  addMessage(messageText, "user");
  chatbotInput.value = "";
  showTypingIndicator();

  if (currentWeather) {
    const tempDetails = `in ${
      currentWeather.name
    } with a temperature of ${Math.round(currentWeather.main.temp)}${
      unit === "metric" ? "°C" : "°F"
    }, ${currentWeather.weather[0].description}`;
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Based on the current temperature ${tempDetails}: ${messageText}`,
                  },
                ],
              },
            ],
          }),
        }
      );
      if (!response.ok) throw new Error("Gemini API call failed");
      const data = await response.json();
      const aiReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand that.";
      addMessage(aiReply, "ai");
    } catch (err) {
      console.error("Gemini API Error:", err.message);
      addMessage("Sorry, I couldn't fetch a response from the AI.", "ai");
    }
  } else {
    addMessage(
      "Please check the weather first to include temperature details.",
      "ai"
    );
  }

  hideTypingIndicator();
}

// Event Listeners
weatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    showError("Enter a city name.");
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") weatherBtn.click();
});

unitToggle.addEventListener("click", () => {
  unit = unit === "metric" ? "imperial" : "metric";
  unitToggle.textContent = unit === "metric" ? "°C" : "°F";
  if (currentWeather) getWeather(currentWeather.name);
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.classList.toggle("moon");
  themeToggle.classList.toggle("sun");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "🌙"
    : "☀️";
});

chatBtn.addEventListener("click", openChatbot);
chatbotClose.addEventListener("click", closeChatbot);
chatbotSend.addEventListener("click", sendMessage);
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.ctrlKey) sendMessage();
});

window.addEventListener("DOMContentLoaded", getLocationWeather);
