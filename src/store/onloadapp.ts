import { makeAutoObservable } from 'mobx'

class Onloadapp {
	onLoad: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	setOnLoad(value: boolean) {
		this.onLoad = value
	}
}

export default new Onloadapp()
