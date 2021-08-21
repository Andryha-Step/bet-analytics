import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import { Card, SubscribeCard } from '../../components/components'

interface Props {}

export const Left = observer(({}: Props) => {
	return (
		<ScrollView>
			<Container>
				<Card />
				<SubscribeCard />
				<Card />
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
