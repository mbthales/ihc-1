import { useState, useEffect } from 'react'
import { useGeolocated } from 'react-geolocated'
import axios from 'axios'

const Geolocation = () => {
	const [location, setLocation] = useState({})
	const [weather, setWeather] = useState({})
	const { coords, isGeolocationAvailable, isGeolocationEnabled } =
		useGeolocated({
			positionOptions: {
				enableHighAccuracy: true,
			},
			userDecisionTimeout: 5000,
		})

	const getAddress = async () => {
		const key = import.meta.env.VITE_WEATHER_API_KEY
		const latitude = coords.latitude
		const longitude = coords.longitude

		const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${latitude},${longitude}`
		const { data } = await axios.get(url)

		setLocation({
			country: data.location.country,
			region: data.location.region,
			city: data.location.name,
		})

		setWeather({
			temp: data.current.temp_c,
			feelsLike: data.current.feelslike_c,
			condition: data.current.condition.text,
			conditionIcon: data.current.condition.icon,
		})
	}

	useEffect(() => {
		if (coords) {
			getAddress()
		}
	}, [coords])

	return !isGeolocationAvailable ? (
		<div>Your browser does not support Geolocation</div>
	) : !isGeolocationEnabled ? (
		<div>Geolocation is not enabled</div>
	) : coords ? (
		<>
			<div>Country: {location.country}</div>
			<div>Region: {location.region}</div>
			<div>City: {location.city}</div>
			<div>Temperature: {weather.temp} graus</div>
			<div>Feels like: {weather.feelsLike} graus</div>
			<div>Condition: {weather.condition}</div>
			<img src={weather.conditionIcon} alt={weather.condition} />
		</>
	) : (
		<div>Getting the location data&hellip; </div>
	)
}

export default Geolocation
