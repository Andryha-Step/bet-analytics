import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import { ForecastCard, SubscribeCard } from '../../components/components'
import forecasts from '../../store/forecasts'

interface Props {}

export const Left = observer(({}: Props) => {
	React.useEffect(() => {
		forecasts.getForecasts()
	}, [])

	return (
		<ScrollView>
			<Container>
				{forecasts.forecasts?.data.length ? <ForecastCard forecast={forecasts.forecasts.data[0]} /> : null}
				<SubscribeCard />
				{forecasts.forecasts?.data.length
					? forecasts.forecasts?.data.map((forecast, index) => {
							if (index) return <ForecastCard key={forecast.id} forecast={forecast} />
					  })
					: null}
			</Container>
		</ScrollView>
	)
})

const ScrollView = styled.ScrollView`
	width: 100%;
	height: 100%;
`
const Container = styled.View`
	width: 100%;
	height: 100%;
	padding: 16px;
`
