import { makeAutoObservable, runInAction } from 'mobx'
import API from './api'

export type ForecastNews = Array<NewsData>

export interface NewsData {
	id: number
	sport_id: number
	status: string
	title: string
	description: string
	created_at: string
	updated_at: string
	image: string
	sport: {
		id: number
		name: string
		icon: string
	}
}

class News {
	news: ForecastNews | undefined = undefined

	constructor() {
		makeAutoObservable(this)
	}

	async getNews() {
		await API.request
			?.get<{ data: ForecastNews }>('/api/app/news')
			.then(response => {
				runInAction(() => {
					this.news = response.data?.data.reverse()
				})
			})
			.catch(e => e)

		return this.news
	}
}

export default new News()
