//Selecting elements...
let shortMsgCross = document.getElementById("cross");
let cityNameErrorCross = document.getElementById("cross2")
let shortTimeMsg = document.getElementById("shortTimeMsg")
let searchBar = document.getElementById("searchBar")
let searchBTN = document.getElementById("searchBTN")
let latitude = document.getElementById("lat")
let longitude = document.getElementById("lon")
let weatherStatus = document.getElementById("wed_status")
let temp = document.getElementById("tempData")
let maxTemperature = document.getElementById("max")
let minTemperature = document.getElementById("min")
let tempFeelsLike = document.getElementById("feelsLike")
let Humidity = document.getElementById("humidity")
let pressure = document.getElementById("press")
let wind = document.getElementById("wind")
let weather_icon = document.getElementById("weather-icon")
//Variables...
let date = new Date()
let cityName = ""
const API_KEY = "86d6b0edaf026c4efc0e9aa5f74d9f75"


//Cross BTN function...
shortMsgCross.addEventListener('click', () => {
    shortTimeMsg.style.animationFillMode = "none"
})
cityNameErrorCross.addEventListener("click", () => {
    document.getElementById("cityNameError").style.display = "none"
})


//Search bar function...
searchBTN.addEventListener("click", async function getWeather() {
    let searchBarValue = searchBar.value
    if (searchBarValue === "") {
        document.getElementById("cityNameError").style.display = "flex"
    } else {

        try {
            document.getElementById("cityNameError").style.display = "none"
            //Get weather data...
            let url = `https://api.openweathermap.org/data/2.5/find?q=${searchBarValue}&units=metric&appid=${API_KEY}`
            let timeAPI = `https://www.timeapi.io/api/Time/current/coordinate?latitude=18.5196&longitude=73.8553`
            let response = await fetch(url)
            let responseJson = await response.json()
            loadingBar();
            let dataArr = [responseJson]
            //City Name
            cityName = dataArr[0].list[0].name
            document.getElementById('cityName').innerText = `${cityName},${dataArr[0].list[0].sys.country}`
            //Latitude
            latitude.innerText = dataArr[0].list[0].coord.lat
            latitude.style.color = "white"
            //Longitude
            longitude.innerText = dataArr[0].list[0].coord.lon
            longitude.style.color = "white"
            //Status
            weatherStatus.innerText = dataArr[0].list[0].weather[0].description
            //Temperature
            let cityTempInFloat = dataArr[0].list[0].main.temp
            let cityTemp = Math.round(cityTempInFloat)
            temp.innerText = cityTemp
            //Status Icon

            //part 1 : get time status... 
            let cit_lat = dataArr[0].list[0].coord.lat
            let city_long = dataArr[0].list[0].coord.lon
            let ExtendedURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${cit_lat}&lon=${city_long}&exclude=hourly,daily&appid=86d6b0edaf026c4efc0e9aa5f74d9f75`
            let responseExtenden = await fetch(ExtendedURL)
            let responseJsonExt = await responseExtenden.json()
            let dataArrExt = [responseJsonExt]
            let cityTimeDt = dataArrExt[0].current.dt
            let citySunrise = dataArrExt[0].current.sunrise
            let citySunset = dataArrExt[0].current.sunset
            let currentTimeStatus = ""
            if(cityTimeDt > citySunrise && cityTimeDt < citySunset){
                //console.log("Day")
                currentTimeStatus = "Day"
            }
            else if(cityTimeDt > citySunset && cityTimeDt > citySunrise){
                //console.log("Night")
                currentTimeStatus = "Night"
            }
            else if(cityTimeDt < citySunrise && cityTimeDt < citySunset){
                //console.log("Mid Night")
                currentTimeStatus = "Night"
            }
            console.log("Status ", currentTimeStatus )
            console.log("Time iss ", dataArrExt)

            //part 2 : Weather status 
            let city_weather_status = dataArr[0].list[0].weather[0].description
            let city_weather_main_status = dataArr[0].list[0].weather[0].main
            console.log("Main :", city_weather_main_status, city_weather_status)

            //Night part
            if(city_weather_status==="overcast clouds" && city_weather_main_status==="Clouds" && currentTimeStatus ==="Night"){
                console.log("perfect")
                weather_icon.src = "./Assests/weather/64x64/day/122.png"
            }
            else if(city_weather_status==="broken clouds" && city_weather_main_status==="Clouds" && currentTimeStatus ==="Night"){
                weather_icon.src = "./Assests/weather/64x64/day/122.png"
            }



            //Day Part



            //Max And Min temp
            let maxTempFloat = dataArr[0].list[0].main.temp_max
            let minTempFloat = dataArr[0].list[0].main.temp_min
            let maxTemp = Math.round(maxTempFloat)
            let minTemp = Math.round(minTempFloat)
            maxTemperature.innerText = maxTemp
            minTemperature.innerText = minTemp

            //Feels like
            let feelsLikeFloat = dataArr[0].list[0].main.feels_like
            tempFeelsLike.innerText =`${Math.round(feelsLikeFloat)} °c`

            //Humidity
            let humidityFloat = dataArr[0].list[0].main.humidity
            Humidity.innerText = `${Math.round(humidityFloat)} %`

            //Pressure
            let pressureData =  dataArr[0].list[0].main.pressure
            pressure.innerText = `${pressureData} mb`

            //Wind
            let windSpeed = dataArr[0].list[0].wind.speed
            let windDeg = dataArr[0].list[0].wind.deg
            wind.innerText = `${windSpeed} km/h (${windDeg}°)`


        } catch (e) {
            //Validation
            console.log("Error :", e)
            document.getElementById('errorContent').innerText = "Please Enter a valid City Name or Postalcode"
            document.getElementById("cityNameError").style.display = "flex"

        }



    }


})







//Date and weak...
let gettingMonth = date.getMonth() + 1;
let getDate = date.getDate()
let getWeek = date.getDay()

let month = ""
let day = ""
//month
switch (gettingMonth) {
    case 1:
        month = "Jan"
        break
    case 2:
        month = "Feb"
        break
    case 3:
        month = "Mar"
        break
    case 4:
        month = "Apr"
        break
    case 5:
        month = "Mey"
        break
    case 6:
        month = "Jun"
        break
    case 7:
        month = "Jul";
        break
    case 8:
        month = "Aug"
        break
    case 9:
        month = "Sep"
        break
    case 10:
        month = "Oct"
        break
    case 11:
        month = "Nov"
        break
    case 12:
        month = "Dec"
        break
    default:
        month = "Sorry there is a technical problem"
}

//week

switch (getWeek) {
    case 1:
        day = "Monday"
        break
    case 2:
        day = "Tuesday"
        break
    case 3:
        day = "Wednesday"
        break
    case 4:
        day = "Thursday"
        break
    case 5:
        day = "Friday"
        break
    case 6:
        day = "Saturday"
        break
    case 7:
        day = "Sunday"
        break
    default:
        day = "sorry technical issue"
}

document.getElementById("month").innerText = month;
document.getElementById("date").innerText = getDate
document.getElementById("day").innerText = day
//onsole.log(getWeek)