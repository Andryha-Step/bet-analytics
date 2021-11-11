import React from 'react'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SplashLoader, SubscribePlan } from './src/components/components'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Updates from 'expo-updates'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import { Navigation } from './src/navigations/Navigation'
import { observer } from 'mobx-react-lite'
import API from './src/store/api'
import forecasts from './src/store/forecasts'
import 'moment/locale/ru'
import colors from './src/constants/colors'
import news from './src/store/news'
import onloadapp from './src/store/onloadapp'
import settings from './src/store/settings'
import faq from './src/store/faq'
import { BottomSheet } from './src/components/BottomSheet/BottomSheet'
import { OneBuy } from './src/components/OneBuy'
import { LockedBuy } from './src/components/LockedBuy'
import { NoConnection } from './src/components/NoConnection'
import callBottomSheeet from './src/components/BottomSheet/callBottomSheeet'
import NetInfo from '@react-native-community/netinfo'
import { runInAction } from 'mobx'
import connection from './src/store/connection'
import products from './src/store/products'
import * as InAppPurchases from 'expo-in-app-purchases'

// enableScreens()

async function checkUpdates() {
	const { isAvailable } = await Updates.checkForUpdateAsync()

	if (isAvailable) {
		await Updates.fetchUpdateAsync()
		Updates.reloadAsync()
	}
}
if (!Constants?.manifest?.packagerOpts?.dev) {
	checkUpdates()
}

const purchase = {
	orderId: '',
	packageName: '',
	productId: '',
	purchaseTime: 12312,
	purchaseState: 1,
	// developerPayload: ''
	purchaseToken: '',
}

