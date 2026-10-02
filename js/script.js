const url = "https://api.open-meteo.com/v1/forecast";
const temperatura = document.querySelector("#temperature");
const vento = document.querySelector("#vento");
const umidade = document.querySelector("#umidade");
const sensacao = document.querySelector("#sensacao");

navigator.geolocation.getCurrentPosition((position) => {
  
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

	console.log(latitude, longitude);

  const params = new URLSearchParams({
	  latitude,
	  longitude,
	  current: "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m",
  });

  getWeather(params);

});

async function getWeather(params) {
	try {
		const response = await fetch(`${url}?${params}`);

		if (!response.ok) {
			console.log("Erro: ", response.status);
		}

		const data = await response.json()
    
		console.log(`Coordinates: ${data.latitude}ᵒN ${data.longitude}ᵒE`);
		console.log(
			`Temperature ${data.current.temperature_2m}${data.current_units.temperature_2m}`,
		);
		console.log(
			`Wind Speed ${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`,
		);
		console.log(
			`Humidity ${data.current.relative_humidity_2m}${
				data.current_units.relative_humidity_2m
			}`,
		);
		console.log(
			`Apparent temperature ${data.current.apparent_temperature}${
				data.current_units.apparent_temperature
			}`,);

      temperatura.textContent = `${data.current.temperature_2m}${data.current_units.temperature_2m}`;
      
      vento.textContent = `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`;
    
      umidade.textContent = `${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`;
    
      sensacao.textContent = `${data.current.apparent_temperature}${data.current_units.apparent_temperature}`;
	} catch (err) {
		console.log(`❌ ERRO: ${err}`);
	}
}
