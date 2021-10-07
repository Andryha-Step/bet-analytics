import React from 'react'
import { observer } from 'mobx-react-lite'
import { BackHandler, Dimensions, StyleSheet, Text, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import colors from '../../constants/colors'
import Svg, { Path, Rect } from 'react-native-svg'
import { TouchableOpacity } from 'react-native'
import callBottomSheeet from './callBottomSheeet'
import { runInAction } from 'mobx'
import api from '../../store/api'

interface Props {
	children?: React.ReactNode
	buy?: boolean
	locked?: boolean
	connection?: boolean
}

export const BottomSheet = observer(({ children, buy, locked, connection }: Props) => {
	const refRBSheet = React.useRef<RBSheet>(null)

	const [height, setHeight] = React.useState(100)

	React.useEffect(() => {
		if (buy) {
			runInAction(() => (callBottomSheeet.buyRef = refRBSheet))
			return
		}
		if (locked) {
			runInAction(() => (callBottomSheeet.lockedRef = refRBSheet))
			return
		}
		if (connection) {
			runInAction(() => (callBottomSheeet.connectionRef = refRBSheet))
			return
		}
		runInAction(() => (callBottomSheeet.ref = refRBSheet))
	}, [])

	return (
		<RBSheet
			ref={refRBSheet}
			closeOnDragDown={false}
			closeOnPressMask={!connection}
			onClose={() => {
				if (connection && !api.token) {
					BackHandler.exitApp()
				}
			}}
			customStyles={{
				container: {
					backgroundColor: 'transparent',
					padding: 8,
					height: height + 16,
				},
				wrapper: {
					backgroundColor: `rgba(255, 255, 255, ${!connection ? '0.2' : '0.05'})`,
				},
			}}
			animationType="fade"
			openDuration={0}
			closeDuration={0}
		>
			<View style={styles.container} onLayout={e => setHeight(e.nativeEvent.layout.height)}>
				{children}
				{/* {!connection ? (
					<TouchableOpacity style={styles.closeButton} onPress={() => refRBSheet.current?.close()}>
						<CloseIcon />
					</TouchableOpacity>
				) : null} */}
			</View>
		</RBSheet>
	)
})

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		borderRadius: 12,
	},
	closeButton: {
		position: 'absolute',
		right: 0,
		top: 0,
		padding: 8,
	},
})

const CloseIcon = () => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Rect width="24" height="24" rx="12" fill="#1B1C21" />
		<Path
			d="M16.78 7.21999C16.4867 6.92667 16.0111 6.92667 15.7178 7.21999L12 10.9378L8.28222 7.21999C7.98889 6.92667 7.51332 6.92667 7.21999 7.21999C6.92667 7.51332 6.92667 7.98889 7.21999 8.28222L10.9378 12L7.21999 15.7178C6.92667 16.0111 6.92667 16.4867 7.21999 16.78C7.51332 17.0733 7.98889 17.0733 8.28222 16.78L12 13.0622L15.7178 16.78C16.0111 17.0733 16.4867 17.0733 16.78 16.78C17.0733 16.4867 17.0733 16.0111 16.78 15.7178L13.0622 12L16.78 8.28222C17.0733 7.98889 17.0733 7.51332 16.78 7.21999Z"
			fill="#F9F9F9"
		/>
	</Svg>
)