const App = observer(() => {
	const [fontsLoaded] = useFonts({
		'Inter-Black': require('./src/fonts/inter/Inter-Black.ttf'),
		'Inter-Bold': require('./src/fonts/inter/Inter-Bold.ttf'),
		'Inter-ExtraBold': require('./src/fonts/inter/Inter-ExtraBold.ttf'),
		'Inter-ExtraLight': require('./src/fonts/inter/Inter-ExtraLight.ttf'),
		'Inter-Light': require('./src/fonts/inter/Inter-Light.ttf'),
		'Inter-Medium': require('./src/fonts/inter/Inter-Medium.ttf'),
		'Inter-Regular': require('./src/fonts/inter/Inter-Regular.ttf'),
		'Inter-SemiBold': require('./src/fonts/inter/Inter-SemiBold.ttf'),
		'Inter-Thin': require('./src/fonts/inter/Inter-Thin.ttf'),

		'Poppins-Black': require('./src/fonts/poppins/Poppins-Black.ttf'),
		'Poppins-BlackItalic': require('./src/fonts/poppins/Poppins-BlackItalic.ttf'),
		'Poppins-Bold': require('./src/fonts/poppins/Poppins-Bold.ttf'),
		'Poppins-BoldItalic': require('./src/fonts/poppins/Poppins-BoldItalic.ttf'),
		'Poppins-ExtraBold': require('./src/fonts/poppins/Poppins-ExtraBold.ttf'),
		'Poppins-ExtraBoldItalic': require('./src/fonts/poppins/Poppins-ExtraBoldItalic.ttf'),
		'Poppins-ExtraLight': require('./src/fonts/poppins/Poppins-ExtraLight.ttf'),
		'Poppins-ExtraLightItalic': require('./src/fonts/poppins/Poppins-ExtraLightItalic.ttf'),
		'Poppins-Italic': require('./src/fonts/poppins/Poppins-Italic.ttf'),
		'Poppins-Light': require('./src/fonts/poppins/Poppins-Light.ttf'),
		'Poppins-LightItalic': require('./src/fonts/poppins/Poppins-LightItalic.ttf'),
		'Poppins-Medium': require('./src/fonts/poppins/Poppins-Medium.ttf'),
		'Poppins-MediumItalic': require('./src/fonts/poppins/Poppins-MediumItalic.ttf'),
		'Poppins-Regular': require('./src/fonts/poppins/Poppins-Regular.ttf'),
		'Poppins-SemiBold': require('./src/fonts/poppins/Poppins-SemiBold.ttf'),
		'Poppins-SemiBoldItalic': require('./src/fonts/poppins/Poppins-SemiBoldItalic.ttf'),
		'Poppins-Thin': require('./src/fonts/poppins/Poppins-Thin.ttf'),
		'Poppins-ThinItalic': require('./src/fonts/poppins/Poppins-ThinItalic.ttf'),
	})

	;(Text as any).defaultProps = { ...(Text as any).defaultProps, allowFontScaling: false }

	const getData = () => {
		NetInfo.fetch()
			.then(r => {
				if (!r.isConnected) {
					callBottomSheeet.connectionRef?.current?.open()
					setTimeout(() => {
						getData()
					}, 1000)
					return
				}

				API.login().then(() => {
					callBottomSheeet.connectionRef?.current?.close()
					settings.getSettings()
					forecasts.getForecasts()
					forecasts.getArchive()
					forecasts.getSports()
					news.getNews()
					faq.getFaq()
				})
			})
			.catch(e => e)
	}

	React.useEffect(() => {
		getData()

		products.initProductList().then(() => {
			InAppPurchases.setPurchaseListener(({ responseCode, results, errorCode }) => {
				// Purchase was successful
				if (responseCode === InAppPurchases.IAPResponseCode.OK) {
					console.log(JSON.stringify(results, null, 2))
					results?.forEach(purchase => {
						if (!purchase.acknowledged) {
							alert(`Куплена подписка ${purchase.productId}\n\n${JSON.stringify(purchase)}`)
							// Process transaction here and unlock content...

							// Then when you're done
							InAppPurchases.finishTransactionAsync(purchase, true)
						}
					})

					return
				}

				if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
					alert('Вы отменили транзакцию')
					return
				}

				if (errorCode === 0) return alert('Произошла неизвестная или непредвиденная ошибка.')
				if (errorCode === 1)
					return alert('Функция не разрешена на текущем устройстве, или пользователь не авторизован для совершения платежей.')
				if (errorCode === 2) return alert('Сервис Play Store сейчас не подключен.')
				if (errorCode === 3) return alert('Сетевое соединение не работает.')
				if (errorCode === 4) return alert('Время ожидания запроса истекло, прежде чем Google Play ответит.')
				if (errorCode === 5) return alert('Версия Billing API не поддерживается для запрошенного типа.')
				if (errorCode === 6) return alert('Запрошенный товар недоступен для покупки.')
				if (errorCode === 7) return alert('API предоставлены неверные аргументы.')
				if (errorCode === 8) return alert('Невозможность покупки, поскольку товар уже принадлежит.')
				if (errorCode === 9) return alert('Отказ от потребления, поскольку предмет не принадлежит.')
				if (errorCode === 10) return alert('Ошибка подключения Apple Cloud Service или недопустимые разрешения.')
				if (errorCode === 11) return alert('Пользователь еще не подтвердил политику конфиденциальности Apple для Apple Music.')
				if (errorCode === 12) return alert('Приложение пытается использовать свойство, для которого у него нет необходимых прав.')
				if (errorCode === 13) return alert('Идентификатор предложения или цена, указанные в App Store Connect, больше не действительны.')
				if (errorCode === 14) return alert('Отсутствуют параметры при оплате скидки.')

				alert(`Что-то пошло не так, код ошибки: ${errorCode}`)
			})
		})
	}, [])

	if (!fontsLoaded) return <></>

	return (
		<SafeAreaProvider style={{ backgroundColor: colors.background }}>
			<BottomSheet>
				<SubscribePlan />
			</BottomSheet>
			<BottomSheet buy>
				<OneBuy />
			</BottomSheet>
			<BottomSheet locked>
				<LockedBuy />
			</BottomSheet>
			<BottomSheet connection>
				<NoConnection />
			</BottomSheet>
			{forecasts.sports && settings.settings ? <Navigation /> : null}
			<Splash />
		</SafeAreaProvider>
	)
})

const Splash = observer(() => {
	if (
		!API.token ||
		!forecasts.forecasts ||
		!forecasts.archive ||
		// !forecasts.sports ||
		// !settings.settings ||
		!faq.data ||
		!onloadapp.onLoad
	) {
		return <SplashLoader />
	}
	return <StatusBar backgroundColor="#1B1C21" style="light" />
})

export default App
