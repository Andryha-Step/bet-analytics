import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import { Calendar, EndForecastCard } from '../../components/components'
import { SafeAreaView } from 'react-native-safe-area-context'
import forecasts from '../../store/forecasts'
import calendarState from '../../components/Calendar/calendar.state'
import moment from 'moment'
import { RefreshControl, View } from 'react-native'
import colors from '../../constants/colors'
import NetInfo from '@react-native-community/netinfo'
import callBottomSheeet from '../../components/BottomSheet/callBottomSheeet'

interface Props {}

export const Right = observer(({}: Props) => {
	// React.useEffect(() => {
	// 	forecasts.getArchive()
	// }, [])

	const [refreshing, setRefreshing] = React.useState(false)
	const refreshHandler = () => {
		setRefreshing(true)
		NetInfo.fetch()
			.then(r => {
				if (!r.isConnected) {
					callBottomSheeet.connectionRef?.current?.open()
					setTimeout(refreshHandler, 1000)
					return
				}
				callBottomSheeet.connectionRef?.current?.close()

				forecasts.getArchive().then(() => {
					setRefreshing(false)
				})
				forecasts.getForecasts()
			})
			.catch(e => e)
	}

	return (
		<View style={{ backgroundColor: colors.background, flex: 1 }}>
			<Calendar />
			<Scroll
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} progressBackgroundColor="#16161B" colors={['#27D8FF']} />
				}
			>
				<Body>
					{forecasts?.archive
						? forecasts.archive.data.map(forecast => {
								if (moment(forecast.released_at).format('DDMMYY') === moment(calendarState.selectedDate).format('DDMMYY')) {
									return <EndForecastCard key={forecast.id} forecast={forecast} />
								}
						  })
						: null}
				</Body>
			</Scroll>
		</View>
	)
})

const Scroll = styled.ScrollView`
	width: 100%;
	height: 100%;
`
const Body = styled.View`
	padding: 16px;
`
