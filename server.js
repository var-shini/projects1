// //weather
// //as we are not using id so we cant get elemetn by id...since we are working with classes we use queryselector or query selector all
// const weatherForm = document.querySelector(".weatherForm");
// //we will return 1st element in this class
// const cityInput= document.querySelector(".cityInput");
// const card= document.querySelector(".card");
// const apikey ="3ec8b7fabe77ee3fcadd01cd95423b45";

// weatherForm.addEventListener("submit", async (event)=> {
//     event.preventDefault();

//     const city = cityInput.value;
//     if(city){
//        try {
//          const weatherdata= await getWeatherData(city);
//          displayWeatherInfo(weatherdata);
//        } catch (error) {
//         console.error(error);
//         displayError(error);
//        }
//     }
//     else{
//         displayError("please enter a city");
//     }
// });
// //we need async function to get weatherdata
// async function getWeatherData(city){
//     const apiUrl=`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=&{apikey}`;
//  const response = await fetch(apiUrl);
// console.log(response)
// }

// function displayWeatherInfo(data){

// }
// function getWeatherEmoji(weatherId){

// }
// function displayError(message) {
//     const errorDisplay = document.createElement("p");
//     errorDisplay.textContent = message;
//     errorDisplay.classList.add("errorDisplay");

//     card.textContent = "";
//     card.style.display = "flex";
//     card.appendChild(errorDisplay);
// }
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "3ec8b7fabe77ee3fcadd01cd95423b45";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value;
    if (city) {
        const data = await getWeatherData(city);
        if (data) {
            displayWeatherInfo(data);
        } else {
            displayError("Failed to retrieve weather data.");
        }
    } else {
        displayError("Please enter a city.");
    }
});

// Async function to get weather data from OpenWeatherMap API
async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

// Function to display weather information
function displayWeatherInfo(data) {
    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = data.name;
    cityDisplay.classList.add("cityDisplay");

    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `${data.main.temp} °C`;
    tempDisplay.classList.add("tempDisplay");

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");

    const descDisplay = document.createElement("p");
    descDisplay.textContent = data.weather[0].description;
    descDisplay.classList.add("descDisplay");

    const weatherEmoji = document.createElement("p");
    weatherEmoji.textContent = getWeatherEmoji(data.weather[0].id);
    weatherEmoji.classList.add("weatherEmoji");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

// Function to get weather emoji based on weather ID
function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈️";
    } else if (weatherId >= 300 && weatherId < 600) {
        return "🌧️";
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄️";
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫️";
    } else if (weatherId === 800) {
        return "☀️";
    } else if (weatherId > 800) {
        return "☁️";
    } else {
        return "🌈";
    }
}

// Function to display error message
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
