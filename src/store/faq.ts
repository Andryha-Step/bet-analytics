import { makeAutoObservable, runInAction } from 'mobx'
import API from './api'

export type FaqReq = FaqData[]

export interface FaqData {
	id: number
	question: string
	answer: string
	position: 1
	show: boolean
	created_at: string
	updated_at: string
}

class Faq {
	data?: FaqReq = []

	constructor() {
		makeAutoObservable(this)
	}

	async getFaq() {
		await API.request
			?.get<FaqReq>('/api/app/faq')
			.then(response => {
				runInAction(() => {
					this.data = response.data
				})
			})
			.catch(e => e)

		return this.data
	}
}

export default new Faq()
