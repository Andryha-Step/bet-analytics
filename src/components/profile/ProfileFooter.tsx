import React from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import app from '../../../app.json'

interface Props {}

export const ProfileFooter = observer(({}: Props) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity>
				<Text style={styles.link}>Политика конфиденциальности</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text style={styles.link}>Правила пользования</Text>
			</TouchableOpacity>
			<Text style={styles.version}>Версия: {app.expo.version}</Text>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 16,
	},
	link: {
		fontFamily: 'Inter-Regular',
		color: '#ffffff',
		fontSize: 12,
		marginBottom: 8,
	},
	version: {
		fontFamily: 'Inter-Regular',
		color: '#8F919C',
		fontSize: 8,
	},
})
