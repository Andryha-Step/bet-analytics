import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import colors from '../constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

import styled from 'styled-components/native'
import { ScreenHeader } from '../components/ScreenHeader'
import Svg, { Path } from 'react-native-svg'
import { WebView } from 'react-native-webview'
import { apiHostUri } from '../store/api'
import SkeletonContent from 'react-native-skeleton-content'

interface Props {}

export const Bookmakers = observer(({}: Props) => {
	// const [loading, setLoading] = React.useState(true)

	return (
		<SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
			<ScreenHeader>
				<LogoContainer>
					<Logo source={require('../icons/navigations/logo.png')} />
				</LogoContainer>
			</ScreenHeader>

			{/*<Container>
				<Text style={styles.title}>Букмекеры</Text>
				<ScrollView>
					<View style={styles.body}>
						<Text style={styles.description}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ultrices eu elementum. Lorem ipsum dolor sit amet, consectetur
							adipiscing elit. Eget ultrices eu elementum.
						</Text>
						<View style={styles.table}>
							<View style={styles.tableNames}>
								<Text style={[styles.tableName, { width: '40%' }]}>КОМПАНИЯ</Text>
								<Text style={[styles.tableName, { width: '40%' }]}>БОНУС</Text>
								<Text style={[styles.tableName, { textAlign: 'right' }]}>РЕЙТИНГ</Text>
							</View>
							<TouchableOpacity style={styles.tableRow} activeOpacity={0.8}>
								<View style={styles.tableRowLeft}>
									<Image style={styles.icon} source={require('../icons/test_b.png')} />
								</View>
								<View style={styles.tableRowCentral}>
									<Text style={styles.bonus}>5000 RUB</Text>
									<Text style={styles.bonusDesc}>Стартовый бонус</Text>
								</View>
								<View style={styles.tableRowRight}>
									<StarSvg />
									<Text style={styles.rating}>3.7</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.tableRow} activeOpacity={0.8}>
								<View style={styles.tableRowLeft}>
									<Image style={styles.icon} source={require('../icons/test_b.png')} />
								</View>
								<View style={styles.tableRowCentral}>
									<Text style={styles.bonus}>5000 RUB</Text>
									<Text style={styles.bonusDesc}>Стартовый бонус</Text>
								</View>
								<View style={styles.tableRowRight}>
									<StarSvg />
									<Text style={styles.rating}>3.7</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.tableRow} activeOpacity={0.8}>
								<View style={styles.tableRowLeft}>
									<Image style={styles.icon} source={require('../icons/test_b.png')} />
								</View>
								<View style={styles.tableRowCentral}>
									<Text style={styles.bonus}>5000 RUB</Text>
									<Text style={styles.bonusDesc}>Стартовый бонус</Text>
								</View>
								<View style={styles.tableRowRight}>
									<StarSvg />
									<Text style={styles.rating}>3.7</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.tableRow} activeOpacity={0.8}>
								<View style={styles.tableRowLeft}>
									<Image style={styles.icon} source={require('../icons/test_b.png')} />
								</View>
								<View style={styles.tableRowCentral}>
									<Text style={styles.bonus}>5000 RUB</Text>
									<Text style={styles.bonusDesc}>Стартовый бонус</Text>
								</View>
								<View style={styles.tableRowRight}>
									<StarSvg />
									<Text style={styles.rating}>3.7</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.tableRow} activeOpacity={0.8}>
								<View style={styles.tableRowLeft}>
									<Image style={styles.icon} source={require('../icons/test_b.png')} />
								</View>
								<View style={styles.tableRowCentral}>
									<Text style={styles.bonus}>5000 RUB</Text>
									<Text style={styles.bonusDesc}>Стартовый бонус</Text>
								</View>
								<View style={styles.tableRowRight}>
									<StarSvg />
									<Text style={styles.rating}>3.7</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.tableRow} activeOpacity={0.8}>
								<View style={styles.tableRowLeft}>
									<Image style={styles.icon} source={require('../icons/test_b.png')} />
								</View>
								<View style={styles.tableRowCentral}>
									<Text style={styles.bonus}>5000 RUB</Text>
									<Text style={styles.bonusDesc}>Стартовый бонус</Text>
								</View>
								<View style={styles.tableRowRight}>
									<StarSvg />
									<Text style={styles.rating}>3.7</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.tableRow} activeOpacity={0.8}>
								<View style={styles.tableRowLeft}>
									<Image style={styles.icon} source={require('../icons/test_b.png')} />
								</View>
								<View style={styles.tableRowCentral}>
									<Text style={styles.bonus}>5000 RUB</Text>
									<Text style={styles.bonusDesc}>Стартовый бонус</Text>
								</View>
								<View style={styles.tableRowRight}>
									<StarSvg />
									<Text style={styles.rating}>3.7</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</Container> */}

			<WebView style={{ flex: 1, backgroundColor: colors.background }} source={{ uri: apiHostUri + '/api/app/bookmakers' }} />
		</SafeAreaView>
	)
})

