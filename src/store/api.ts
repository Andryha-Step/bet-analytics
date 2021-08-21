import { ApisauceInstance, create } from 'apisauce'
import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import Constants from 'expo-constants'

const apiHostUri = 'http://betanalitycs.xyz'

class API {
	request: ApisauceInstance | undefined = undefined
	token: string | undefined = undefined

	constructor() {
		makeAutoObservable(this)
	}

	async login() {
		await axios
			.post(apiHostUri + '/api/app/login', {
				device_id: '123', // Constants.deviceId,
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
