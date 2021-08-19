import React from 'react'
import { observer } from 'mobx-react-lite'
import colors from '../constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

import styled from 'styled-components/native'
import { ScreenHeader } from '../components/components'
import { FeedNavigation } from '../navigations/FeedNavigation'

interface Props {}

export const Feed = observer(({}: Props) => {
	return (
		<SafeAreaView>
			<Container>
				<ScreenHeader>
					<LogoContainer>
						<Logo source={require('../icons/navigations/logo.png')} />
					</LogoContainer>
				</ScreenHeader>
				<FeedNavigation />
			</Container>
		</SafeAreaView>
	)
})

const Container = styled.View`
	background-color: ${colors.background};
	width: 100%;
	height: 100%;
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