const styles = StyleSheet.create({
	title: {
		fontFamily: 'Poppins-Bold',
		fontSize: 22,
		color: '#ffffff',
		marginLeft: 16,
		marginTop: 24,
	},
	description: {
		fontFamily: 'Inter-Regular',
		fontSize: 12,
		color: '#8F919C',
		maxWidth: 288,
	},
	body: {
		padding: 16,
	},
	tableNames: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	table: {
		marginTop: 32,
	},
	tableName: {
		fontFamily: 'Inter-Bold',
		fontSize: 12,
		color: '#8F919C',
		flexGrow: 1,
	},
	tableRow: {
		backgroundColor: '#1B1C21',
		borderRadius: 12,
		width: '100%',
		padding: 16,
		marginTop: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	tableRowLeft: {
		justifyContent: 'center',
		width: '40%',
	},
	tableRowCentral: {
		justifyContent: 'center',
		width: '40%',
	},
	tableRowRight: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '20%',
	},
	icon: {
		maxWidth: '60%',
		resizeMode: 'contain',
	},
	bonus: {
		fontFamily: 'Inter-SemiBold',
		fontSize: 14,
		color: '#ffffff',
	},
	bonusDesc: {
		fontFamily: 'Inter-Regular',
		fontSize: 12,
		color: '#8F919C',
	},
	rating: {
		fontFamily: 'Inter-SemiBold',
		fontSize: 14,
		color: '#ffffff',
		marginLeft: 6,
	},
})
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
const StarSvg = () => {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M15.6555 7.33965C15.977 6.97763 16.0811 6.48103 15.9355 6.01276C15.7898 5.5437 15.4246 5.20686 14.9612 5.11084L11.2341 4.34272C11.1247 4.31989 11.0304 4.24828 10.9753 4.14676L9.12344 0.687058C8.89252 0.256563 8.47218 0 7.99978 0C7.52739 0 7.10782 0.256563 6.8769 0.687058L5.02502 4.14676C4.96994 4.24828 4.87562 4.31989 4.76544 4.34272L1.03908 5.11084C0.574981 5.20686 0.210498 5.5437 0.064854 6.01276C-0.0815436 6.48103 0.0233375 6.97763 0.344811 7.33965L2.92717 10.2453C3.00263 10.3311 3.03885 10.4468 3.02526 10.5625L2.57476 14.4967C2.51892 14.9862 2.71284 15.4522 3.0962 15.7418C3.32258 15.9133 3.58444 16 3.84857 16C4.03194 16 4.21681 15.9582 4.39189 15.874L7.83981 14.2102C7.94168 14.1615 8.05788 14.1615 8.15976 14.2102L11.6084 15.874C12.0363 16.0802 12.52 16.0314 12.9034 15.7418C13.2867 15.4522 13.4814 14.9862 13.4256 14.4967L12.9743 10.5632C12.9607 10.4468 12.9969 10.3311 13.0739 10.2453L15.6555 7.33965Z"
				fill="#FFC758"
			/>
		</Svg>
	)
}
