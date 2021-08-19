import React from 'react'
import { observer } from 'mobx-react-lite'
import { ProgressBar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setStatusBarStyle } from 'expo-status-bar'

import styled from 'styled-components/native'

interface Props {}

export const SplashLoader = observer(({}: Props) => {
	React.useEffect(() => {
		setStatusBarStyle('dark')
	}, [])

	return (
		<>
			<SplashImage source={require('../../assets/splash.png')} />
			<SafeView>
				<Progress progress={0.5} color="#2e38e4" />
			</SafeView>
		</>
	)
})

const Progress = styled(ProgressBar)`
	width: 100%;
	height: 2px;
	background-color: #313235;
	margin-bottom: 64px;
`
const SplashImage = styled.Image`
	position: absolute;
	width: 100%;
	height: 100%;
`
const SafeView = styled(SafeAreaView)`
	width: 100%;
	height: 100%;
	padding: 0 32px;
	justify-content: flex-end;
`
