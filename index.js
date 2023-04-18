const card = document.querySelector(".card");

// caixa da temperatura
const tempBox = document.querySelector(".temp-box");
const currentTemp = document.querySelector(".current-temp");
const descriptDisplay= document.querySelector(".description");
const locationResponseIcon = document.querySelector(".location-response-icon");
const locationResponseName = document.querySelector(".location-response-name");
const weatherDetails = document.querySelector(".weather-details");


// caixa de erro
const errorBox = document.querySelector(".error-box");
const errorIcon = document.querySelector(".error-icon");
const errorMessage = document.querySelector(".error-message");

//evento do botao de pesquisa
const searchButton = document.querySelector(".search");
searchButton.addEventListener("click", search);

//BOTAO DE PESQUISA
const searchInput = document.querySelector(".search-bar input");
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter"){
        search();
    }
})


function search(){

    //reset
    errorBox.style.display = "none";
    tempBox.style.display = "none";

    //nome da cidade do input
    const cityName = document.querySelector(".search-bar input").value;
    if(cityName === ""){
        card.style.height = "128px";
        return;
    }

    //importar API
    const apiKey = "0269df75ad4da538eab41709e37c015a";
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    fetch(apiCall)
    .then(response => response.json())
    .then(
        result => {
            console.log(result);

            //se error
            if (result.cod == '404'){
                errorBox.style.display = "flex";
                card.style.height = "385px";
                errorIcon.classList.add("grow-in");
                errorMessage.classList.add("grow-in");
                return; 

            }

            //se sucesso
            tempBox.style.display = "flex";
            card.style.height = "720px";

            currentTemp.classList.add("grow-in");
            descriptDisplay.classList.add("grow-in");
            locationResponseIcon.classList.add("grow-in");
            locationResponseName.classList.add("grow-in");
            weatherDetails.classList.add("grow-in");
            
            //informação do clima
            const city = result.name;
            const country = result.sys.country;
            const {description, id} = result.weather[0];
            const {temp, humidity} = result.main;
            const windSpeed = result.wind.speed;

            //mandar os valores para HTML
            document.querySelector(".current-temp .num").innerText = Math.round(temp);
            document.querySelector(".description").innerText = description;
            document.querySelector(".location-response-name").innerText = `${city}, ${country}`;
            document.querySelector(".humidity").innerText = humidity + "%";
            document.querySelector(".wind-speed").innerText = windSpeed +  "Km/h";

            const weatherIcon = document.querySelector(".weather-icon img");
            if (id >= 200 && id <= 232){
                weatherIcon.src = "./image/storm.webp";
            }
            else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
                weatherIcon.src = "./image/rain.webp";
            }
            else if (id >= 600 && id <= 232){
                weatherIcon.src = "./image/snow.webp";
            }
            else if (id >= 701 && id <= 781){
                weatherIcon.src = "./image/haze.webp";
            }
            else if (id == 800){
                weatherIcon.src = "./image/clear.webp";
            }
            else if (id >= 801 && id <= 804){
                weatherIcon.src = "./image/cloud.webp";
            }
           
        }
    )
}