import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'

interface Props {}

export const FeedNavigation = observer(({}: Props) => {
	const [side, setSide] = React.useState<'left' | 'right'>('left')

	return (
		<Container>
			<Button activeOpacity={0.8} onPress={() => setSide('left')}>
				<Label active={side === 'left'}>Текущие</Label>
				<ActiveLine active={side === 'left'} />
			</Button>
			<Button activeOpacity={0.8} onPress={() => setSide('right')}>
				<Label active={side === 'right'}>Завершенные</Label>
				<ActiveLine active={side === 'right'} />
			</Button>
		</Container>
	)
})

const Container = styled.View`
	width: 100%;
	height: 48px;
	flex-direction: row;
`
const Button = styled.TouchableOpacity`
	width: 50%;
	height: 100%;
	align-items: center;
	justify-content: center;
	padding: 0 16px;
`
const Label = styled.Text<{ active: boolean }>`
	color: ${props => (props.active ? '#ffffff' : '#9A9CA6')};
	font-size: 16px;
	font-family: Inter-Medium;
`
const ActiveLine = styled.View<{ active: boolean }>`
	width: 100%;
	height: 2px;
	background-color: ${props => (props.active ? '#27d8ff' : 'transparent')};
	margin-top: 4px;
`
