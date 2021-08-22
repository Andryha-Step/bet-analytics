import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import { Calendar, EndForecastCard } from '../../components/components'
import { SafeAreaView } from 'react-native-safe-area-context'
import forecasts from '../../store/forecasts'
import calendarState from '../../components/Calendar/calendar.state'
import moment from 'moment'

interface Props {}

export const Right = observer(({}: Props) => {
	React.useEffect(() => {
		forecasts.getArchive()
	}, [])

	return (
		<>
			<Calendar />
			<Scroll>
				<Body>
					{forecasts.archive
						? forecasts.archive.data.map(forecast => {
								console.log()
								if (moment(forecast.released_at).format('DDMMYY') === moment(calendarState.selectedDate).format('DDMMYY')) {
								}
								return <EndForecastCard key={forecast.id} forecast={forecast} />
						  })
						: null}
				</Body>
			</Scroll>
		</>
	)
})

const Scroll = styled.ScrollView`
	width: 100%;
	height: 100%;
`
const Body = styled.View`
	padding: 16px;
`
