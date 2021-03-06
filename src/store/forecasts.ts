import { makeAutoObservable, runInAction } from 'mobx'
import moment from 'moment'
import API from './api'

export interface ForecastsRequest {
	current_page: number
	data: Daum2[] | LockedDaum[]
	first_page_url: string
	from: number
	last_page: number
	last_page_url: string
	links: Link[]
	next_page_url: any
	path: string
	per_page: number
	prev_page_url: any
	to: number
	total: number
}

export interface ExpressType {
	id: number
	forecast_id: number
	sport_id: number
	league: string
	team_1_name: string
	team_2_name: string
	released_at: string
	history: History2[]
	last_game_team_1: any[]
	last_game_team_2: any[]
	result: string
	coefficient: number
	recommended_stake: any
	our_forecast: any
	created_at: string
	updated_at: string
	team_1_logo: string
	team_2_logo: string
	media: Medum[]
}

export interface Medum {
	id: number
	model_type: string
	model_id: number
	uuid: string
	collection_name: string
	name: string
	file_name: string
	mime_type: string
	disk: string
	conversions_disk: string
	size: number
	manipulations: any[]
	custom_properties: any[]
	generated_conversions: GeneratedConversions
	responsive_images: any[]
	order_column: number
	created_at: string
	updated_at: string
}

export interface GeneratedConversions {
	small: boolean
}

export interface Daum2 {
	id: number
	type: 'single' | 'express'
	subscribe_type: 'pro' | 'lite' | 'free'
	status: 'passed' | 'failed' | 'returned'
	parent_id: any
	is_fake: number
	show_in_archive: boolean
	released_at: string
	coefficient: number
	recommended_stake: any
	our_forecast: string
	created_at: string
	updated_at: string
	events: Event2[] | ExpressType[]
	is_purchas: boolean
}

export interface Event2 {
	id: number
	forecast_id: number
	sport_id: number
	league: string
	team_1_name: string
	team_2_name: string
	released_at: string
	history: History2[]
	last_game_team_1: LastGameTeam[]
	last_game_team_2: LastGameTeam[]
	result: string
	coefficient: number
	recommended_stake: any
	our_forecast: any
	created_at: string
	updated_at: string
	team_1_logo: string
	team_2_logo: string
	media: Medum2[]
}

export interface History2 {
	date: string
	teams: string
	result: string
}

export interface Medum2 {
	id: number
	model_type: string
	model_id: number
	uuid: string
	collection_name: string
	name: string
	file_name: string
	mime_type: string
	disk: string
	conversions_disk: string
	size: number
	manipulations: any[]
	custom_properties: any[]
	generated_conversions: GeneratedConversions
	responsive_images: any[]
	order_column: number
	created_at: string
	updated_at: string
}

export interface ArchiveRequest {
	current_page: number
	data: Daum[]
	first_page_url: string
	from: number
	last_page: number
	last_page_url: string
	links: Link[]
	next_page_url: any
	path: string
	per_page: number
	prev_page_url: any
	to: number
	total: number
}

export interface Daum {
	id: number
	type: 'single' | 'express'
	subscribe_type: 'pro' | 'lite' | 'free'
	status: 'passed' | 'failed' | 'returned'
	parent_id?: number
	is_fake: number
	show_in_archive: boolean
	released_at: string
	coefficient: number
	recommended_stake: any
	our_forecast: string
	created_at: string
	updated_at: string
	events: Event[] | ExpressType[]
	is_purchas: boolean
}

export interface LockedDaum {
	id: 12
	type: 'single' | 'express'
	subscribe_type: 'pro' | 'lite' | 'free'
	status: null
	parent_id: null
	show_in_archive: boolean
	released_at: string
	coefficient: number
	created_at: string
	updated_at: string
	is_purchas: false
}

export interface Event {
	id: number
	forecast_id: number
	sport_id: number
	league: string
	team_1_name: string
	team_2_name: string
	released_at: string
	history: History[]
	last_game_team_1: LastGameTeam[]
	last_game_team_2: LastGameTeam[]
	result: string
	coefficient: number
	recommended_stake: any
	our_forecast: any
	created_at: string
	updated_at: string
	team_1_logo: string
	team_2_logo: string
	media: Medum[]
}

export interface History {
	date: string
	teams: string
	result: string
}

export interface LastGameTeam {
	date: string
	teams: string
	result: string
}

export interface Medum {
	id: number
	model_type: string
	model_id: number
	uuid: string
	collection_name: string
	name: string
	file_name: string
	mime_type: string
	disk: string
	conversions_disk: string
	size: number
	manipulations: any[]
	custom_properties: any[]
	generated_conversions: GeneratedConversions
	responsive_images: any[]
	order_column: number
	created_at: string
	updated_at: string
}

export interface GeneratedConversions {
	small: boolean
}

export interface Link {
	url?: string
	label: string
	active: boolean
}

export interface Sport {
	id: number
	name: string
	icon: string
}

class Forecasts {
	forecasts: ForecastsRequest | undefined = undefined
	archive: ArchiveRequest | undefined = undefined
	sports: Sport[] | undefined = undefined

	constructor() {
		makeAutoObservable(this)
	}

	async getForecasts() {
		await API.request
			?.get<ForecastsRequest>('/api/app/forecasts')
			.then(response => {
				runInAction(() => {
					this.forecasts = response.data
				})
			})
			.catch(e => e)

		// runInAction(() => {
		// 	this.forecasts!.data = this.forecasts!.data.sort((left, right): any => {
		// 		return moment.utc(left.released_at).diff(moment.utc(right.released_at))
		// 	})
		// })

		return this.forecasts
	}

	async getArchive() {
		await API.request
			?.get<ArchiveRequest>('/api/app/forecasts-archive')
			.then(response => {
				runInAction(() => {
					this.archive = response.data
				})
			})
			.catch(e => e)

		return this.archive
	}

	async getSports() {
		await API.request
			?.get<Sport[]>('/api/app/sports')
			.then(response => {
				runInAction(() => {
					this.sports = response.data
				})
			})
			.catch(e => e)

		return this.sports
	}

	getSport(id: number) {
		const result: Sport[] = []

		this.sports?.forEach(sport => {
			if (sport.id === id) result.push(sport)
		})

		return result[0]
	}
}

export default new Forecasts()
