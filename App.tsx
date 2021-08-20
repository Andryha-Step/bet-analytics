import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SplashLoader } from './src/components/components'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Updates from 'expo-updates'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import { BottomNavigation } from './src/navigations/BottomNavigation'
import { auth } from './src/state/api'
import { ApisauceInstance } from 'apisauce'

enableScreens()

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

interface Forecasts {
	current_page: number
	data: Array<{
		id: number
		type: 'single' | string
		subscribe_type: 'free' | string
		status: null | any
		parent_id: null | any
		is_fake: number
		show_in_archive: boolean
		released_at: string
		coefficient: number
		recommended_stake: null | any
		our_forecast: string
		created_at: string
		updated_at: string
		events: Array<{
			id: number
			forecast_id: number
			sport_id: number
			league: string
			team_1_name: string
			team_2_name: string
			released_at: string
			history: Array<{
				date: string
				teams: string
				result: string
			}>
			last_game_team_1: Array<{
				date: string
				teams: string
				result: string
			}>
			last_game_team_2: Array<{
				date: string
				teams: string
				result: string
			}>
			result: string
			coefficient: number
			recommended_stake: null | any
			our_forecast: null | any
			created_at: string
			updated_at: string
			team_1_logo: string
			team_2_logo: string
			media: Array<{
				id: number
				model_type: string
				model_id: number
				uuid: string
				collection_name: string
				name: string
				file_name: string
				mime_type: string
				disk: string
				conversions_disk: string
				size: number
				manipulations: []
				custom_properties: []
				generated_conversions: {
					small: true
				}
				responsive_images: []
				order_column: number
				created_at: string
				updated_at: string
			}>
		}>
	}>
	first_page_url: string
	from: number
	last_page: number
	last_page_url: string
	links: Array<{
		url: null
		label: string
		active: false
	}>
	next_page_url: null | string
	path: string
	per_page: number
	prev_page_url: null | string
	to: number
	total: number
}

export default function App() {
	const [api, setApi] = React.useState<ApisauceInstance>()
	const [initialForecasts, setInitialForecasts] = React.useState<Forecasts>()
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

	React.useEffect(() => {
		auth().then(response => {
			setApi(response)
			response.get('/api/app/forecasts').then(response => response)
		})
	}, [])

	if (!fontsLoaded && !api && !initialForecasts) return <SplashLoader />

	return (
		<SafeAreaProvider>
			<BottomNavigation />
			<StatusBar backgroundColor="#1B1C21" style="light" />
		</SafeAreaProvider>
	)
}
