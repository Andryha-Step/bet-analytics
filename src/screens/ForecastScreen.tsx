import React, { ComponentProps } from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import forecasts, { Daum2, LastGameTeam } from '../store/forecasts'
import { ExpressForecastCardFull, ScreenHeader } from '../components/components'
import Svg, { Circle, Path } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import colors from '../constants/colors'
import moment from 'moment'
import { ProgressBar } from 'react-native-paper'
import { Dimensions, ScrollView, ToastAndroid, View } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion'

interface Props {
	route: {
		params: {
			forecast: Daum2
		}
	}
}

export const ForecastScreen = observer(({ route }: Props) => {
	const navigation = useNavigation()
	const { forecast } = route.params

	return (
		<SafeAreaView style={{ flexGrow: 1, backgroundColor: colors.background }}>
			<Container>
				<ScreenHeader>
					<HeaderContainer>
						<MainHeaderView>
							<BackArrow onPress={() => navigation.goBack()}>
								<BackArrowSvg />
							</BackArrow>
							<HeaderTitle>Лента</HeaderTitle>
						</MainHeaderView>
						{forecast.type === 'express' ? <ExpressHeader route={route}></ExpressHeader> : null}
					</HeaderContainer>
				</ScreenHeader>
				<View style={{ flex: 1 }}>
					<View style={{ flexGrow: 1 }}>
						<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
							{forecast.type === 'single' ? <DefaultForecast route={route} /> : null}
							{forecast.type === 'express' ? <ExpressForecast route={route} /> : null}

							{forecast.our_forecast.trim() ? <ForecastEvent text={forecast.our_forecast} /> : null}
						</ScrollView>
					</View>
				</View>
			</Container>
		</SafeAreaView>
	)
})

const MainHeaderView = styled.View`
	align-items: center;
	height: 100%;
	flex-direction: row;
`
const Container = styled.View`
	background-color: ${colors.background};
	flex-grow: 1;
`
const HeaderContainer = styled.View`
	align-items: center;
	height: 100%;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
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

	const getStatusText = () => {
		if (forecast.status === 'passed') return 'ПРОШЕЛ'
		if (forecast.status === 'failed') return 'НЕ ПРОШЕЛ'
		if (forecast.status === 'returned') return 'ВОЗВРАТ'
		return ''
	}

	return (
		<DefaultHeaderContainer>
			<DefaultImageHeader source={require('../icons/default-forecast.png')} />
			<LeagueContainer>
				<SportIcon source={{ uri: forecasts.getSport(forecast.events[0].sport_id).icon }} />
				<LeagueText>
					{forecasts.getSport(forecast.events[0].sport_id).name} - {forecast.events[0].league}
				</LeagueText>
			</LeagueContainer>
			<DefaultHeaderBody>
				<DefaultCentralView>
					<DefaultCommandView>
						<DefaultCommandImage source={{ uri: forecast.events[0].team_1_logo }} />
						<DefaultCommandName style={{ textAlign: 'left' }}>{forecast.events[0].team_1_name}</DefaultCommandName>
					</DefaultCommandView>
					<TimerView>
						{!forecast.status ? (
							<>
								{moment().diff(forecast.released_at) < 0 ? (
									<>
										<Time timestamp={forecast.released_at} subscribeType={forecast.subscribe_type} />
										<TimerDesc>начало через</TimerDesc>
									</>
								) : (
									<TimerDesc>Ожидает{'\n'}результатов</TimerDesc>
								)}
							</>
						) : (
							<>
								<EndTimeIndicator color={colors.card[forecast.status]} />
								<EndTimeTitle>{getStatusText()}</EndTimeTitle>
							</>
						)}
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

			<View style={{ marginBottom: 32 }}>
				{forecast.events[0].history.length && forecast.events[0].history[0].date ? <MeetingStats route={route} /> : null}
				{forecast.events[0].last_game_team_1.length ? (
					<MeetingStatsTitle style={{ paddingLeft: 16, paddingRight: 16, marginBottom: 4 }}>Статистика последних матчей</MeetingStatsTitle>
				) : null}
				{forecast.events[0].last_game_team_1.length ? (
					<LastForecastsHistory
						name={forecast.events[0].team_1_name}
						logo={forecast.events[0].team_1_logo}
						data={forecast.events[0].last_game_team_1}
					/>
				) : null}
				{forecast.events[0].last_game_team_2.length ? (
					<LastForecastsHistory
						name={forecast.events[0].team_2_name}
						logo={forecast.events[0].team_2_logo}
						data={forecast.events[0].last_game_team_2}
					/>
				) : null}
			</View>
		</DefaultHeaderContainer>
	)
}

const Time = ({ timestamp, subscribeType }: { timestamp: string; subscribeType: 'pro' | 'lite' | 'free' }) => {
	const [time, setTime] = React.useState('')
	const navigation = useNavigation()

	const getTime = () => {
		return moment(timestamp)
			.subtract(moment.duration(moment().format('LTS')))
			.format('LTS')
	}

	React.useEffect(() => {
		setTime(getTime())
	}, [])

	React.useEffect(() => {
		if (moment().diff(timestamp) > 0 && subscribeType !== 'free') {
			forecasts.getForecasts()
			navigation.goBack()
			ToastAndroid.showWithGravity('Событие началось. Прогноз недоступен.', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
		}

		let timeout = setTimeout(() => {
			setTime(getTime())
		}, 1000)

		return () => {
			clearTimeout(timeout)
		}
	}, [time])

	return <Timer>{time}</Timer>
}

const EndTimeIndicator = ({ color }: { color: string }) => {
	return (
		<Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
			<Circle cx="5" cy="5" r="5" fill={color} />
		</Svg>
	)
}
const EndTimeTitle = styled.Text`
	font-family: Poppins-SemiBold;
	font-size: 20px;
	color: #ffffff;
