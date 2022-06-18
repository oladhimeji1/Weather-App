const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOtput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.conditon');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

// Default city when the page is loaded
var cityInput = 'Lagos';

// Add a click event to each city in the pannel
cities.forEach(city =>{
    city.addEventListener('click', e=>{
        // Change from default city the the clicked city
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        // app.style.opacity = 0;
    });
});

// Add submit event to the form
form.addEventListener('submit', e=>{
    if(search.value.length == 0){
    alert('Please type in a city name');
    // fetchWeatherData();
}else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = '';
}
// Prevent the default behaviour of the form
e.preventDefault();

});

function dayOfTheWeek(day, month, year){
    const weekday = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

function fetchWeatherData() {
    // const api = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=56e0e24ec2e1880720e54c034209cc6d`;
    const Api2 = `http://api.weatherapi.com/v1/current.json?key=a814bc6191b642d593612540221806&q=${cityInput}&aqi=no`
    fetch(Api2)
    
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            temp.innerHTML = data.current.temp_c + '&#176;C';
            document.getElementById('xx').innerHTML = data.current.temp_f + ' F';
            conditionOutput.innerHTML = data.current.condition.text;

            const date = data.location.localtime;
            const y = parseInt(date.substr(0,4));
            const m = parseInt(date.substr(5,2));
            const d = parseInt(date.substr(8,2));
            const time = date.substr(11);

            dateOtput.innerHTML = `${dayOfTheWeek(d,m,y)}, ${d}/${m}/${y}`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;

            const iconId = data.current.condition.icon.substr('//cdn.weatherapi.com/weather/64x64/'.length);
            icon.src = '../icons' + iconId;

            cloudOutput.innerHTML = data.current.cloud + '%';
            humidityOutput.innerHTML = data.current.humidity + '%';
            windOutput.innerHTML = data.current.wind_kph + 'km/h';

            var timeOfDay = 'day';
            const code = data.current.condition.code;

            if(!data.current.is_day){
                timeOfDay = 'night';
            }

            if(code === 1000){
                app.style.backgroundImage = `url(../img/${timeOfDay}/clear.jpg)`;
                btn.style.background = '#e5ba92';
                if(timeOfDay == 'night'){
                    btn.style.background = '#181e27'
                }
            } else {
                app.style.backgroundImage = `url(../img/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = '#fa6d1b';
            }

        });
    };
