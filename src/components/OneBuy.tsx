import React from 'react'
import { observer } from 'mobx-react-lite'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ProfileCard } from './profile/ProfileCard'
import Svg, { Path } from 'react-native-svg'
import callBottomSheeet from './BottomSheet/callBottomSheeet'

interface Props {}

export const OneBuy = observer(({}: Props) => {
	return (
		<View style={styles.container}>
			<Image style={styles.bgImage} resizeMode="stretch" source={require('../icons/arrow.png')} />
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Купить прогноз</Text>
			</View>
			<View style={styles.body}>
				<ProfileCard touchable>
					<View style={styles.cardBody}>
						<View>
							<Text style={styles.title}>Единоразовая покупка</Text>
							<Text style={styles.description}>690 RUB</Text>
						</View>
						<Arrow />
					</View>
				</ProfileCard>

				<ProfileCard
					touchable
					blue
					onPress={() => {
						callBottomSheeet.ref?.current?.open()
					}}
				>
					<View style={styles.cardBody}>
						<View>
							<Text style={styles.title}>Подписка LITE</Text>
							<Text style={styles.bluePrice}>от 2390 RUB/нед</Text>
						</View>
						<Arrow />
					</View>
					<Text style={styles.blueDescription}>
						Оформляя подписку ты гарантированно получаешь до 20 качественных прогнозов в неделю с кэфом ~2
					</Text>
				</ProfileCard>
			</View>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		padding: 8,
		paddingBottom: 0,
		paddingTop: 40,
		height: 393,
		justifyContent: 'flex-end',
		overflow: 'hidden',
		borderRadius: 12,
	},
	bgImage: {
		width: 333,
		height: 374,
		position: 'absolute',
		right: 0,
		top: 0,
	},
	body: {
		// padding: 8,
		bottom: 2,
	},
	cardBody: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	description: {
		fontFamily: 'Inter-Regular',
		color: '#8F919C',
		fontSize: 12,
	},
	title: {
		fontFamily: 'Inter-Medium',
		color: '#ffffff',
		fontSize: 14,
	},
	bluePrice: {
		fontFamily: 'Inter-Regular',
		color: '#ffffff',
		fontSize: 12,
		opacity: 0.7,
	},
	blueDescription: {
		fontFamily: 'Inter-Regular',
		color: '#ffffff',
		fontSize: 10,
		marginTop: 12,
	},
	header: {
		marginBottom: 16,
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerTitle: {
		fontFamily: 'Poppins-Bold',
		fontSize: 22,
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