`
const DefaultHeaderContainer = styled.View`
	flex-grow: 1;
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
	align-items: center;
`
const LeagueText = styled.Text`
	font-family: Inter-Regular;
	font-size: 10px;
	color: #ffffff;
	flex: 1;
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
	flex: 1;
`
const DefaultCommandName = styled.Text`
	color: #ffffff;
	text-align: center;
	margin-top: 16px;
	font-family: Inter-SemiBold;
	font-size: 16px;
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
	color: #ffffff;
`
const TimerDesc = styled.Text`
	font-family: Inter-Regular;
	font-size: 10px;
	line-height: 10px;
	color: #ffffff;
	text-align: center;
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

	const computeProgressPercent = (): number => {
		let percent = 0

		forecast.events[0].history.forEach(result => {
			if (!result.result) return
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
								<MeetingStatsBlockCommandPercent>{computeProgressPercent().toFixed(0)}%</MeetingStatsBlockCommandPercent>
							</MeetingStatsBlockCommand>
							<MeetingStatsBlockCommand>
								<MeetingStatsBlockCommandPercent>{(100 - computeProgressPercent()).toFixed(0)}%</MeetingStatsBlockCommandPercent>
								<MeetingStatsBlockCommandIcon source={{ uri: forecast.events[0].team_2_logo }} />
							</MeetingStatsBlockCommand>
						</MeetingStatsBlockTitle>
					</MeetingStatsBlockTitleView>
					<Progress progress={computeProgressPercent() / 100} color="#2e38e4" />
				</MeetingStatsBlockHeader>
				<MeetingStatsBlockBody>
					{forecast.events[0].history.length
						? forecast.events[0].history.map((event, index) => {
								if (!event.date) return

								const [leftRes, rightRes] = event.result.split(':')
								const [leftTeam, rightTeam] = event.teams.split(' - ')

								return (
									<MeetingStatsLineView key={event.date} style={{ marginBottom: index < forecast.events[0].history.length - 1 ? 16 : 0 }}>
										<MeetingStatsLineDate>{event.date.split('-').slice(1).join('/')}</MeetingStatsLineDate>

										{/* <MeetingStatsLineCommands>{event.teams}</MeetingStatsLineCommands> */}
										<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
											<View style={{ alignItems: 'flex-end', flex: 1 }}>
												<MeetingStatsLineCommands style={{ flex: 1 }}>{leftTeam}</MeetingStatsLineCommands>
											</View>

											<MeetingStatsLineCommands style={{ width: 16 }}> - </MeetingStatsLineCommands>

											<View style={{ alignItems: 'flex-start', flex: 1 }}>
												<MeetingStatsLineCommands style={{ flex: 1 }}>{rightTeam}</MeetingStatsLineCommands>
											</View>
										</View>

										<View style={{ flexDirection: 'row', justifyContent: 'center', width: 26 }}>
											<MeetingStatsLineScore>{leftRes}</MeetingStatsLineScore>
											<MeetingStatsLineScore>:</MeetingStatsLineScore>
											<MeetingStatsLineScore>{rightRes}</MeetingStatsLineScore>
										</View>
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
	flex-direction: column;
	margin-bottom: 16px;
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
	align-items: center;
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
	min-width: 44px;
`
const MeetingStatsLineCommands = styled.Text`
	font-family: Inter-SemiBold;
	font-size: 14px;
	color: #ffffff;
	text-align: center;
`
const MeetingStatsLineScore = styled.Text`
	font-family: Inter-Regular;
	font-size: 14px;
	color: #ffffff;
`

const LastForecastsHistory = ({ data, logo, name }: any) => {
	const lastGames = data as LastGameTeam[]
	const logoUri = logo as string
	const commandName = name as string

	const [show, setShow] = React.useState(false)

	return (
		<LastForecastsStatsBlock>
			<Accordion
				activeSections={[show ? Number(!show) : -1]}
				sections={['Command']}
				renderHeader={() => (
					<LastForecastsBlockHeader>
						<MeetingStatsBlockTitleView>
							<MeetingStatsBlockTitle>
								<MeetingStatsBlockCommand>
									<MeetingStatsBlockCommandIcon source={{ uri: logoUri }} />
									<MeetingStatsBlockCommandPercent>{commandName}</MeetingStatsBlockCommandPercent>
								</MeetingStatsBlockCommand>
								<CollapseArrow show={show} />
							</MeetingStatsBlockTitle>
						</MeetingStatsBlockTitleView>
					</LastForecastsBlockHeader>
				)}
				renderContent={() => (
					<MeetingStatsBlockBody style={{ paddingTop: 0 }}>
						{lastGames.map((event, index) => {
							if (!event.date) return
							const [leftRes, rightRes] = event.result.split(':')

							const computeIndicatorColor = (): string => {
								if (leftRes > rightRes) return colors.card.green
								if (leftRes < rightRes) return colors.card.red
								return '#FFB92E'
							}

							return (
								<MeetingStatsLineView key={event.date + event.teams} style={{ marginBottom: index < lastGames.length - 1 ? 16 : 0 }}>
									<MeetingStatsLineDate>{event.date.split('-').slice(1).join('/')}</MeetingStatsLineDate>
									<MeetingStatsLineCommands>{event.teams}</MeetingStatsLineCommands>
									<ScoreBlock>
										<Indicator color={computeIndicatorColor()} />
										<View style={{ flexDirection: 'row', justifyContent: 'center', width: 26 }}>
											<MeetingStatsLineScore>{leftRes}</MeetingStatsLineScore>
											<MeetingStatsLineScore>:</MeetingStatsLineScore>
											<MeetingStatsLineScore>{rightRes}</MeetingStatsLineScore>
										</View>
									</ScoreBlock>
								</MeetingStatsLineView>
							)
						})}
					</MeetingStatsBlockBody>
				)}
				onChange={e => {
					setShow(prev => !prev)
				}}
			/>
		</LastForecastsStatsBlock>
	)
}

const CollapseArrow = ({ show }: { show: boolean }) => {
	return (
		<Svg style={{ transform: [{ rotate: `${show ? 180 : 0}deg` }] }} width="13" height="8" viewBox="0 0 13 8" fill="none">
			<Path
				d="M1.7929 7.70654C1.40312 8.09633 0.769019 8.0942 0.381054 7.70624L0.293208 7.61839C-0.0967477 7.22844 -0.0993609 6.59881 0.295118 6.20433L5.37914 1.1203C5.77015 0.729292 6.40064 0.725824 6.79512 1.1203L11.8791 6.20433C12.2702 6.59534 12.269 7.23043 11.8811 7.61839L11.7932 7.70624C11.4033 8.09619 10.7744 8.09954 10.3814 7.70654L6.08713 3.41231L1.7929 7.70654Z"
				fill="#8F919C"
			/>
		</Svg>
	)
}

const ScoreBlock = styled.View`
	flex-direction: row;
	align-items: center;
	width: 40px;
	justify-content: space-between;
`
const Indicator = ({ color }: { color: string }) => {
	return (
		<Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
			<Circle cx="5" cy="5" r="5" fill={color} />
		</Svg>
	)
}

const LastForecastsStatsBlock = styled.View`
	border-radius: 12px;
	flex-direction: column;
	margin-top: 12px;
	overflow: hidden;
	margin: 8px 16px 0;
	background-color: #1b1c21;
`
const LastForecastsBlockHeader = styled.View`
	background-color: #1b1c21;
	padding: 16px;
`

const ForecastEvent = ({ text }: { text: string }) => {
	return (
		<ForecastEventBlock>
			<ForecastEventTitle>Прогноз события</ForecastEventTitle>
			<ForecastEventBody>
				{/** dataDetectorType={'link'} */}
				{text}
			</ForecastEventBody>
		</ForecastEventBlock>
	)
}

const ForecastEventBlock = styled.View`
	background-color: #1b1c21;
	padding: 32px 16px;
	border-top-left-radius: 12px;
	border-top-right-radius: 12px;
`
const ForecastEventTitle = styled.Text`
	font-family: Inter-SemiBold;
	font-size: 14px;
	color: #ffffff;
	line-height: 14px;
`
const ForecastEventBody = styled.Text`
	font-family: Inter-Regular;
	font-size: 14px;
	color: #8f919c;
	margin-top: 16px;
	line-height: 14px;
`

///////////////////////////////////////////////

const ExpressHeader = ({ route }: Props) => {
	const { forecast } = route.params

	const getStatusText = () => {
		if (forecast.status === 'passed') return 'ПРОШЕЛ'
		if (forecast.status === 'failed') return 'НЕ ПРОШЕЛ'
		if (forecast.status === 'returned') return 'ВОЗВРАТ'
		return ''
	}

	return (
		<ExpressHeaderView>
			{!forecast.status ? (
				<>
					<ExpressHeaderViewCoeff>
						<ExpressCoefData>~{forecast.coefficient}</ExpressCoefData>
						<ExpressCoefTitle>коэфф..</ExpressCoefTitle>
					</ExpressHeaderViewCoeff>
					<ExpressHeaderViewSeparator />
					<ExpressHeaderViewTimer>
						{moment().diff(forecast.released_at) < 0 ? (
							<>
								<Time timestamp={forecast.released_at} subscribeType={forecast.subscribe_type} />
								<ExpressCoefTitle>начало через</ExpressCoefTitle>
							</>
						) : (
							<ExpressCoefTitle>Ожидает{'\n'}результатов</ExpressCoefTitle>
						)}
					</ExpressHeaderViewTimer>
				</>
			) : (
				<ExpressEndView>
					<ExpressEndIndicator color={colors.card[forecast.status]} />
					<ExpressEndTitle>{getStatusText()}</ExpressEndTitle>
				</ExpressEndView>
			)}
		</ExpressHeaderView>
	)
}

const ExpressEndView = styled.View`
	flex-direction: row;
	align-items: center;
`
const ExpressEndTitle = styled.Text`
	color: #ffffff;
	font-family: Poppins-SemiBold;
	font-size: 14px;
	line-height: 20px;
	margin-left: 6px;
`
const ExpressEndIndicator = ({ color }: { color: string }) => {
	return (
		<Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
			<Circle cx="5" cy="5" r="5" fill={color} />
		</Svg>
	)
}
const ExpressHeaderView = styled.View`
	height: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-right: 16px;
`
const ExpressHeaderViewCoeff = styled.View`
	flex-grow: 1;
	height: 100%;
	align-items: center;
	justify-content: center;
`
const ExpressHeaderViewSeparator = styled.View`
	width: 1px;
	height: 32px;
	background-color: #1b1c21;
	margin: 0 12px;
`
const ExpressHeaderViewTimer = styled.View`
	flex-grow: 1;
	min-width: 80px;
	height: 100%;
	align-items: center;
	justify-content: center;
`
const ExpressCoefTitle = styled.Text`
	color: #ffffff;
	font-family: Inter-Regular;
	font-size: 10px;
	line-height: 10px;
	text-align: center;
`
const ExpressCoefData = styled.Text`
	color: #ffffff;
	font-family: Poppins-SemiBold;
	font-size: 20px;
	text-align: center;
`

const ExpressForecast = ({ route }: Props) => {
	const { forecast } = route.params

	return (
		<ExpressForecastView>
			<ExpressForecastBg source={require('../icons/express-forecast.png')} />
			<ExpressForecastHeaderView>
				<ExpressForecastTitleView>
					<ExpressForecastIcon />
					<ExpressForecastTitle>EXPRESS</ExpressForecastTitle>
				</ExpressForecastTitleView>
				<ExpressForecastDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ultrices eu elementum.</ExpressForecastDesc>
			</ExpressForecastHeaderView>
			<ExpressForecastCardView>
				{forecast.events.map(event => {
					return <ExpressForecastCardFull key={event.id + event.result} forecast={event}></ExpressForecastCardFull>
				})}
			</ExpressForecastCardView>
		</ExpressForecastView>
	)
}

const ExpressForecastView = styled.View`
	position: relative;
	flex-grow: 1;
`
const ExpressForecastBg = styled.Image`
	width: 100%;
	height: 210px;
	position: absolute;
`
const ExpressForecastHeaderView = styled.View`
	width: 100%;
	margin-top: 54px;
	margin-bottom: 34px;
	justify-content: center;
	align-items: center;
`
const ExpressForecastTitleView = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
`
const ExpressForecastTitle = styled.Text`
	color: #ffffff;
	margin-left: 6px;
	font-family: Inter-Bold;
	font-size: 20.5px;
`
const ExpressForecastDesc = styled.Text`
	color: #ffffff;
	font-family: Inter-Regular;
	font-size: 12px;
	text-align: center;
	max-width: 288px;
	margin-top: 12px;
`
const ExpressForecastIcon = () => {
	return (
		<Svg width="23" height="30" viewBox="0 0 23 30" fill="none">
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M0 19.1378H7.01995V29.9853L22.3302 10.8475H15.3102V0L0 19.1378ZM9.7834 16.3744H5.74967L12.5468 7.878V13.611H16.5805L9.7834 22.1074V16.3744Z"
				fill="white"
			/>
		</Svg>
	)
}
const ExpressForecastCardView = styled.View`
	padding: 16px;
`
