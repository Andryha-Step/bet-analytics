import { makeAutoObservable, runInAction } from 'mobx'
import IAP, { Subscription, Product } from 'react-native-iap'

const fullSubscribeList = ['full_subscription_1year', 'full_subscription_30days', 'full_subscription_7days']
const proSubscribeList = ['pro_subscription_1year', 'pro_subscription_30days', 'pro_subscription_7days']
const liteSubscribeList = ['lite_subscription_year', 'lite_subscription_30days', 'lite_subscription_7days']
const productList = ['lite_forecast', 'pro_forecast']

class Products {
	fullSubscribeList: Subscription[] | undefined = undefined
	proSubscribeList: Subscription[] | undefined = undefined
	liteSubscribeList: Subscription[] | undefined = undefined
	productList: Product[] | undefined = undefined
	status: 'FETCHING_PURCHASES' | 'FETCHING_PURCHASES_SUCCESS' = 'FETCHING_PURCHASES'

	constructor() {
		makeAutoObservable(this)
	}

	async initProductList() {
		IAP.initConnection()
			.catch(r => {
				alert(`INAPPPURCHASES_ERROR: ${r}`)
			})
			.then(async () => {
				await IAP.getSubscriptions(fullSubscribeList).then(result => runInAction(() => (this.fullSubscribeList = result)))
				await IAP.getSubscriptions(proSubscribeList).then(result => runInAction(() => (this.proSubscribeList = result)))
				await IAP.getSubscriptions(liteSubscribeList).then(result => runInAction(() => (this.liteSubscribeList = result)))
				await IAP.getProducts(productList).then(result => runInAction(() => (this.productList = result)))

				runInAction(() => (this.status = 'FETCHING_PURCHASES_SUCCESS'))
				console.log(JSON.stringify(this.liteSubscribeList, null, 2))
			})
	}
}

export default new Products()
