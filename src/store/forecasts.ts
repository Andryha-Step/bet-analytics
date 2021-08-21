import { makeAutoObservable, runInAction } from 'mobx'
import API from './api'

export interface ForecastsRequest {
	current_page: number
	data: any[]
	first_page_url: string
	from: any
	last_page: number
	last_page_url: string
	links: ForecastsRequestLink[]
	next_page_url: any
	path: string
	per_page: number
	prev_page_url: any
	to: any
	total: number
}

export interface ForecastsRequestLink {
	url?: string
	label: string
	active: boolean
}

class Forecasts {
	forecasts: Forecasts | undefined = undefined
	archive: Forecasts | undefined = undefined

	constructor() {
		makeAutoObservable(this)
	}

	async getForecasts() {
		await API.request?.get<Forecasts>('/api/app/forecasts').then(response => {
			runInAction(() => {
				this.forecasts = response.data
			})
		})

		return this.forecasts
	}

	async getArchive() {
		await API.request?.get<Forecasts>('/api/app/forecasts-archive').then(response => {
			runInAction(() => {
				this.archive = response.data
			})
		})

		return this.archive
	}
}

export default new Forecasts()
