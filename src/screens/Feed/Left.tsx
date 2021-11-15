import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import { ForecastCard, SubscribeCard, ExpressForecastCard, LockedForecastCard } from '../../components/components'
import forecasts, { LockedDaum } from '../../store/forecasts'
import colors from '../../constants/colors'
import { RefreshControl } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import callBottomSheeet from '../../components/BottomSheet/callBottomSheeet'
import settings from '../../store/settings'
import { reportNavigate } from '../../hooks/yandexMetrica'

interface Props {}

export const Left = observer(({}: Props) => {
	reportNavigate('Лента > Текущие')
	// console.log('SUBSCRIBE_TYPE:', settings.settings?.subscribe)
	// React.useEffect(() => {
	// 	forecasts.getForecasts()
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

				forecasts.getForecasts().then(() => {
					setRefreshing(false)
				})
				forecasts.getArchive()
			})
			.catch(e => e)
	}

	// const isFocused = useIsFocused()
	// React.useEffect(() => {
	// 	console.log(isFocused)
	// })

	return (
		<ScrollView
			style={{ backgroundColor: colors.background }}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} progressBackgroundColor="#16161B" colors={['#27D8FF']} />
			}
		>
			<Container>
				{forecasts.forecasts?.data.length && forecasts.forecasts.data[0].is_purchas && forecasts.forecasts.data[0].type === 'single' ? (
					<ForecastCard forecast={forecasts.forecasts.data[0]} />
				) : null}
				{forecasts.forecasts?.data.length && forecasts.forecasts.data[0].is_purchas && forecasts.forecasts.data[0].type === 'express' ? (
					<ExpressForecastCard forecast={forecasts.forecasts.data[0]} />
				) : null}

				{forecasts.forecasts?.data.length && !forecasts.forecasts.data[0].is_purchas ? (
					<LockedForecastCard forecast={forecasts.forecasts.data[0] as LockedDaum} />
				) : null}

				{settings.settings?.subscribe === 'free' ? <SubscribeCard /> : null}

				{forecasts.forecasts?.data.length
					? forecasts.forecasts?.data.map((forecast, index) => {
							if (index) {
								if (forecast.type === 'single' && forecast.is_purchas) return <ForecastCard key={forecast.id} forecast={forecast} />
								if (forecast.type === 'express' && forecast.is_purchas) return <ExpressForecastCard key={forecast.id} forecast={forecast} />
								if (!forecast.is_purchas) return <LockedForecastCard key={forecast.id} forecast={forecast as LockedDaum} />
							}
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
