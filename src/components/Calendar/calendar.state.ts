import { makeAutoObservable } from 'mobx'

class Calendar {
	name: string = ''
	constructor() {
		makeAutoObservable(this)
	}

	setName(name: string) {
		this.name = name
	}
}

export default new Calendar()
