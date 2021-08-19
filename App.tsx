import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SplashLoader } from './src/components/components'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Updates from 'expo-updates'
import Constants from 'expo-constants'
import { BottomNavigation } from './src/navigations/navigations'

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
	return (
		<SafeAreaProvider>
			{/* <SplashLoader /> */}
			<BottomNavigation />
			<StatusBar />
		</SafeAreaProvider>
	)
}
