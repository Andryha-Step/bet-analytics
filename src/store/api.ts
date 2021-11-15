import { ApisauceInstance, create } from 'apisauce'
import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import DeviceInfo from 'react-native-device-info'

export const apiHostUri = 'http://89.223.71.72'
export const deviceId = DeviceInfo.getUniqueId()
console.log('deviceId', deviceId)

class API {
	request: ApisauceInstance | undefined = undefined
	token: string | undefined = undefined

	constructor() {
		makeAutoObservable(this)
	}

	async login() {
		await axios
			.post(apiHostUri + '/api/app/login', {
				device_id: deviceId,
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
