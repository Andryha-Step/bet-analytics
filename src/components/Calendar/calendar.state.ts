import { makeAutoObservable } from 'mobx'

class Calendar {
	name: string = ''
	selectedDate: string = ''

	constructor() {
		makeAutoObservable(this)
	}

	setName(name: string) {
		this.name = name
	}

	setSelectedDate(date: string) {
		this.selectedDate = date
	}
}

export default new Calendar()
