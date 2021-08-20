import React from 'react'
import { observer } from 'mobx-react-lite'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Bookmakers, Feed, News, Profile } from '../screens/screens'
import { NavigationContainer } from '@react-navigation/native'
import { setStatusBarStyle, setStatusBarBackgroundColor } from 'expo-status-bar'

import styled from 'styled-components/native'

const Tab = createBottomTabNavigator()

interface Props {}

export const BottomNavigation = observer(({}: Props) => {
	const TAB_BAR_STYLE: BottomTabNavigationOptions = {
		tabBarLabelStyle: {
			marginBottom: 2,
		},
		tabBarIconStyle: {
			marginTop: 2,
		},
		tabBarStyle: {
			borderWidth: 0,
			borderTopColor: '#1B1C21',
			height: 48,
		},
	}

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarInactiveTintColor: '#99A2AD',
					tabBarActiveTintColor: '#27D8FF',
					tabBarInactiveBackgroundColor: '#1B1C21',
					tabBarActiveBackgroundColor: '#1B1C21',
				}}
			>
				<Tab.Screen
					name="Лента"
					options={{
						tabBarIcon: props => {
							if (props.focused) return <Icon source={require('../icons/navigations/feed-active.png')} />
							return <Icon source={require('../icons/navigations/feed.png')} />
						},
						...TAB_BAR_STYLE,
					}}
					component={Feed}
				/>
				<Tab.Screen
					name="Новости"
					options={{
						tabBarIcon: props => {
							if (props.focused) return <Icon source={require('../icons/navigations/news-active.png')} />
							return <Icon source={require('../icons/navigations/news.png')} />
						},
						...TAB_BAR_STYLE,
					}}
					component={News}
				/>
				<Tab.Screen
					name="Букмекеры"
					options={{
						tabBarIcon: props => {
							if (props.focused) return <Icon source={require('../icons/navigations/bookmakers-active.png')} />
							return <Icon source={require('../icons/navigations/bookmakers.png')} />
						},
						...TAB_BAR_STYLE,
					}}
					component={Bookmakers}
				/>
				<Tab.Screen
					name="Профиль"
					options={{
						tabBarIcon: props => {
							if (props.focused) return <Icon source={require('../icons/navigations/profile-active.png')} />
							return <Icon source={require('../icons/navigations/profile.png')} />
						},
						...TAB_BAR_STYLE,
					}}
					component={Profile}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
})

const Icon = styled.Image`
	width: 24px;
	height: 24px;
`
