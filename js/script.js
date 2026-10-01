const url = "https://api.open-meteo.com/v1/forecast";

const params = {
  latitude: 52.52,
  longitude: 13.41,
  hourly: "temperature_2m",
};

async function getWeather() {
  try {
    /* code */
    const response = await fetch(
      `${url}?latitude=${params.latitude}&longitude=${params.longitude}&hourly=${params.hourly}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      },
    );
    const data = await response.json();

    console.log(`Dados`, data);
    console.log(`Coordinates: ${data.latitude}ᵒN ${data.longitude}ᵒE`);
    console.log(`utcOffsetSeconds ${data.utc_offset_seconds}`);
    console.log(`Elevation ${data.elevation}`);
  } catch (err) {
    // error
    console.log(`❌ ERRO: ${err}`);
  }
}

getWeather();
