import React from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

interface Props {
	children?: React.ReactNode
	onPress?: () => void
	touchable?: boolean
	blue?: boolean
}

export const ProfileCard = observer(({ children, onPress, touchable, blue }: Props) => {
	if (touchable)
		return (
			<TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: blue ? '#2E38E4' : '#1B1C21' }]} activeOpacity={0.8}>
				{children}
			</TouchableOpacity>
		)

	return <View style={[styles.container, { paddingRight: 12, backgroundColor: blue ? '#2E38E4' : '#1B1C21' }]}>{children}</View>
})

const styles = StyleSheet.create({
	container: {
		padding: 16,
		paddingRight: 20,
		borderRadius: 12,
		marginBottom: 8,
	},
})
