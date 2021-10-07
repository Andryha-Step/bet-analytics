import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import Svg, { Circle, Path } from 'react-native-svg'
import colors from '../constants/colors'
import forecasts, { ExpressType } from '../store/forecasts'
import moment from 'moment'
import { SkeletonImage } from './SkeletonImage'

interface Props {
	forecast: ExpressType
}

export const ExpressForecastCardFull = observer(({ forecast }: Props) => {
	const sport = forecasts.getSport(forecast.sport_id)

	return (
		<Container activeOpacity={1}>
			<Body>
				<Content>
					<ConfrontationContainer>
						<ConfrontationLeft>
							<SkeletonImage style={{ width: 64, height: 64 }} uri={forecast.team_1_logo} />
						</ConfrontationLeft>
						<ConfrontationCentral>
							<BallView>
								<BallIcon source={{ uri: sport.icon }} />
							</BallView>
							<SportName>{sport.name.toUpperCase()}</SportName>
							<CommandNames>{forecast.league}</CommandNames>
						</ConfrontationCentral>
						<ConfrontationRight>
							<SkeletonImage style={{ width: 64, height: 64 }} uri={forecast.team_2_logo} />
						</ConfrontationRight>
					</ConfrontationContainer>
					<CommandNamesContainer>
						<CommandNameLeft>{forecast.team_1_name}</CommandNameLeft>
						<CommandNameRight>{forecast.team_2_name}</CommandNameRight>
					</CommandNamesContainer>
					<CoefContainer>
						<CoefLeft>
							<LeftPanel />
							<CoefTitle>КОЭФФИЦИЕНТ</CoefTitle>
							<CoefData>~{forecast.coefficient}</CoefData>
						</CoefLeft>
						<CoefRight>
							<RightPanel />
							<CoefTitle>СТАВКА</CoefTitle>
							<CoefData>{forecast.result}</CoefData>
						</CoefRight>
					</CoefContainer>
				</Content>
			</Body>
		</Container>
	)
})

const Container = styled.TouchableOpacity`
	width: 100%;
	margin-bottom: 20px;
`
const Body = styled.View`
	padding: 0 16px 4px;
	background-color: #1b1c21;
	border-radius: 8px;
`
const Content = styled.View`
	transform: translateY(-12px);
`
const ConfrontationContainer = styled.View`
	flex-direction: row;
`
const ConfrontationLeft = styled.View``
const ConfrontationCentral = styled.View`
	flex-grow: 1;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`
const ConfrontationRight = styled.View``
const CommandIcon = styled.Image`
	width: 64px;
	height: 64px;
`
const BallView = styled.View`
	background-color: #1b1c21;
	padding: 4px;
	border-radius: 24px;
`
const BallIcon = styled.Image`
	width: 24px;
	height: 24px;
`
const SportName = styled.Text`
	color: #9a9ca6;
	margin-top: 8px;
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
