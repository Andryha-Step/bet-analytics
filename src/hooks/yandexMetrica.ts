import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/core'
import { YandexMetrica } from 'react-native-appmetrica-yandex'

export function reportEvent(message: string) {
	YandexMetrica.reportEvent(message)
	console.log(message)
}

export function reportError(name: string) {
	YandexMetrica.reportError(name)
	console.log(name)
}

export function reportNavigate(name: string) {
	const isFocused = useIsFocused()
	useEffect(() => {
		if (isFocused) {
			reportEvent(`Открыл экран "${name}"`)
		}
	}, [isFocused])
}

export function reportNews(data: string) {
	reportEvent(`Открыл новость ${data}`)
}

export function reportForecast(data: string) {
	reportEvent(`Открыл текущий прогноз ${data}`)
}

export function reportWaitingForecast(data: string) {
	reportEvent(`Открыл прогноз ожидающий результатов ${data}`)
}

export function reportPastForecast(data: string) {
	reportEvent(`Попытка открыть прошедший прогноз ${data}`)
}

export function reportPaidForecast(data: string) {
	reportEvent(`Попытка открыть неприобретенный прогноз ${data}`)
}

export function reportCompletedForecast(data: string) {
	reportEvent(`Открыл завершенный прогноз ${data}`)
}
