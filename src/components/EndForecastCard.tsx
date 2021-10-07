import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import Svg, { Circle, Path } from 'react-native-svg'
import colors from '../constants/colors'
import forecasts, { Daum } from '../store/forecasts'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { SkeletonImage } from './SkeletonImage'

interface Props {
	forecast: Daum
}

export const EndForecastCard = observer(({ forecast }: Props) => {
	const date = moment(forecast.released_at)
	const dateTime = date.format('LT')
	const dateDay = date.format('LL').split(' ')[0]
	const monthFirstSymbol = date.format('LL').split(' ')[1].charAt(0).toUpperCase()
	const monthLet = date.format('LL').split(' ')[1].slice(1)
	const dateMonth = monthFirstSymbol + monthLet
	const navigation = useNavigation()
	const sport = forecasts.getSport(forecast.events[0].sport_id)

	return (
		<Container activeOpacity={1} onPress={() => navigation.navigate('Forecast' as never, { forecast } as never)}>
			<CapContainer>
				<Cap color={colors.card[forecast.status]} />
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
				{forecast.status === 'returned' ? (
					<ReturnTitleContainer>
						<ReturnTitleSvg />
						<ReturnTitleText>ВОЗВРАТ</ReturnTitleText>
					</ReturnTitleContainer>
				) : null}
			</StatusTitleContainer>
		</Container>
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
	position: absolute;
	padding: 0 4px;
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
const ReturnTitleContainer = styled.View`
	flex-direction: row;
	margin-top: 8px;
	align-items: center;
	justify-content: center;
`
const ReturnTitleSvg = () => {
	return (
		<Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M6 2C7.19681 2 8.22323 2.53935 8.90347 3.5H7V4.5H10.5V1H9.5V2.63517C8.63745 1.59126 7.40212 1 6 1C3.23858 1 1 3.23858 1 6H2C2 3.79086 3.79086 2 6 2ZM6 10C4.80319 10 3.77677 9.46065 3.09653 8.5H5V7.5H1.5V11H2.5V9.36483C3.36255 10.4087 4.59788 11 6 11C8.76142 11 11 8.76142 11 6H10C10 8.20914 8.20914 10 6 10Z"
				fill="white"
			/>
			<Path
				d="M8.90347 3.5V3.65H9.19348L9.02588 3.41332L8.90347 3.5ZM7 3.5V3.35H6.85V3.5H7ZM7 4.5H6.85V4.65H7V4.5ZM10.5 4.5V4.65H10.65V4.5H10.5ZM10.5 1H10.65V0.85H10.5V1ZM9.5 1V0.85H9.35V1H9.5ZM9.5 2.63517L9.38437 2.73072L9.65 3.05221V2.63517H9.5ZM1 6H0.85V6.15H1V6ZM2 6V6.15H2.15V6H2ZM3.09653 8.5V8.35H2.80652L2.97411 8.58668L3.09653 8.5ZM5 8.5V8.65H5.15V8.5H5ZM5 7.5H5.15V7.35H5V7.5ZM1.5 7.5V7.35H1.35V7.5H1.5ZM1.5 11H1.35V11.15H1.5V11ZM2.5 11V11.15H2.65V11H2.5ZM2.5 9.36483L2.61563 9.26928L2.35 8.94779V9.36483H2.5ZM11 6H11.15V5.85H11V6ZM10 6V5.85H9.85V6H10ZM9.02588 3.41332C8.3177 2.4132 7.24578 1.85 6 1.85V2.15C7.14785 2.15 8.12876 2.6655 8.78105 3.58668L9.02588 3.41332ZM7 3.65H8.90347V3.35H7V3.65ZM7.15 4.5V3.5H6.85V4.5H7.15ZM10.5 4.35H7V4.65H10.5V4.35ZM10.35 1V4.5H10.65V1H10.35ZM9.5 1.15H10.5V0.85H9.5V1.15ZM9.65 2.63517V1H9.35V2.63517H9.65ZM6 1.15C7.35752 1.15 8.55039 1.72139 9.38437 2.73072L9.61563 2.53963C8.7245 1.46112 7.44672 0.85 6 0.85V1.15ZM1.15 6C1.15 3.32142 3.32142 1.15 6 1.15V0.85C3.15573 0.85 0.85 3.15573 0.85 6H1.15ZM2 5.85H1V6.15H2V5.85ZM6 1.85C3.70802 1.85 1.85 3.70802 1.85 6H2.15C2.15 3.8737 3.8737 2.15 6 2.15V1.85ZM2.97411 8.58668C3.6823 9.5868 4.75422 10.15 6 10.15V9.85C4.85215 9.85 3.87124 9.3345 3.21895 8.41332L2.97411 8.58668ZM5 8.35H3.09653V8.65H5V8.35ZM4.85 7.5V8.5H5.15V7.5H4.85ZM1.5 7.65H5V7.35H1.5V7.65ZM1.65 11V7.5H1.35V11H1.65ZM2.5 10.85H1.5V11.15H2.5V10.85ZM2.35 9.36483V11H2.65V9.36483H2.35ZM6 10.85C4.64248 10.85 3.44961 10.2786 2.61563 9.26928L2.38437 9.46037C3.2755 10.5389 4.55328 11.15 6 11.15V10.85ZM10.85 6C10.85 8.67858 8.67858 10.85 6 10.85V11.15C8.84427 11.15 11.15 8.84427 11.15 6H10.85ZM10 6.15H11V5.85H10V6.15ZM6 10.15C8.29198 10.15 10.15 8.29198 10.15 6H9.85C9.85 8.1263 8.1263 9.85 6 9.85V10.15Z"
				fill="white"
			/>
		</Svg>
	)
}
const ReturnTitleText = styled.Text`
	color: #ffffff;
	font-family: Inter-Bold;
	font-size: 8px;
	margin-left: 4px;
`
