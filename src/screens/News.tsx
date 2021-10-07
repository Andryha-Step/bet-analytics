import React from 'react'
import { observer } from 'mobx-react-lite'
import colors from '../constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

import styled from 'styled-components/native'
import news from '../store/news'
import { NewsCard } from '../components/news/NewsCard'
import { ScreenHeader } from '../components/ScreenHeader'
import { RefreshControl, View } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import callBottomSheeet from '../components/BottomSheet/callBottomSheeet'

interface Props {}

export const News = observer(({}: Props) => {
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

				news.getNews().then(() => {
					setRefreshing(false)
				})
			})
			.catch(e => e)
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
			<ScreenHeader>
				<LogoContainer>
					<Logo source={require('../icons/navigations/logo.png')} />
				</LogoContainer>
			</ScreenHeader>
			<Container>
				<Title>Новости</Title>
				<CardsContainer
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} progressBackgroundColor="#16161B" colors={['#27D8FF']} />
					}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<View style={{ padding: 16 }}>
						{news.news?.length
							? news.news?.map(e => {
									return <NewsCard key={e.id} data={e} />
							  })
							: null}
					</View>
				</CardsContainer>
			</Container>
		</SafeAreaView>
	)
})

const Container = styled.View`
	background-color: ${colors.background};
	width: 100%;
	height: 100%;
	flex: 1;
`
const CardsContainer = styled.ScrollView``
const Title = styled.Text`
	font-family: Poppins-Bold;
	font-size: 22px;
	color: #ffffff;
	margin-bottom: 16px;
	margin-left: 16px;
	margin-top: 24px;
`
const LogoContainer = styled.View`
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`
const Logo = styled.Image`
	width: 61px;
	height: 28px;
`
