import { makeAutoObservable } from 'mobx'

class Calendar {
	name: string = ''
	selectedDate: string = ''
	date: string = ''

	constructor() {
		makeAutoObservable(this)
	}

	setName(name: string) {
		this.name = name
	}

	setSelectedDate(date: string) {
		this.selectedDate = date
	}

	setDate(date: string) {
		this.date = date
	}
}

export default new Calendar()
