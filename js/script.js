const url = "https://api.open-meteo.com/v1/forecast";

naigator.geolocation.getCurrentPosition((position) => {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;

	console.log(lat, lon);
});

const params = new URLSearchParams({
	latitude: -15.12,
	longitude: 39.27,
	current:
		"temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m",
});

async function getWeather() {
	try {
		const response = await fetch(`${url}?${params}`);

		if (!response.ok) {
			console.log("Erro: ", response.status);
		}

		const data = await response.json();

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
			}`,
		);
	} catch (err) {
		console.log(`❌ ERRO: ${err}`);
	}
}

getWeather();
