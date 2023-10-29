import { useState, useEffect } from 'react'
import { useGeolocated } from 'react-geolocated'
import axios from 'axios'

import Weather from './Weather'

const Geolocation = ({ weatherDate, listening }) => {
	const [location, setLocation] = useState({})
	const [weather, setWeather] = useState({})
	const [error, setError] = useState('')
	const { coords } = useGeolocated({
		positionOptions: {
			enableHighAccuracy: true,
		},
		userDecisionTimeout: 5000,
	})

	const fetchLocationInfo = async () => {
		const key = import.meta.env.VITE_WEATHER_API_KEY

		const latitude = coords.latitude
		const longitude = coords.longitude
		let url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=2`

		const { data } = await axios.get(url)

		if (weatherDate === 'error') {
			setError('Desculpe, esse comando não é válido.')
		} else {
			setLocation({
				country: data.location.country,
				region: data.location.region,
				city: data.location.name,
			})

			if (weatherDate === 'today') {
				setWeather({
					temperature: data.current.temp_c,
					feelslike: data.current.feelslike_c,
					condition: data.current.condition.text,
					conditionIcon: data.current.condition.icon,
				})
			} else if (weatherDate === 'tomorrow') {
				setWeather({
					temperature: data.forecast.forecastday[1].day.avgtemp_c,
					max: data.forecast.forecastday[1].day.maxtemp_c,
					min: data.forecast.forecastday[1].day.mintemp_c,
					condition: data.forecast.forecastday[1].day.condition.text,
					conditionIcon: data.forecast.forecastday[1].day.condition.icon,
				})
			}
		}
	}

	useEffect(() => {
		setError('')

		if (!listening && coords && weatherDate) {
			fetchLocationInfo()
		}
	}, [weatherDate, listening])

	return (
		<div>
			{error ? (
				<p>{error}</p>
			) : (
				Object.keys(weather).length > 0 && (
					<div>
						<div>{location.country}</div>
						<div>{location.region}</div>
						<div>{location.city}</div>
						<Weather weather={weather} weatherDate={weatherDate} />
					</div>
				)
			)}
		</div>
	)
}

export default Geolocation
