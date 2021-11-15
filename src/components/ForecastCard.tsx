import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import Svg, { Circle, Path } from 'react-native-svg'
import colors from '../constants/colors'
import forecasts, { Daum2 } from '../store/forecasts'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { SkeletonImage } from './SkeletonImage'
import callBottomSheeet from './BottomSheet/callBottomSheeet'
import { reportPastForecast } from '../hooks/yandexMetrica'

interface Props {
	forecast: Daum2
}

export const ForecastCard = observer(({ forecast }: Props) => {
	const date = moment(forecast.released_at)
	const dateTime = date.format('LT')
	const dateDay = date.format('LL').split(' ')[0]
	const monthFirstSymbol = date.format('LL').split(' ')[1].charAt(0).toUpperCase()
	const monthLet = date.format('LL').split(' ')[1].slice(1)
	const dateMonth = monthFirstSymbol + monthLet

	const navigation = useNavigation()
	const sport = forecasts.getSport(forecast.events[0].sport_id)

	return (
		<>
			<Container
				activeOpacity={1}
				onPress={() => {
					if (moment().diff(forecast.released_at) > 0 && forecast.subscribe_type !== 'free') {
						reportPastForecast(
							JSON.stringify({
								id: forecast.id,
							})
						)
						callBottomSheeet.lockedRef?.current?.open()
						return
					}
					navigation.navigate('Forecast' as never, { forecast } as never)
				}}
			>
				<CapContainer>
					<Cap color={colors.card.default} />
				</CapContainer>
				<Body>
					<DateContainer>
						<DateTime>
							<DateText>{dateTime}</DateText>
						</DateTime>
						<DateDay>
							<DateText>
								{dateDay} {dateMonth}
							</DateText>
						</DateDay>
					</DateContainer>
					<ConfrontationContainer>
						<ConfrontationLeft>
							<SkeletonImage uri={forecast.events[0].team_1_logo} style={{ width: 64, height: 64 }} />
						</ConfrontationLeft>
						<ConfrontationCentral>
							<SkeletonImage uri={sport.icon} style={{ width: 24, height: 24, borderRadius: 24 }} />
							<SportName>{sport.name.toUpperCase()}</SportName>
							<CommandNames>{forecast.events[0].league}</CommandNames>
						</ConfrontationCentral>
						<ConfrontationRight>
							<SkeletonImage uri={forecast.events[0].team_2_logo} style={{ width: 64, height: 64 }} />
						</ConfrontationRight>
					</ConfrontationContainer>
					<CommandNamesContainer>
						<CommandNameLeft>{forecast.events[0].team_1_name}</CommandNameLeft>
						<CommandNameRight>{forecast.events[0].team_2_name}</CommandNameRight>
					</CommandNamesContainer>
					<CoefContainer>
						<CoefLeft>
							<LeftPanel />
							<CoefTitle>КОЭФФИЦИЕНТ</CoefTitle>
							<CoefData>~{forecast.events[0].coefficient}</CoefData>
						</CoefLeft>
						<CoefRight>
							<RightPanel />
							<CoefTitle>СТАВКА</CoefTitle>
							<CoefData>{forecast.events[0].result}</CoefData>
						</CoefRight>
					</CoefContainer>
				</Body>

				<BottomCapContainer>
					<Cap color="#060607" />
				</BottomCapContainer>
				<StatusTitleContainer>
					<StatusTitle>
						<StatusTitleBg />
						<StatusTitleText>{forecast.subscribe_type.toUpperCase()}</StatusTitleText>
					</StatusTitle>
				</StatusTitleContainer>
			</Container>
		</>
	)
})

