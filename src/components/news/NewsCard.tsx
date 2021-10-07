import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import { View, ViewStyle, Text, TextStyle, ImageStyle, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { NewsData } from '../../store/news'
import { useNavigation } from '@react-navigation/native'
import SkeletonContent from 'react-native-skeleton-content'
import { SkeletonImage } from '../SkeletonImage'

interface Props {
	data: NewsData
}

export const NewsCard = observer(({ data }: Props) => {
	const CONTAINER: ViewStyle = {
		backgroundColor: '#1B1C21',
		borderRadius: 16,
		overflow: 'hidden',
		marginBottom: 8,
	}
	const BODY: ViewStyle = {
		backgroundColor: '#1B1C21',
		padding: 16,
	}
	const TITLE_VIEW: ViewStyle = {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	}
	const TITLE: TextStyle = {
		fontFamily: 'Inter-SemiBold',
		fontSize: 14,
		color: '#ffffff',
		flex: 1,
	}
	const DESC: TextStyle = {
		fontFamily: 'Inter-Regular',
		fontSize: 12,
		color: '#8F919C',
	}
	const ICON: ImageStyle = {
		width: 16,
		height: 16,
		marginRight: 6,
	}

	const navigation = useNavigation()

	const onPressHandler = () => {
		navigation.navigate('News' as never, { data } as never)
	}

	const getDescription = () => {
		const desc = data.description
		const maxLength = 80

		if (desc.length > maxLength) {
			return desc.slice(0, -(desc.length - maxLength)) + '...'
		}
		return desc
	}

	return (
		<TouchableOpacity style={CONTAINER} activeOpacity={1} onPress={onPressHandler}>
			<SkeletonImage uri={data.image} style={{ width: '100%', height: 160, borderRadius: 16 }} />
			<View style={BODY}>
				<View style={TITLE_VIEW}>
					<Image style={ICON} source={{ uri: data.sport.icon }} />
					<Text style={TITLE}>{data.title}</Text>
				</View>
				<Text style={DESC}>{getDescription()}</Text>
			</View>
		</TouchableOpacity>
	)
})
