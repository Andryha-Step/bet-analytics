import React from 'react'
import { observer } from 'mobx-react-lite'

import SkeletonContent from 'react-native-skeleton-content'
import { Image, ImageStyle, StyleSheet, View } from 'react-native'

interface Props {
	uri: string
	style: ImageStyle
}

export const SkeletonImage = observer(({ uri, style }: Props) => {
	const [loading, setLoading] = React.useState(true)

	return (
		<View style={style}>
			<SkeletonContent
				boneColor="transparent"
				highlightColor="#333333"
				isLoading={loading}
				layout={[{ key: 'image', ...style, ...StyleSheet.absoluteFillObject }]}
			/>
			<Image onLoad={() => setLoading(false)} style={style} source={{ uri: uri }} />
		</View>
	)
})
