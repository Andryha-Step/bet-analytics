import React from 'react'
import { observer } from 'mobx-react-lite'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import forecasts, { Daum2 } from '../store/forecasts'
import { ScreenHeader } from '../components/components'
import Svg, { Path } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import colors from '../constants/colors'
import moment from 'moment'
import { ProgressBar } from 'react-native-paper'

interface Props {
	route: {
		params: {
			forecast: Daum2
		}
	}
}

export const ForecastScreen = observer(({ route }: Props) => {
	const navigation = useNavigation()

	return (
		<Container>
			<ScreenHeader>
				<HeaderContainer>
					<BackArrow onPress={() => navigation.goBack()}>
						<BackArrowSvg />
					</BackArrow>
					<HeaderTitle>Лента</HeaderTitle>
				</HeaderContainer>
			</ScreenHeader>
			<Scroll>
				<MainView>
					<DefaultForecast route={route} />
					<MeetingStats route={route} />
				</MainView>
			</Scroll>
		</Container>
	)
})

const Container = styled(SafeAreaView)`
	background-color: ${colors.background};
	height: 100%;
`
const Scroll = styled.ScrollView``
const MainView = styled.View``
const HeaderContainer = styled.View`
	align-items: center;
	height: 100%;
	flex-direction: row;
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

const DefaultForecast = ({ route }: Props) => {
	const { forecast } = route.params

	return (
		<>
			<DefaultHeaderContainer>
				<DefaultImageHeader source={require('../icons/default-forecast.png')} />
				<LeagueContainer>
					<SportIcon source={require('../icons/ball-football.png')} />
					<LeagueText>Футбол - {forecast.events[0].league}</LeagueText>
				</LeagueContainer>
				<DefaultHeaderBody>
					<DefaultCentralView>
						<DefaultCommandView>
							<DefaultCommandImage source={{ uri: forecast.events[0].team_1_logo }} />
							<DefaultCommandName style={{ textAlign: 'left' }}>{forecast.events[0].team_1_name}</DefaultCommandName>
						</DefaultCommandView>
						<TimerView>
							<Time route={route} />
							<TimerDesc>начало через</TimerDesc>
						</TimerView>
						<DefaultCommandView style={{ alignItems: 'flex-end' }}>
							<DefaultCommandImage source={{ uri: forecast.events[0].team_2_logo }} />
							<DefaultCommandName style={{ textAlign: 'right' }}>{forecast.events[0].team_2_name}</DefaultCommandName>
						</DefaultCommandView>
					</DefaultCentralView>

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
				</DefaultHeaderBody>
			</DefaultHeaderContainer>
		</>
	)
}

const Time = ({ route }: Props) => {
	const { forecast } = route.params
	const [time, setTime] = React.useState('')

	const getTime = () => {
		return moment(forecast.released_at)
			.subtract(moment.duration(moment().format('LTS')))
			.format('LTS')
	}

	React.useEffect(() => {
		setTime(getTime())
	}, [])

	React.useEffect(() => {
		let timeout = setTimeout(() => {
			setTime(getTime())
		}, 1000)

		return () => {
			clearTimeout(timeout)
		}
	}, [time])

	return <Timer>{time}</Timer>
}

const DefaultHeaderContainer = styled.View`
	height: 309px;
`
const DefaultImageHeader = styled.Image`
	width: 100%;
	height: 309px;
	position: absolute;
`
const LeagueContainer = styled.View`
	padding: 12px 0;
	margin: 0 16px;
	border-bottom-width: 1px;
	border-bottom-color: #25262c;
	flex-direction: row;
`
const LeagueText = styled.Text`
	font-family: Inter-Regular;
	font-size: 10px;
	color: #ffffff;
`
const SportIcon = styled.Image`
	width: 16px;
	height: 16px;
	margin-right: 6px;
`
const DefaultHeaderBody = styled.View`
	width: 100%;
	padding: 44px 32px 32px 32px;
`
const DefaultCentralView = styled.View`
	flex-direction: row;
	justify-content: center;
`
const DefaultCommandImage = styled.Image`
	height: 84px;
	width: 84px;
`
const DefaultCommandView = styled.View`
	flex-direction: column;
	flex-grow: 1;
`
const DefaultCommandName = styled.Text`
	color: #ffffff;
	text-align: center;
	margin-top: 16px;
	font-family: Inter-SemiBold;
	font-size: 16px;
	max-width: 90%;
`
const TimerView = styled.View`
	justify-content: center;
	align-items: center;
	height: 84px;
	position: absolute;
