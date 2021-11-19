import React from 'react'
import { observer } from 'mobx-react-lite'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Bookmakers, Feed, News, Profile, ForecastScreen, NewsScreen, FaqScreen, HelpScreen } from '../screens/screens'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import styled from 'styled-components/native'
import settings from '../store/settings'
import { StyleSheet, View } from 'react-native'
import colors from '../constants/colors'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

interface Props {}

export const Navigation = observer(({}: Props) => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
				<Stack.Screen name="Home" component={HomeNav} />
				<Stack.Screen name="Forecast" component={ForecastScreen} />
				<Stack.Screen name="News" component={NewsScreen} />
				<Stack.Screen name="Faq" component={FaqScreen} />
				<Stack.Screen name="Help" component={HelpScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
})

const HomeNav = () => {
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
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarInactiveTintColor: '#99A2AD',
				tabBarActiveTintColor: '#27D8FF',
				// tabBarInactiveBackgroundColor: '#1B1C21',
				// tabBarActiveBackgroundColor: '#1B1C21',
				tabBarInactiveBackgroundColor: 'transparent',
				tabBarActiveBackgroundColor: 'transparent',
				headerTintColor: '#ff00ff',
				tabBarStyle: {
					backgroundColor: '#ff00ff',
				},
				tabBarItemStyle: {
					backgroundColor: '#1B1C21',
					flexDirection: 'column',
				},

				tabBarBackground: () => <View style={{ backgroundColor: '#1B1C21', ...StyleSheet.absoluteFillObject }}></View>,
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
			{settings.settings?.news ? (
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
			) : null}
			{settings.settings?.rating ? (
				<Tab.Screen
					name="Бонусы"
					options={{
						tabBarIcon: props => {
							if (props.focused) return <Icon source={require('../icons/navigations/bookmakers-active.png')} />
							return <Icon source={require('../icons/navigations/bookmakers.png')} />
						},
						...TAB_BAR_STYLE,
					}}
					component={Bookmakers}
				/>
			) : null}
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
	)
}

const Icon = styled.Image`
	width: 24px;
	height: 24px;
`
