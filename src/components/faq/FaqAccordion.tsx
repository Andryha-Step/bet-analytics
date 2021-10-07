import React from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, Text, View } from 'react-native'

import Accordion from 'react-native-collapsible/Accordion'
import Svg, { Path } from 'react-native-svg'
import { FaqData } from '../../store/faq'

interface Props {
	data: FaqData
}

export const FaqAccordion = observer(({ data }: Props) => {
	const [show, setShow] = React.useState(false)

	return (
		<View style={styles.container}>
			<Accordion
				activeSections={[show ? Number(!show) : -1]}
				sections={['block']}
				renderHeader={() => (
					<View style={styles.header}>
						<Text style={styles.title}>{data.question}</Text>
						<Mark show={show} />
					</View>
				)}
				renderContent={() => (
					<View style={styles.body}>
						<Text style={styles.description}>{data.answer}</Text>
					</View>
				)}
				onChange={e => {
					setShow(prev => !prev)
				}}
				containerStyle={{ borderRadius: 12, overflow: 'hidden' }}
			/>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		borderRadius: 12,
		overflow: 'hidden',
		marginBottom: 8,
		backgroundColor: '#1B1C21',
	},
	header: {
		padding: 16,
		paddingTop: 26,
		paddingBottom: 26,
		backgroundColor: '#1B1C21',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	body: {
		padding: 16,
		paddingTop: 0,
		backgroundColor: '#1B1C21',
	},
	title: {
		fontFamily: 'Inter-Medium',
		fontSize: 14,
		color: '#ffffff',
		flex: 1,
	},
	description: {
		fontFamily: 'Inter-Regular',
		fontSize: 12,
		color: '#8F919C',
	},
})

const Mark = ({ show }: { show: boolean }) => {
	return (
		<Svg style={{ transform: [{ rotate: `${show ? -45 : 0}deg` }], marginLeft: 26 }} width="14" height="14" viewBox="0 0 14 14" fill="none">
			<Path
				d="M13.7599 7.00002C13.7599 6.5852 13.4237 6.24892 13.0088 6.24892L7.75111 6.24892L7.75111 0.991179C7.75111 0.576355 7.41482 0.240073 7 0.240073C6.58518 0.240073 6.24889 0.576355 6.24889 0.991179L6.24889 6.24892L0.991156 6.24892C0.576331 6.24892 0.240051 6.5852 0.24005 7.00002C0.24005 7.41485 0.576331 7.75113 0.991156 7.75113H6.24889L6.24889 13.0089C6.24889 13.4237 6.58518 13.76 7 13.76C7.41482 13.76 7.75111 13.4237 7.75111 13.0089L7.75111 7.75113H13.0088C13.4237 7.75113 13.7599 7.41485 13.7599 7.00002Z"
				fill="#B8C1CC"
			/>
		</Svg>
	)
}
