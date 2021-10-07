import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

interface Props {
	index: number
}

export const FeedNavigation = observer(({ index }: Props) => {
	const navigation = useNavigation()

	return (
		<Container>
			<Button activeOpacity={0.8} onPress={() => navigation.navigate('Left' as never)}>
				<Label active={index === 0}>Текущие</Label>
				<ActiveLine active={index === 0} />
			</Button>
			<Button activeOpacity={0.8} onPress={() => navigation.navigate('Right' as never)}>
				<Label active={index === 1}>Завершенные</Label>
				<ActiveLine active={index === 1} />
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
