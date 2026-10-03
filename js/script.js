// SCRIPT.JS

// VARIABLES
const url = "https://api.open-meteo.com/v1/forecast";
const btnSearch = document.querySelector("#btnSearch");
const temperature = document.querySelector("#temperature");
const wind = document.querySelector("#vento");
const humidity = document.querySelector("#umidade");
const temperatureAparent = document.querySelector("#sensacao");

// DEFAULT DATA
const DEFAULT_LAT = -25.9653;
const DEFAULT_LON = 32.5892;

btnSearch.addEventListener("click", () => {
	alert('⚠️ Weather search is currently unavailable')
} )

// GET LOCATION
navigator.geolocation.getCurrentPosition(
	(position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		console.log(latitude, longitude);

		const params = new URLSearchParams({
			latitude,
			longitude,
			current:
				"temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m",
		});

		getWeather(params);
	},
	(erro) => {
		console.warn(
			`⚠️ Geolocalização negada/falhou (${erro.code}): ${erro.message}`,
		);
		console.log("📍 Carregando dados da localização padrão...");

		const params = new URLSearchParams({
			DEFAULT_LAT,
			DEFAULT_LON,
			current:
				"temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m",
		});

		getWeather(params);
	},
);

// GET WEATHER
async function getWeather(params) {
	try {
		const response = await fetch(`${url}?${params}`);

		if (!response.ok) {
			if (response.status === 400) {
				throw new Error("Parâmetros inválidos: verifique as coordenadas.");
			} else if (response.status === 404) {
				throw new Error("Cidade ou localização não encontrada.");
			} else if (response.status >= 500) {
				throw new Error("Servidor da Open-Meteo fora do ar.");
			} else {
				throw new Error(`Erro desconhecido: ${response.status}`);
			}
		}

		const data = await response.json();

		renderWeather(data);
	} catch (err) {
		console.log(`❌ ERRO: ${err}`);
	}
}

// RENDER WEATHER
function renderWeather(data) {
	temperature.textContent = `${data.current.temperature_2m}${data.current_units.temperature_2m}`;

	wind.textContent = `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`;

	humidity.textContent = `${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`;

	temperatureAparent.textContent = `${data.current.apparent_temperature}${data.current_units.apparent_temperature}`;
}

// Service Worker
if ("serviceWorker" in navegator) {
  navigator.serviceWorker.register("../sw.js");
}