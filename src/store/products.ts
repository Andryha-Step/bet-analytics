import { makeAutoObservable, runInAction } from 'mobx'
import * as InAppPurchases from 'expo-in-app-purchases'

const fullSubscribeList = ['full_subscription_1year', 'full_subscription_30days', 'full_subscription_7days']
const proSubscribeList = ['pro_subscription_1year', 'pro_subscription_30days', 'pro_subscription_7days']
const liteSubscribeList = ['lite_subscription_year', 'lite_subscription_30days', 'lite_subscription_7days']
const productList = ['lite_forecast', 'pro_forecast']

class Products {
	fullSubscribeList?: InAppPurchases.IAPItemDetails[] = undefined
	proSubscribeList?: InAppPurchases.IAPItemDetails[] = undefined
	liteSubscribeList?: InAppPurchases.IAPItemDetails[] = undefined

	// productList: any
	status: 'FETCHING_PURCHASES' | 'FETCHING_PURCHASES_SUCCESS' = 'FETCHING_PURCHASES'

	constructor() {
		makeAutoObservable(this)
	}

	async initProductList() {
		InAppPurchases.connectAsync()
			.catch(r => {
				alert(`INAPPPURCHASES_ERROR: ${r}`)
			})
			.then(async () => {
				await this.getProducts(fullSubscribeList).then(result => runInAction(() => (this.fullSubscribeList = result)))
				await this.getProducts(proSubscribeList).then(result => runInAction(() => (this.proSubscribeList = result)))
				await this.getProducts(liteSubscribeList).then(result => runInAction(() => (this.liteSubscribeList = result)))

				runInAction(() => (this.status = 'FETCHING_PURCHASES_SUCCESS'))
				// this.getProducts(productList)
				alert(JSON.stringify(this.liteSubscribeList))
			})
	}

	async getProducts(list: string[]) {
		const productList = await InAppPurchases.getProductsAsync(list)
		return productList.results
	}
}

export default new Products()
