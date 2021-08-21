import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import Svg, { Circle, Path } from 'react-native-svg'
import colors from '../constants/colors'

interface Props {
	headerType?: ''
}

export const SubscribeCard = observer(({}: Props) => {
	return (
		<Container activeOpacity={0.9}>
			<CapContainer>
				<Cap color="#FFD058" />
			</CapContainer>
			<Body>
				<Header>
					<Title>Subscribe</Title>
					<Arrow />
				</Header>
				<Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ultrices eu elementum.</Description>
			</Body>
			<BgImage source={require('../icons/cards/subscribe.png')} />
			<BottomCapContainer>
				<Cap color="#060607" />
			</BottomCapContainer>
		</Container>
	)
})

const Container = styled.TouchableOpacity`
	width: 100%;
	overflow: hidden;
`
const Cap = ({ color }: { color?: string }) => {
	return (
		<Svg preserveAspectRatio="none" width="100%" height="9" viewBox="0 0 300 9" fill="none">
			<Circle r="1200" cx="150" cy="1200" fill={color || '#ff00ff'} />
		</Svg>
	)
}
const CapContainer = styled.View`
	padding: 0 4px;
`
const BottomCapContainer = styled(CapContainer)`
	position: absolute;
	height: 9px;
	width: 100%;
	bottom: 0px;
`
const Body = styled.View`
	padding: 16px;
	background-color: #ffd058;
	border-radius: 8px;
	height: 122px;
`
const BgImage = styled.Image`
	position: absolute;
	width: 120%;
	height: 210px;
	transform: rotate(4.84deg) translateX(-60px) translateY(-30px);
`
const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`
const Title = styled.Text`
	color: #131313;
	font-family: Poppins-Bold;
	font-size: 22px;
`
const Description = styled.Text`
	color: #333333;
	font-family: Inter-Regular;
	font-size: 12px;
	max-width: 90%;
`
const ArrowSvg = () => {
	return (
		<Svg width="8" height="13" viewBox="0 0 8 13" fill="none">
			<Path
				d="M0.293458 1.7929C-0.0963294 1.40312 -0.0942035 0.769019 0.293762 0.381054L0.381608 0.293208C0.771564 -0.0967477 1.40119 -0.0993609 1.79567 0.295118L6.8797 5.37914C7.27071 5.77015 7.27418 6.40064 6.8797 6.79512L1.79567 11.8791C1.40466 12.2702 0.769574 12.269 0.381608 11.8811L0.293762 11.7932C-0.0961935 11.4033 -0.0995424 10.7744 0.293458 10.3814L4.58769 6.08713L0.293458 1.7929Z"
				fill="black"
			/>
		</Svg>
	)
}
const Arrow = styled(ArrowSvg)``
