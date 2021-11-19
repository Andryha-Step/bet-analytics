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
	isLoaded: boolean = false
	initialCurrency: string = ''

	constructor() {
		makeAutoObservable(this)
	}

	async initProductList() {
		return await IAP.initConnection()
			.then(async () => {
				await IAP.getSubscriptions(fullSubscribeList).then(result =>
					runInAction(() => (this.fullSubscribeList = this.sortSubscribtions(result)))
				)
				await IAP.getSubscriptions(proSubscribeList).then(result =>
					runInAction(() => (this.proSubscribeList = this.sortSubscribtions(result)))
				)
				await IAP.getSubscriptions(liteSubscribeList).then(result =>
					runInAction(() => (this.liteSubscribeList = this.sortSubscribtions(result)))
				)
				await IAP.getProducts(productList).then(result =>
					runInAction(() => {
						this.productList = result
						this.initialCurrency = result.length ? result[0].currency : ''
					})
				)

				// console.log(JSON.stringify(this.liteSubscribeList, null, 2))
			})
			.then(() => {
				runInAction(() => (this.isLoaded = true))
			})
			.catch(r => {
				alert(`INAPPPURCHASES_ERROR: ${r}`)
			})
	}

	sortSubscribtions(data: Subscription[]): Subscription[] {
		const sortList: Subscription[] = []

		data.forEach(subscribtion => {
			if (subscribtion.subscriptionPeriodAndroid === 'P1W') return (sortList[0] = subscribtion)
			if (subscribtion.subscriptionPeriodAndroid === 'P1M') return (sortList[1] = subscribtion)
			if (subscribtion.subscriptionPeriodAndroid === 'P1Y') return (sortList[2] = subscribtion)
			sortList.push(subscribtion)
		})

		console.log('SORT_LIST', JSON.stringify(sortList, null, 2))
		return sortList
	}
}

export default new Products()
