console.log('start');
const btn = document.getElementsByClassName('btn')[0];
const local = document.getElementById('local');
const tempr = document.getElementById('tempr');
const proxy = 'https://cors-anywhere.herokuapp.com/';
const img = document.getElementsByClassName('img')[0];
const locati = document.getElementById('location');

console.log(locati);

let lat;
let long;
console.log(navigator);
if (navigator.geolocation) //user approves location access
{

    let func = navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(lat, long);
        const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=28cc19b8c43fed9a574a60aa1c3b758e`;
        fetch(api).then(response => response.json()).then(data => {
            console.log(data);
            const {
                name
            } = data;
            const temp = Math.round(data.main.temp - 273.16);
            tempr.innerHTML = `Temperature: ${temp}°C`;
            local.innerHTML = `Location: ${name}`;
            const icon = data.weather[0].icon;
            const num = data.weather[0].id;

            img.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;

        });
    });
    btn.addEventListener('click', () => {
        getWeather(locati.value);
        locati.value = '';
    })
    const getWeather = (city) => {
        fetch(`${proxy}api.openweathermap.org/data/2.5/weather?q=${city}&appid=28cc19b8c43fed9a574a60aa1c3b758e`).then(response => response.json()).then(data => {
            console.log(data);
            const {
                name
            } = data;
            const temp = Math.round(data.main.temp - 273.16);
            tempr.innerHTML = `Temperature: ${temp}°C`;
            local.innerHTML = `Location: ${name}`;
            const icon = data.weather[0].icon;
            const num = data.weather[0].id;
            img.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
        }).catch(() => console.log('city unavailable'));
    }

}