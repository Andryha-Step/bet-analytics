import React from 'react'
import { observer } from 'mobx-react-lite'
import colors from '../constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

import styled from 'styled-components/native'

interface Props {}

export const Profile = observer(({}: Props) => {
	return (
		<SafeAreaView>
			<Container></Container>
		</SafeAreaView>
	)
})

const Container = styled.View`
	background-color: ${colors.background};
	width: 100%;
	height: 100%;
`
