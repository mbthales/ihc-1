const Weather = ({ weather, weatherDate }) => {
	return (
		<div>
			{weatherDate === 'today' ? (
				<div>
					<p>Temperatura: {weather.temperature}°C</p>
					<p>Sensação térmica: {weather.feelslike}°C</p>
					<p>Condição: {weather.condition}</p>
					<img src={weather.conditionIcon} alt={weather.condition} />
				</div>
			) : (
				<div>
					<p>Temperatura: {weather.temperature}°C</p>
					<p>Máxima: {weather.max}°C</p>
					<p>Mínima: {weather.min}°C</p>
					<p>Condição: {weather.condition}</p>
					<img src={weather.conditionIcon} alt={weather.condition} />
				</div>
			)}
		</div>
	)
}

export default Weather
