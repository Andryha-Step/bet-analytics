import { create } from 'apisauce'
import axios from 'axios'
import Constants from 'expo-constants'

export const auth = async () => {
	const hostUri = 'http://betanalitycs.xyz'
	const headers = {
		Authorization: '',
		Accept: 'application/json',
	}

	await axios
		.post(hostUri + '/api/app/login', {
			device_id: Constants.deviceId,
		})
		.then(response => {
			headers.Authorization = response.data?.data?.token
		})
		.catch(r => r)

	const api = create({
		baseURL: hostUri,
		headers: headers,
	})

	return api
}
