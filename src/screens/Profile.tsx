import React from 'react'
import { observer } from 'mobx-react-lite'
import colors from '../constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

import styled from 'styled-components/native'
import { ScreenHeader } from '../components/ScreenHeader'
import { ScrollView, Text, View } from 'react-native'
import { ProfileCard } from '../components/profile/ProfileCard'
import { StyleSheet, Switch } from 'react-native'
import { ProfileFooter } from '../components/profile/ProfileFooter'
import Svg, { Path } from 'react-native-svg'
import SwitchToggle from 'react-native-switch-toggle'
import { useNavigation } from '@react-navigation/native'
import callBottomSheeet from '../components/BottomSheet/callBottomSheeet'

interface Props {}

export const Profile = observer(({}: Props) => {
	const [notify, setNotify] = React.useState(true)
	const navigation = useNavigation()

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
			<ScreenHeader>
				<LogoContainer>
					<Logo source={require('../icons/navigations/logo.png')} />
				</LogoContainer>
			</ScreenHeader>
			<Container>
				<ScrollView contentContainerStyle={{ padding: 16 }}>
					<ProfileCard
						touchable
						onPress={() => {
							callBottomSheeet.ref?.current?.open()
						}}
					>
						<View style={styles.cardBody}>
							<Text style={styles.titleBig}>Еще не подписан?</Text>
							<Arrow />
						</View>
						<Text style={[styles.description, { maxWidth: '90%' }]}>
							Платная подписка на прогнозы сильно расширит твои финансовые границы и возможности.
						</Text>
					</ProfileCard>
					<ProfileCard
						touchable
						onPress={() => {
							navigation.navigate('Faq' as never)
						}}
					>
						<View style={styles.cardBody}>
							<View>
								<Text style={styles.title}>FAQ</Text>
								<Text style={styles.description}>Подготовили ответы на ваши вопросы</Text>
							</View>
							<Arrow />
						</View>
					</ProfileCard>
					<ProfileCard
						touchable
						onPress={() => {
							navigation.navigate('Help' as never)
						}}
					>
						<View style={styles.cardBody}>
							<View>
								<Text style={styles.title}>Поддержка</Text>
								<Text style={styles.description}>Ответим в течении 30 мин</Text>
							</View>
							<Arrow />
						</View>
					</ProfileCard>
					<ProfileCard>
						<View style={styles.cardBody}>
							<View>
								<Text style={styles.title}>Уведомления</Text>
								<Text style={styles.description}>{notify ? 'Включены' : 'Выключены'}</Text>
							</View>
							<Switch
								trackColor={{ false: '#747880', true: '#ffffff' }}
								thumbColor={notify ? '#2E38E4' : '#B8C1CC'}
								collapsable={true}
								onValueChange={() => setNotify(p => !p)}
								value={notify}
							/>
						</View>
					</ProfileCard>
					<ProfileFooter />
				</ScrollView>
			</Container>
		</SafeAreaView>
	)
})

const Container = styled.View`
	background-color: ${colors.background};
	width: 100%;
	height: 100%;
	flex: 1;
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
const styles = StyleSheet.create({
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
	titleBig: {
		fontFamily: 'Poppins-Bold',
		color: '#ffffff',
		fontSize: 22,
	},
	cardBody: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
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
