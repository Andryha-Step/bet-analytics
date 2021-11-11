import { makeAutoObservable } from 'mobx'

class Notification {
	token: string | undefined = undefined

	constructor() {
		makeAutoObservable(this)
	}
}

export default new Notification()
