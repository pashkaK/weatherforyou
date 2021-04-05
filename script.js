// Get DOM nodes
let humidity = getElement('humidity'),
    temperature = getElement('temperature'),
    wind_speed = getElement('wind_speed'),
    pressure = getElement('pressure'),
    button = getElement('button'),
    description = getElement('description'),
    inputBtn = getElement('search__btn'),
    inputValue = getElement('search__value'),
    icon = document.querySelector(".icon"),
    cityName = getElement('city__name'),
    weatherIcon = getElement('iconImg');
let content = document.querySelector('main');
// Helper for getting DOM nodes
function getElement(id) {
    return document.getElementById(id);
}

// Get coordinates
function getCurrentPosition() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            getRemoteData(position.coords.latitude, position.coords.longitude)
        })
    } else {
        alert('Not available in your browser');
    }   
}
// fetch remote data
function getRemoteData(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}` + `&appid=c4edb83b7203fc062d290615127d82e6`)
        .then(response => response.json())
        .then(response => displayData(response))
        // .catch(error => console.error(error))
}

//track the enter on the input
function handleKeyPress(e){
    let key = e.keyCode || e.which;
    if (key === 13){ //Enter
        getRemoteDataByCityName();
        inputValue.value = '';
    }
    
}

// display remote data 
function displayData(data) {
    humidity.querySelector('span').innerText = data.main.humidity;
    temperature.querySelector('span').innerText = ((data.main.temp) - 273).toFixed(0);
    wind_speed.querySelector('span').innerText = data.wind.speed;
    pressure.querySelector('span').innerText = ((data.main.pressure) / 1.333).toFixed(0);
    cityName.innerText = data.name;
    let descriptionRezult = data.weather[0].description;
    description.innerText = descriptionRezult.charAt(0).toUpperCase() + descriptionRezult.slice(1);
    weatherIcon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';

    changeBackground(data);

    inputValue.value = '';
    // icon.innerHTML = data.weather[0].icon;
    // console.log(data);
} 
// fetch remote data from input 
function getRemoteDataByCityName() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+ inputValue.value + `&appid=c4edb83b7203fc062d290615127d82e6`)
    .then(response => response.json())
    .then(response => displayData(response))
    // .catch(error => console.error(error))
}
// function to change background
function changeBackground(data) {
    switch (data.weather[0].main) {
        case 'Clear' :
            content.style.backgroundImage = 'url("images/clear.jpeg")';
            break;
        case 'Clouds' :
            content.style.backgroundImage = 'url("images/cloudy.jpeg")';
            break;
        case 'Rain' :
        case 'Drizzle' :
        case 'Mist':
            content.style.backgroundImage = 'url("images/rain.jpeg")';
            break;
        case 'ThunderStorm' :
            content.style.backgroundImage = 'url("images/storm.jpeg")';
            break;
        case 'Snow' :
            content.style.backgroundImage = 'url("images/snow.jpeg")';
            break;
        default :
            content.style.backgroundImage = 'url("images/default.jpeg")';
            break;
    }
}
// Initialize click event to get remote data
document.addEventListener("DOMContentLoaded", getCurrentPosition);
inputBtn.addEventListener('click', getRemoteDataByCityName);
