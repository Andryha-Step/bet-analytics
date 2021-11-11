import { makeAutoObservable } from 'mobx'

class RealtimeBuyProduct {
	type: 'lite_forecast' | 'pro_forecast' | undefined = undefined
	id: number | undefined = undefined

	constructor() {
		makeAutoObservable(this)
	}
}

export default new RealtimeBuyProduct()
