import { makeAutoObservable, runInAction } from 'mobx'
import API from './api'

export type ForecastSettings = SettingsData

export interface SettingsData {
	news: boolean
	rating: boolean
	subscribe: 'pro' | 'lite' | 'free' | 'full'
}

class Settings {
	settings: ForecastSettings | undefined = undefined

	constructor() {
		makeAutoObservable(this)
	}

	async getSettings() {
		await API.request
			?.get<ForecastSettings>('/api/app/settings')
			.then(response => {
				runInAction(() => {
					this.settings = response.data
				})
			})
			.catch(r => r)

		return this.settings
	}
}

export default new Settings()
