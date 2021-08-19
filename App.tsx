import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SplashLoader } from './src/components/components'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Updates from 'expo-updates'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import { BottomNavigation } from './src/navigations/BottomNavigation'

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

export default function App() {
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

	return (
		<SafeAreaProvider>
			{!fontsLoaded ? <SplashLoader /> : null}
			<BottomNavigation />
			<StatusBar />
		</SafeAreaProvider>
	)
}
