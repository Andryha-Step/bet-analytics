import React from 'react'
import { observer } from 'mobx-react-lite'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ProfileCard } from './profile/ProfileCard'
import Svg, { Path } from 'react-native-svg'
import callBottomSheeet from './BottomSheet/callBottomSheeet'

interface Props {}

export const NoConnection = observer(({}: Props) => {
	return (
		<View style={styles.container}>
			{/* <Image style={styles.bgImage} source={require('../icons/default-forecast.png')} /> */}
			<View style={styles.body}>
				<Text style={styles.title}>Нет подключения к интернету</Text>
				<Text style={styles.descripton}>К сожалению, работа приложения без интернета невозможна.</Text>
			</View>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		overflow: 'hidden',
		borderRadius: 12,
		height: 200,
	},
	bgImage: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
	body: {
		padding: 16,
	},
	title: {
		fontFamily: 'Poppins-Bold',
		fontSize: 14,
		color: '#ffffff',
		marginBottom: 16,
	},
	descripton: {
		fontFamily: 'Inter-Regular',
		fontSize: 12,
		color: '#ffffff',
	},
})

const Arrow = () => (
	<Svg width="8" height="13" viewBox="0 0 8 13" fill="none">
		<Path
			d="M0.293458 1.7929C-0.0963294 1.40312 -0.0942035 0.769019 0.293762 0.381054L0.381608 0.293208C0.771564 -0.0967477 1.40119 -0.0993609 1.79567 0.295118L6.8797 5.37914C7.27071 5.77015 7.27418 6.40064 6.8797 6.79512L1.79567 11.8791C1.40466 12.2702 0.769574 12.269 0.381608 11.8811L0.293762 11.7932C-0.0961935 11.4033 -0.0995424 10.7744 0.293458 10.3814L4.58769 6.08713L0.293458 1.7929Z"
			fill="#B8C1CC"
		/>
	</Svg>
)
