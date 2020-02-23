
const myApiKey = "58ac277572e36e5c90d1cf24f7661447";


const toCelsius = (temp) =>  {return temp-273.15;}

const loadData = () => {

    //ask the user's coords
    navigator.geolocation.getCurrentPosition( (position) =>{
        const posX = position.coords.latitude;
        const posY = position.coords.longitude;
        
        pos = {posX,posY};
        makeRequest(pos);

    });

    return "1";
}

const makeRequest = (pos) =>{
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?lat="+pos.posX+"&lon="+pos.posY+"&appid="+myApiKey,
        dataType: "json",
        success: (result) => {
            console.log(result);
            setData(result);
        }
    });
}

const setData = (res) =>{
    const tempElement = $(".card-temp p");
    const pressureElement = $(".card-pressure p");
    const humidityElement = $(".card-humidity p");

    const temp = Math.round(toCelsius(parseFloat(res.main.temp)));
    const humidity = res.main.humidity;
    const pressure = res.main.pressure;

    tempElement.text(temp+"ºC");
    pressureElement.text(pressure);
    humidityElement.text(humidity+"%");
}


$(document).ready( () => {
    
    loadData();

  });