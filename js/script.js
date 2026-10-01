const url = "https://api.open-meteo.com/v1/forecast";

const params = {
  latitude: 52.52,
  longitude: 13.41,
  hourly: "temperature_2m",
};

function getWeather() {
  fetch(
    `${url}?latitude=${params.latitude}&longitude=${params.longitude}&hourly=${params.hourly}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      }
    }
  )
    .then((response) => {
      console.log(`Good ✅`);
      return response.json();
    })
    .then((data) => {
      console.log(`Dados`, data);
      // console.log(`Latitude ${data.latitude}`)
      // console.log(`Longitude ${data.longitude}`)
      
      console.log(`Coordinates: ${data.latitude}ᵒN ${data.longitude}ᵒE`)
      
      console.log(`utcOffsetSeconds ${data.utc_offset_seconds}`)
      console.log(`Hourly ${data.hourly}`)
      console.log(`Elevation ${data.elevation}`)
    })
    .catch((err) => {
      console.error(`❌ ERRO: ${err}`);
    });
}

getWeather()
