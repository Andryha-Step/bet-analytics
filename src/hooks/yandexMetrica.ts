import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/core'
import { YandexMetrica } from 'react-native-appmetrica-yandex'

export function reportEvent(message: string, params?: Object) {
	if (params) {
		YandexMetrica.reportEvent(message, params)
		console.log(message, params)
		return
	}
	YandexMetrica.reportEvent(message)
	console.log(message)
}

export function reportError(exception: string) {
	YandexMetrica.reportError('Ошибка', exception)
}

export function reportNavigate(name: string) {
	const isFocused = useIsFocused()
	useEffect(() => {
		if (isFocused) {
			reportEvent(`Открыл экран`, { name })
		}
	}, [isFocused])
}

export function reportOpenNews() {
	reportEvent(`news`)
}

export function reportNews(id: number) {
	reportEvent(`read_news`, { id })
}

export function reportForecast(id: number) {
	reportEvent(`Открыл текущий прогноз`, { id })
}

export function reportWaitingForecast(id: number) {
	reportEvent(`Открыл прогноз ожидающий результатов`, { id })
}

export function reportPastForecast(id: number) {
	reportEvent(`Попытка открыть прошедший прогноз`, { id })
}

export function reportPaidForecast(id?: number) {
	if (typeof id === 'number') {
		reportEvent(`Попытка открыть неприобретенный прогноз`, { id })
		return
	}
	reportError('Не указан id неприобретенного прогноза')
}

export function reportCompletedForecast(id: number) {
	reportEvent(`Открыл завершенный прогноз`, { id })
}
