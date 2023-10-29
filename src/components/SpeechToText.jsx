import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition'
import { useEffect, useState } from 'react'

import Geolocation from './Geolocation'

const SpeechToText = () => {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition()
	const [weatherDate, setWeatherDate] = useState('')

	useEffect(() => {
		const weatherKeyword = /temperatura|clima|tempo/.test(transcript)
		const todayKeyword = /hoje|agora/.test(transcript)
		const tomorrowKeyword = /amanha|amanhã|manha/.test(transcript)

		if (transcript && !listening) {
			if (weatherKeyword && tomorrowKeyword) {
				setWeatherDate('tomorrow')
			} else if (weatherKeyword && todayKeyword) {
				setWeatherDate('today')
			} else {
				setWeatherDate('error')
			}
		}
	}, [transcript, listening])

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn&apos;t support speech recognition.</span>
	}

	return (
		<div>
			<p>Microphone: {listening ? 'on' : 'off'}</p>
			<button onClick={SpeechRecognition.startListening}>Start</button>
			<button onClick={SpeechRecognition.stopListening}>Stop</button>
			<button onClick={resetTranscript}>Reset</button>
			<p>{transcript}</p>
			<Geolocation weatherDate={weatherDate} listening={listening} />
		</div>
	)
}
export default SpeechToText
