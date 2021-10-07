import { makeAutoObservable } from 'mobx'
import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'

class CallBottomSheeet {
	ref?: React.RefObject<RBSheet> = undefined
	buyRef?: React.RefObject<RBSheet> = undefined
	lockedRef?: React.RefObject<RBSheet> = undefined
	connectionRef?: React.RefObject<RBSheet> = undefined

	constructor() {
		makeAutoObservable(this)
	}
}

export default new CallBottomSheeet()