const Container = styled.TouchableOpacity`
	width: 100%;
`
const Cap = ({ color }: { color?: string }) => {
	return (
		<Svg preserveAspectRatio="none" width="100%" height="9" viewBox="0 0 300 9" fill="none">
			<Circle r="1240" cx="150" cy="1240" fill={color || '#ff00ff'} />
		</Svg>
	)
}
const CapContainer = styled.View`
	padding: 0 4px;
	top: 0.2px;
`
const BottomCapContainer = styled.View`
	padding: 0 4px;
	position: absolute;
	height: 9px;
	width: 100%;
	bottom: -1px;
`
const Body = styled.View`
	padding: 16px;
	background-color: #1b1c21;
	border-radius: 8px;
`
const StatusTitleContainer = styled.View`
	width: 100%;
	align-items: center;
	position: absolute;
	top: 0.4px;
`
const StatusTitle = styled.View`
	border-radius: 48px;
	align-items: center;
	justify-content: center;
`
const StatusTitleBg = () => {
	return (
		<Svg width="77" height="22" viewBox="0 0 77 22" fill="none">
			<Path
				d="M56.25 22H20.75C9.29009 22 4.41729 11.453 0 0.500003C36.5 -2.00001 40.5 -2 77 0.500039C72.5827 11.453 67.7099 22 56.25 22Z"
				fill="#141416"
			/>
		</Svg>
	)
}
const StatusTitleText = styled.Text`
	color: #ffffff;
	margin-top: 14px;
	font-family: Inter-Bold;
	font-size: 12px;
	position: absolute;
`
const DateContainer = styled.View`
	flex-direction: row;
	height: 10px;
`
const DateTime = styled.View`
	flex-grow: 1;
	align-items: flex-start;
`
const DateDay = styled.View`
	flex-grow: 1;
	align-items: flex-end;
`
const DateText = styled.Text`
	font-family: Inter-Regular;
	font-size: 12px;
	line-height: 12px;
	color: #ffffff;
`
const ConfrontationContainer = styled.View`
	flex-direction: row;
	margin-top: 20px;
`
const ConfrontationLeft = styled.View``
const ConfrontationCentral = styled.View`
	flex-grow: 1;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`
const ConfrontationRight = styled.View``
const BallIcon = styled.Image`
	width: 24px;
	height: 24px;
`
const SportName = styled.Text`
	color: #9a9ca6;
	margin-top: 12px;
	font-family: Inter-Bold;
	font-size: 8px;
	line-height: 8px;
`
const CommandNames = styled.Text`
	color: #ffffff;
	margin-top: 12px;
	font-family: Inter-Medium;
	font-size: 8px;
	line-height: 8px;
	text-align: center;
	max-width: 60%;
`
const CommandNamesContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-top: 16px;
`
const CommandNameLeft = styled.Text`
	color: #ffffff;
	font-family: Inter-SemiBold;
	font-size: 10px;
	line-height: 10px;
	max-width: 40%;
`
const CommandNameRight = styled.Text`
	color: #ffffff;
	font-family: Inter-SemiBold;
	font-size: 10px;
	line-height: 10px;
	max-width: 40%;
	text-align: right;
`
const LeftPanel = () => {
	return (
		<Svg style={{ position: 'absolute' }} width="92" height="45" viewBox="0 0 92 45" fill="none">
			<Path
				d="M0 8C0 3.58172 3.58172 0 8 0H84C88.4183 0 92 3.58172 92 8V32.423C92 36.6726 88.6775 40.1806 84.4341 40.4112L8.43414 44.5416C3.85203 44.7906 0 41.1423 0 36.5534V8Z"
				fill="#16161B"
			/>
		</Svg>
	)
}

const RightPanel = () => {
	return (
		<Svg style={{ position: 'absolute' }} width="92" height="45" viewBox="0 0 92 45" fill="none">
			<Path
				d="M0 8C0 3.58172 3.58172 0 8 0H84C88.4183 0 92 3.58172 92 8V36.5534C92 41.1423 88.148 44.7906 83.5659 44.5416L7.56587 40.4112C3.32254 40.1806 0 36.6726 0 32.423V8Z"
				fill="#16161B"
			/>
		</Svg>
	)
}

const CoefContainer = styled.View`
	flex-direction: row;
	margin-top: 16px;
	justify-content: space-between;
`
const CoefLeft = styled.View`
	height: 44px;
	width: 92px;
	justify-content: center;
	flex-direction: column;
	padding-top: 6px;
`
const CoefRight = styled.View`
	height: 44px;
	width: 92px;
	justify-content: center;
	flex-direction: column;
	padding-top: 6px;
`
const CoefTitle = styled.Text`
	color: #9a9ca6;
	font-family: Inter-Medium;
	font-size: 6px;
	line-height: 6px;
	text-align: center;
`
const CoefData = styled.Text`
	color: #ffffff;
	font-family: Poppins-SemiBold;
	font-size: 16px;
	text-align: center;
`
