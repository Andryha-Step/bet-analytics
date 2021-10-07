import { makeAutoObservable } from 'mobx'

class Connection {
	setReconnects?: React.Dispatch<React.SetStateAction<number>> = undefined

	constructor() {
		makeAutoObservable(this)
	}
}

export default new Connection()
