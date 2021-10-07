import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import Svg, { Circle, ClipPath, Path } from 'react-native-svg'
import colors from '../constants/colors'
import forecasts, { LockedDaum } from '../store/forecasts'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import callBottomSheeet from './BottomSheet/callBottomSheeet'

interface Props {
	forecast: LockedDaum
}

export const LockedForecastCard = observer(({ forecast }: Props) => {
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
				if (moment().diff(forecast.released_at) > 0) {
					callBottomSheeet.lockedRef?.current?.open()
					return
				}
				callBottomSheeet.buyRef?.current?.open()
			}}
		>
			<CapContainer>
				<Cap color={'transparent'} />
			</CapContainer>
			<LockedMask source={require('../icons/cards/locked.png')} />
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
			</Body>
			<FooterBody>
				<CoefTitle>КОЭФФИЦИЕНТ</CoefTitle>
				<CoefData>~{forecast.coefficient}</CoefData>
			</FooterBody>

			<BottomCapContainer>
				<Cap color="#060607" />
			</BottomCapContainer>
			<StatusTitleContainer>
				<StatusTitle>
					<StatusTitleBg />
					<StatusTitleText>{forecast.subscribe_type.toUpperCase()}</StatusTitleText>
				</StatusTitle>
				<ReturnTitleContainer>
					{forecast.type === 'express' ? (
						<>
							<ReturnTitleSvg />
							<ReturnTitleText>EXPRESS</ReturnTitleText>
						</>
					) : null}
				</ReturnTitleContainer>
				<PriceView>
					<LockSvg />
					<Price>1234 RUB</Price>
					<PriceDesc>купить прогноз</PriceDesc>
				</PriceView>
			</StatusTitleContainer>
		</Container>
	)
})

const LockedMask = styled.Image`
	width: 100%;
	height: 236px;
	position: absolute;
	resize-mode: stretch;
`
const PriceView = styled.View`
	justify-content: center;
	align-items: center;
	margin-top: 28px;
`
const Price = styled.Text`
	font-family: Poppins-Bold;
	font-size: 22px;
	color: #ffffff;
	margin-top: 8px;
`
const PriceDesc = styled.Text`
	font-family: Inter-Regular;
	font-size: 12px;
	line-height: 12px;
	color: #ffffff;
`
const Container = styled.TouchableOpacity`
	width: 100%;
	height: 236px;
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
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	height: 156px;
`
const FooterBody = styled.View`
	padding: 16px;
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
	align-items: center;
	z-index: 2;
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
				fill={colors.card.red}
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
	z-index: 10;
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
const LockSvg = () => {
	return (
		<Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.5227 5.39601V6.92935C16.2451 7.46696 17.5 9.02614 17.5 10.8884V15.8253C17.5 18.1308 15.5886 20 13.2322 20H4.7688C2.41136 20 0.5 18.1308 0.5 15.8253V10.8884C0.5 9.02614 1.75595 7.46696 3.47729 6.92935V5.39601C3.48745 2.41479 5.95667 0 8.98476 0C12.0535 0 14.5227 2.41479 14.5227 5.39601ZM9.00508 1.73904C11.0678 1.73904 12.7445 3.37871 12.7445 5.39601V6.7137H5.25553V5.37613C5.26569 3.36878 6.94232 1.73904 9.00508 1.73904ZM9.88912 14.4549C9.88912 14.9419 9.49283 15.3294 8.99492 15.3294C8.50717 15.3294 8.11088 14.9419 8.11088 14.4549V12.2488C8.11088 11.7718 8.50717 11.3843 8.99492 11.3843C9.49283 11.3843 9.88912 11.7718 9.88912 12.2488V14.4549Z"
				fill="white"
			/>
		</Svg>
	)
}