`
const Timer = styled.Text`
	font-family: Poppins-SemiBold;
	font-size: 20px;
	line-height: 22px;
	color: #ffffff;
`
const TimerDesc = styled.Text`
	font-family: Inter-Regular;
	font-size: 10px;
	line-height: 10px;
	color: #ffffff;
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

const MeetingStats = ({ route }: Props) => {
	const { forecast } = route.params
	const [percent, setPercent] = React.useState()

	const computeProgressPercent = (): number => {
		let percent = 0

		forecast.events[0].history.forEach(result => {
			const [leftRes, rightRes] = result.result.split(':')
			const compNum = 100 / forecast.events[0].history.length

			if (leftRes > rightRes) percent += compNum
		})

		return percent
	}

	return (
		<MeetingStatsContainer>
			<MeetingStatsTitle>Статистика встреч</MeetingStatsTitle>
			<MeetingStatsBlock>
				<MeetingStatsBlockHeader>
					<MeetingStatsBlockTitleView>
						<MeetingStatsBlockTitle>
							<MeetingStatsBlockCommand>
								<MeetingStatsBlockCommandIcon source={{ uri: forecast.events[0].team_1_logo }} />
								<MeetingStatsBlockCommandPercent>{computeProgressPercent()}%</MeetingStatsBlockCommandPercent>
							</MeetingStatsBlockCommand>
							<MeetingStatsBlockCommand>
								<MeetingStatsBlockCommandPercent>{100 - computeProgressPercent()}%</MeetingStatsBlockCommandPercent>
								<MeetingStatsBlockCommandIcon source={{ uri: forecast.events[0].team_2_logo }} />
							</MeetingStatsBlockCommand>
						</MeetingStatsBlockTitle>
					</MeetingStatsBlockTitleView>
					<Progress progress={computeProgressPercent() / 100} color="#2e38e4" />
				</MeetingStatsBlockHeader>
				<MeetingStatsBlockBody>
					{forecast.events[0].history.length
						? forecast.events[0].history.map(event => {
								return (
									<MeetingStatsLineView key={event.date}>
										<MeetingStatsLineDate>{event.date.split('-').slice(1).join('/')}</MeetingStatsLineDate>
										<MeetingStatsLineCommands>{event.teams}</MeetingStatsLineCommands>
										<MeetingStatsLineScore>{event.result}</MeetingStatsLineScore>
									</MeetingStatsLineView>
								)
						  })
						: null}
				</MeetingStatsBlockBody>
			</MeetingStatsBlock>
		</MeetingStatsContainer>
	)
}

const Progress = styled(ProgressBar)`
	width: 100%;
	height: 8px;
	background-color: #313235;
	margin-top: 14px;
`

const MeetingStatsContainer = styled.View`
	padding: 0 16px;
	width: 100%;
	flex-direction: column;
`
const MeetingStatsTitle = styled.Text`
	font-family: Inter-SemiBold;
	font-size: 12px;
	color: #8f919c;
`
const MeetingStatsBlock = styled.View`
	border-radius: 12px;
	flex-direction: column;
	margin-top: 12px;
	overflow: hidden;
`
const MeetingStatsBlockHeader = styled.View`
	background-color: #16161b;
	padding: 16px;
`
const MeetingStatsBlockBody = styled.View`
	background-color: #1b1c21;
	padding: 16px;
`
const MeetingStatsBlockTitleView = styled.View``
const MeetingStatsBlockTitle = styled.View`
	flex-direction: row;
	justify-content: space-between;
`
const MeetingStatsBlockCommand = styled.View`
	flex-direction: row;
	align-items: center;
`
const MeetingStatsBlockCommandIcon = styled.Image`
	width: 24px;
	height: 24px;
`
const MeetingStatsBlockCommandPercent = styled.Text`
	font-family: Inter-SemiBold;
	font-size: 12px;
	color: #ffffff;
	margin: 0 8px;
`
const MeetingStatsLineView = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`
const MeetingStatsLineDate = styled.Text`
	font-family: Inter-Regular;
	font-size: 14px;
	color: #8f919c;
`
const MeetingStatsLineCommands = styled.Text`
	font-family: Inter-SemiBold;
	font-size: 14px;
	color: #ffffff;
	text-align: center;
	max-width: 80%;
`
const MeetingStatsLineScore = styled.Text`
	font-family: Inter-Regular;
	font-size: 14px;
	color: #ffffff;
`
