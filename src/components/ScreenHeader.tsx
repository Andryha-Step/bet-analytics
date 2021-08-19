import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'

interface Props {
	children?: React.ReactNode
}

export const ScreenHeader = observer(({ children }: Props) => {
	return <Container>{children}</Container>
})

const Container = styled.View`
	width: 100%;
	height: 56px;
	background-color: #060607;
`
