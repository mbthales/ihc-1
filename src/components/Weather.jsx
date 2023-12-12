const Weather = ({ weather, weatherDate }) => {
	return (
		<div>
			{weatherDate === 'today' ? (
				<div className="container">
					<p>Temperatura: {weather.temperature}°C</p>
					<p>Sensação térmica: {weather.feelslike}°C</p>
					<img src={weather.conditionIcon} alt={weather.condition} />
				</div>
			) : (
				<div className="container">
					<p>Temperatura: {weather.temperature}°C</p>
					<p>Máxima: {weather.max}°C</p>
					<p>Mínima: {weather.min}°C</p>
					<img src={weather.conditionIcon} alt={weather.condition} />
				</div>
			)}
		</div>
	)
}

export default Weather
