import { ApisauceInstance, create } from 'apisauce'
import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import Constants from 'expo-constants'

export const apiHostUri = 'http://89.223.71.72'

console.log(Constants.deviceId)

class API {
	request: ApisauceInstance | undefined = undefined
	token: string | undefined = undefined

	constructor() {
		makeAutoObservable(this)
	}

	async login() {
		await axios
			.post(apiHostUri + '/api/app/login', {
				device_id: Constants.deviceId,
			})
			.then(response => {
				runInAction(() => {
					this.token = response.data?.data?.token

					this.request = create({
						baseURL: apiHostUri,
						headers: {
							Authorization: this.token,
							Accept: 'application/json',
						},
					})
				})
			})
			.catch(r => r)
	}
}

export default new API()
