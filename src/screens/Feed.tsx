import React from 'react'
import { observer } from 'mobx-react-lite'
import colors from '../constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import styled from 'styled-components/native'
import { ScreenHeader } from '../components/components'
import { FeedNavigation } from '../navigations/FeedNavigation'
import { Left } from './Feed/Left'
import { Right } from './Feed/Right'
import onloadapp from '../store/onloadapp'

interface Props {}

const Tab = createMaterialTopTabNavigator()

export const Feed = observer(({}: Props) => {
	return (
		<SafeAreaView style={{ backgroundColor: colors.background }}>
			<Container>
				<ScreenHeader>
					<LogoContainer>
						<Logo source={require('../icons/navigations/logo.png')} onLoad={() => onloadapp.setOnLoad(true)} />
					</LogoContainer>
				</ScreenHeader>
				<Tab.Navigator tabBar={props => <TabBarButton {...props} />}>
					<Tab.Screen name="Left" component={Left} />
					<Tab.Screen name="Right" component={Right} />
				</Tab.Navigator>
			</Container>
		</SafeAreaView>
	)
})

function TabBarButton({ navigation }: any) {
	const index = navigation.getState().index
	return <FeedNavigation index={index} />
}

const Container = styled.View`
	background-color: ${colors.background};
	width: 100%;
	height: 100%;
`
const LogoContainer = styled.View`
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`
const Logo = styled.Image`
	width: 61px;
	height: 28px;
`
const Text = styled.Text`
	color: red;
`
