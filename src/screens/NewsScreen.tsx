import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import { NewsData } from '../store/news'
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'
import colors from '../constants/colors'
import { ScreenHeader } from '../components/ScreenHeader'
import Svg, { Path } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import moment from 'moment'
import { SkeletonImage } from '../components/SkeletonImage'
import { reportNews } from '../hooks/yandexMetrica'

interface Props {
	route: {
		params: {
			data: NewsData
		}
	}
}

export const NewsScreen = observer(({ route }: Props) => {
	const navigation = useNavigation()
	const { data } = route.params
	reportNews(
		JSON.stringify({
			id: data.id,
			title: data.title,
		})
	)

	const getDate = () => {
		const date = moment(data.created_at).format('LL')
		const [day, month, year] = date.split(' ')
		const monthBefore = month.charAt(0).toUpperCase()
		const monthAfter = month.slice(1)
		const monthName = monthBefore + monthAfter

		return `${day} ${monthName} ${year}`
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScreenHeader>
				<HeaderContainer>
					<BackArrow onPress={() => navigation.goBack()}>
						<BackArrowSvg />
					</BackArrow>
					<HeaderTitle>Новости</HeaderTitle>
				</HeaderContainer>
			</ScreenHeader>

			<ScrollView>
				<SkeletonImage uri={data.image} style={styles.image} />
				<View style={styles.body}>
					<View style={styles.sportView}>
						<SkeletonImage uri={data.sport.icon} style={styles.sportIcon} />
						<Text style={styles.sportName}>{data.sport.name.toUpperCase()}</Text>
					</View>
					<Text style={styles.newsTitle}>{data.title}</Text>
					<Text style={styles.newsText}>{data.description}</Text>
					<Text style={styles.newsDate}>{getDate()}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
})

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: colors.background,
	},
	body: {
		padding: 16,
	},
	image: {
		width: '100%',
		height: 210,
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
	},
	sportView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	sportIcon: {
		width: 16,
		height: 16,
		marginRight: 8,
		borderRadius: 16,
	},
	sportName: {
		fontFamily: 'Inter-Bold',
		fontSize: 12,
		color: '#8F919C',
	},
	newsTitle: {
		fontFamily: 'Inter-Medium',
		fontSize: 14,
		color: '#ffffff',
		marginBottom: 16,
	},
	newsText: {
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		color: '#8F919C',
		marginBottom: 12,
	},
	newsDate: {
		fontFamily: 'Inter-Regular',
		fontSize: 12,
		color: '#8F919C',
	},
})

const HeaderContainer = styled.View`
	align-items: center;
	height: 100%;
	flex-direction: row;
	width: 100%;
`
const BackArrowSvg = () => {
	return (
		<Svg width="18" height="16" viewBox="0 0 18 16" fill="none">
			<Path
				d="M7.29289 0.292893C7.68342 -0.0976311 8.31658 -0.0976311 8.70711 0.292893C9.09763 0.683418 9.09763 1.31658 8.70711 1.70711L3.414 7H17C17.5128 7 17.9355 7.38604 17.9933 7.88338L18 8C18 8.55228 17.5523 9 17 9H3.414L8.70711 14.2929C9.06759 14.6534 9.09532 15.2206 8.7903 15.6129L8.70711 15.7071C8.31658 16.0976 7.68342 16.0976 7.29289 15.7071L0.292893 8.70711L0.219689 8.62545C0.217372 8.62256 0.215071 8.61966 0.212786 8.61675C0.207285 8.60984 0.201753 8.6026 0.196334 8.59531C0.17849 8.57113 0.161719 8.54628 0.146068 8.52066C0.138607 8.50861 0.131499 8.49639 0.124671 8.48406C0.113794 8.46429 0.103377 8.44389 0.0936537 8.4231C0.0856789 8.4061 0.0781966 8.3888 0.0712256 8.37134C0.0633159 8.35158 0.0561225 8.3318 0.0495467 8.31174C0.0447288 8.29685 0.0400979 8.28146 0.0358453 8.26599C0.0298338 8.24444 0.0246396 8.22275 0.020165 8.20079C0.016702 8.18338 0.0136281 8.16595 0.0110178 8.14847C0.00376119 8.10036 0 8.05062 0 8L0.00396633 8.08925C0.0018949 8.066 0.000634706 8.04268 0.000185966 8.01935L0 8C0 7.99359 6.03044e-05 7.9872 0.000180244 7.98082C0.000599384 7.95798 0.00186552 7.93433 0.00396633 7.91075C0.00576604 7.89015 0.00811212 7.8705 0.0110192 7.85104C0.013628 7.83405 0.0167024 7.81663 0.0202403 7.79927C0.02464 7.77725 0.0298335 7.75556 0.0357208 7.73416C0.0400976 7.71854 0.0447286 7.70315 0.0497379 7.68786C0.0561223 7.6682 0.0633158 7.64842 0.071104 7.62894C0.0781965 7.61121 0.0856789 7.5939 0.0936732 7.57678C0.103377 7.55611 0.113794 7.53571 0.124876 7.51572C0.131499 7.50361 0.138607 7.49139 0.145996 7.47929C0.161719 7.45373 0.17849 7.42887 0.196313 7.40484C0.225313 7.36567 0.257499 7.32829 0.292893 7.29289L0.212786 7.38325C0.237669 7.35153 0.264427 7.32136 0.292893 7.29289L7.29289 0.292893Z"
				fill="#ffffff"
			/>
		</Svg>
	)
}
const BackArrow = styled.TouchableOpacity`
	padding: 16px;
`
const HeaderTitle = styled.Text`
	font-family: Poppins-Bold;
	font-size: 22px;
	line-height: 30px;
	color: #ffffff;
`
