import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import Svg, { Circle, ClipPath, Path } from 'react-native-svg'
import colors from '../constants/colors'
import forecasts, { Daum } from '../store/forecasts'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { SkeletonImage } from './SkeletonImage'
import callBottomSheeet from './BottomSheet/callBottomSheeet'
import { reportPastForecast } from '../hooks/yandexMetrica'

interface Props {
	forecast: Daum
}

export const ExpressForecastCard = observer(({ forecast }: Props) => {
	const date = moment(forecast.released_at)
	const dateTime = date.format('LT')
	const dateDay = date.format('LL').split(' ')[0]
	const monthFirstSymbol = date.format('LL').split(' ')[1].charAt(0).toUpperCase()
	const monthLet = date.format('LL').split(' ')[1].slice(1)
	const dateMonth = monthFirstSymbol + monthLet
	const navigation = useNavigation()

	return (
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

				<ListView>
					{forecast.events.map((command, index) => {
						const sport = forecasts.getSport(command.sport_id)

						return (
							<ListItemView key={command.id} style={{ borderBottomWidth: Number(index < forecast.events.length - 1) }}>
								<ListItemHeader>
									<ListItemCommand>
										<SkeletonImage uri={command.team_1_logo} style={{ width: 16, height: 16 }} />
										<ListItemCommandText>{command.team_1_name}</ListItemCommandText>
									</ListItemCommand>
									<ListItemCommand>
										<ListItemCommandText>{command.team_2_name}</ListItemCommandText>
										<SkeletonImage uri={command.team_2_logo} style={{ width: 16, height: 16 }} />
									</ListItemCommand>
								</ListItemHeader>
								<ListItemSportName>{sport.name.toUpperCase()}</ListItemSportName>
							</ListItemView>
						)
					})}
				</ListView>
			</Body>
			<FooterBody>
				<CoefTitle>КОЭФФИЦИЕНТ</CoefTitle>
				<CoefData>~{forecast.coefficient}</CoefData>
			</FooterBody>

			{/* <LockedMask source={require('../icons/cards/locked.png')} /> */}

			<BottomCapContainer>
				<Cap color="#060607" />
			</BottomCapContainer>
			<StatusTitleContainer>
				<StatusTitle>
					<StatusTitleBg />
					<StatusTitleText>{forecast.subscribe_type.toUpperCase()}</StatusTitleText>
				</StatusTitle>
				<ReturnTitleContainer>
					<ReturnTitleSvg />
					<ReturnTitleText>EXPRESS</ReturnTitleText>
				</ReturnTitleContainer>
			</StatusTitleContainer>
		</Container>
	)
})

const LockedMask = styled.Image`
	width: 100%;
	height: 160%;
	position: absolute;
	border-radius: 12px;
	bottom: 0;
	resize-mode: stretch;
`

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
	position: absolute;
	padding: 0 4px;
	height: 9px;
	width: 100%;
	bottom: -1px;
`
const Body = styled.View`
	padding: 16px 16px 0;
	background-color: #1b1c21;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
`
const FooterBody = styled.View`
	padding: 16px;
	background-color: #141416;
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
	align-items: center;
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
const ReturnTitleContainer = styled.View`
	flex-direction: row;
	margin-top: 8px;
	align-items: center;
	justify-content: center;
`
const ReturnTitleSvg = () => {
	return (
		<Svg width="9" height="12" viewBox="0 0 9 12" fill="none">
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M0 7.46839H2.73949V11.7016L8.7142 4.23317H5.97471V0L0 7.46839ZM3.81792 6.38998H2.24378L4.89633 3.0743V5.31158H6.47047L3.81792 8.62726V6.38998Z"
				fill="white"
			/>
		</Svg>
	)
}
const ReturnTitleText = styled.Text`
	color: #ffffff;
	font-family: Inter-Bold;
	font-size: 8px;
	margin-left: 2px;
`
const ListView = styled.View`
	margin-top: 24px;
`
const ListItemView = styled.View`
	width: 100%;
	padding: 14px 0;
	border-bottom-color: #25262c;
`
const ListItemHeader = styled.View`
	flex-direction: row;
	justify-content: space-between;
`
const ListItemCommand = styled.View`
	align-items: center;
	flex-direction: row;
`
const ListItemCommandText = styled.Text`
	font-family: Inter-SemiBold;
	font-size: 10px;
	color: #ffffff;
	margin: 0 8px;
`
const ListItemSportName = styled.Text`
	font-family: Inter-Bold;
	font-size: 8px;
	color: #9a9ca6;
	margin-top: 16px;
	text-align: center;
`
const CoefTitle = styled.Text`
	font-family: Inter-Medium;
	font-size: 6px;
	color: #ffffff;
`
const CoefData = styled.Text`
	font-family: Poppins-SemiBold;
	font-size: 16px;
	color: #ffffff;
`
