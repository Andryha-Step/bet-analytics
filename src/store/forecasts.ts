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
	type: string
	subscribe_type: string
	status: string
	parent_id?: number
	is_fake: number
	show_in_archive: boolean
	released_at: string
	coefficient: number
	recommended_stake: any
	our_forecast: string
	created_at: string
	updated_at: string
	events: Event[]
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
	last_game_team_1: LastGameTeam1[]
	last_game_team_2: LastGameTeam2[]
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

export interface LastGameTeam1 {
	date: string
	teams: string
	result: string
}

export interface LastGameTeam2 {
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

class Forecasts {
	forecasts: ForecastsRequest | undefined = undefined
	archive: ArchiveRequest | undefined = undefined

	constructor() {
		makeAutoObservable(this)
	}

	async getForecasts() {
		await API.request?.get<ForecastsRequest>('/api/app/forecasts').then(response => {
			runInAction(() => {
				this.forecasts = response.data
			})
		})

		return this.forecasts
	}

	async getArchive() {
		await API.request?.get<ArchiveRequest>('/api/app/forecasts-archive').then(response => {
			runInAction(() => {
				this.archive = response.data
			})
		})

		return this.archive
	}
}

export default new Forecasts()
