import React from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ProfileCard } from './profile/ProfileCard'
import Svg, { Path } from 'react-native-svg'
import products from '../store/products'
import moment from 'moment'
import IAP from 'react-native-iap'
import { reportEvent } from '../hooks/yandexMetrica'
import { floatToStringPrice } from '../hooks/floatToStringPrice'

interface Props {}

export const SubscribePlan = observer(({}: Props) => {
	const [page, setPage] = React.useState(0)

	const goBack = () => setPage(0)

	return (
		<View style={styles.container}>
			{page === 0 ? <PlanList selectPlan={setPage} /> : null}
			{page === 1 ? <Plan goBack={goBack} type="lite" /> : null}
			{page === 2 ? <Plan goBack={goBack} type="pro" /> : null}
			{page === 3 ? <Plan goBack={goBack} type="full" /> : null}
		</View>
	)
})

type PlanTypes = 'lite' | 'pro' | 'full'

interface Plan {
	type: PlanTypes
	goBack: () => void
}

const Plan = ({ type, goBack }: Plan) => {
	const [period, setPeriod] = React.useState([
		{ id: '1', title: 'undefined', desc: 'undefined', selected: false },
		{ id: '2', title: 'undefined', desc: 'undefined', selected: false },
		{ id: '3', title: 'undefined', desc: 'undefined', selected: false },
	])

	const [selectedPeriod, setSelectedPeriod] = React.useState('')

	React.useEffect(() => {
		reportEvent(`Выбрал тип подписки "${type.toUpperCase()}"`)
		if (type === 'lite')
			setPeriod(
				products.liteSubscribeList?.map((product, index) => {
					if (product.subscriptionPeriodAndroid === 'P1M') setSelectedPeriod(product.productId)
					return {
						id: product.productId,
						title: `${getTitlePeriod(product.subscriptionPeriodAndroid)} - ${floatToStringPrice(product.price)} ${product.currency}`,
						desc: `До ${getDisplayPeriod(product.subscriptionPeriodAndroid)}`,
						selected: product.subscriptionPeriodAndroid === 'P1M',
					}
				}) || []
			)

		if (type === 'pro')
			setPeriod(
				products.proSubscribeList?.map((product, index) => {
					if (product.subscriptionPeriodAndroid === 'P1M') setSelectedPeriod(product.productId)
					return {
						id: product.productId,
						title: `${getTitlePeriod(product.subscriptionPeriodAndroid)} - ${floatToStringPrice(product.price)} ${product.currency}`,
						desc: `До ${getDisplayPeriod(product.subscriptionPeriodAndroid)}`,
						selected: product.subscriptionPeriodAndroid === 'P1M',
					}
				}) || []
			)

		if (type === 'full')
			setPeriod(
				products.fullSubscribeList?.map((product, index) => {
					if (product.subscriptionPeriodAndroid === 'P1M') setSelectedPeriod(product.productId)
					return {
						id: product.productId,
						title: `${getTitlePeriod(product.subscriptionPeriodAndroid)} - ${floatToStringPrice(product.price)} ${product.currency}`,
						desc: `До ${getDisplayPeriod(product.subscriptionPeriodAndroid)}`,
						selected: product.subscriptionPeriodAndroid === 'P1M',
					}
				}) || []
			)
	}, [])

	const getDisplayPrice = (price: number): string => {
		if (typeof price === 'number') {
			return (price / 1000000).toFixed(0).toString()
		}

		return '???'
	}

	const getTitlePeriod = (period?: string) => {
		if (typeof period === 'string') {
			if (period === 'P1Y') return '1 год'
			if (period === 'P1M') return '1 месяц'
			if (period === 'P1W') return '7 дней'
			return '???'
		}
		return '???'
	}

	const getDisplayPeriod = (period?: string): string => {
		if (typeof period === 'string') {
			if (period === 'P1Y') return moment().add(1, 'year').format('LL').slice(0, -3)
			if (period === 'P1M') return moment().add(1, 'month').format('LL').slice(0, -3)
			if (period === 'P1W') return moment().add(7, 'days').format('LL').slice(0, -3)
			return '???'
		}
		return '???'
	}

	const selectPeriod = (id: string) => {
		setPeriod(period =>
			period.map(plan => {
				if (plan.id === id) {
					setSelectedPeriod(plan.id)
					reportEvent(
						`Выбрал подписку ${JSON.stringify({
							id: plan.id,
						})}`
					)
					return { ...plan, selected: true }
				}
				return { ...plan, selected: false }
			})
		)
	}

	const buyPurchaseHandler = () => {
		if (selectedPeriod) {
			reportEvent(`Оформляет подписку "${selectedPeriod}"`)
			IAP.requestSubscription(selectedPeriod)
			return
		}

		alert('Сначала нужно выбрать период')
	}

	if (type === 'lite')
		return (
			<>
				<View style={styles.header}>
					<TouchableOpacity style={{ marginRight: 8, padding: 8 }} onPress={goBack}>
						<ArrowIcon />
					</TouchableOpacity>
					<Text style={styles.title}>Выберите период</Text>
				</View>
				<ProfileCard>
					<Text style={styles.title}>LITE</Text>
					<Text style={styles.description}>7 дней прогнозов с КЭФ 1.4-2.0! Проходимость более 87%!</Text>
				</ProfileCard>
				<Text style={[styles.description, { marginBottom: 8, marginTop: 16 }]}>Выберите период</Text>
				{period.map(({ id, title, desc, selected }) => {
					return <PlanPeriod key={id} id={id} title={title} description={desc} selected={selected} onPress={() => selectPeriod(id)} />
				})}
				<TouchableOpacity style={styles.blueButton} onPress={buyPurchaseHandler}>
					<Text style={styles.blueButtonText}>Оформить</Text>
				</TouchableOpacity>
			</>
		)

	if (type === 'pro')
		return (
			<>
				<View style={styles.header}>
					<TouchableOpacity style={{ marginRight: 8, padding: 8 }} onPress={goBack}>
						<ArrowIcon />
					</TouchableOpacity>
					<Text style={styles.title}>Выберите период</Text>
				</View>
				<ProfileCard>
					<Text style={styles.title}>PRO</Text>
					<Text style={styles.description}>
						Более 20 высокопроходимых прогнозов с КЭФ 3.0+ Бонус - каждый день гарантированный экспресс!
					</Text>
				</ProfileCard>
				<Text style={[styles.description, { marginBottom: 8, marginTop: 16 }]}>Выберите период</Text>
				{period.map(({ id, title, desc, selected }) => {
					return <PlanPeriod key={id} id={id} title={title} description={desc} selected={selected} onPress={() => selectPeriod(id)} />
				})}
				<TouchableOpacity style={styles.blueButton} onPress={buyPurchaseHandler}>
					<Text style={styles.blueButtonText}>Оформить</Text>
				</TouchableOpacity>
			</>
		)

	if (type === 'full')
		return (
			<>
				<View style={styles.header}>
					<TouchableOpacity style={{ marginRight: 8, padding: 8 }} onPress={goBack}>
						<ArrowIcon />
					</TouchableOpacity>
					<Text style={styles.title}>Выберите период</Text>
				</View>
				<ProfileCard>
					<Text style={styles.title}>FULL</Text>
					<Text style={styles.description}>Полный доступ ко всем прогнозам! +300% к банку!</Text>
				</ProfileCard>
				<Text style={[styles.description, { marginBottom: 8, marginTop: 16 }]}>Выберите период</Text>
				{period.map(({ id, title, desc, selected }) => {
					return <PlanPeriod key={id} id={id} title={title} description={desc} selected={selected} onPress={() => selectPeriod(id)} />
				})}
				<TouchableOpacity style={styles.blueButton} onPress={buyPurchaseHandler}>
					<Text style={styles.blueButtonText}>Оформить</Text>
				</TouchableOpacity>
			</>
		)

	return <></>
}

interface IPlanPeriod {
	id: string
	title: string
	description: string
	selected: boolean
	onPress: () => void
}

const PlanPeriod = ({ id, title, description, selected, onPress }: IPlanPeriod) => {
	return (
		<ProfileCard touchable onPress={onPress}>
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
				<View>
					<Text style={styles.titleMin}>{title}</Text>
					<Text style={styles.description}>{description}</Text>
				</View>
				<SelectIcon selected={selected} />
			</View>
		</ProfileCard>
	)
}

interface IPlanList {
	selectPlan: React.Dispatch<React.SetStateAction<number>>
}

const PlanList = ({ selectPlan }: IPlanList) => {
	return (
		<>
			<View style={styles.header}>
				<Text style={styles.title}>Выберите подписку</Text>
			</View>
			<ProfileCard touchable onPress={() => selectPlan(1)}>
				<Text style={styles.title}>LITE</Text>
				<Text style={styles.description}>7 дней прогнозов с КЭФ 1.4-2.0! Проходимость более 87%!</Text>
			</ProfileCard>
			<ProfileCard touchable onPress={() => selectPlan(2)}>
				<Text style={styles.title}>PRO</Text>
				<Text style={styles.description}>Более 20 высокопроходимых прогнозов с КЭФ 3.0+ Бонус - каждый день гарантированный экспресс!</Text>
			</ProfileCard>
			<ProfileCard touchable onPress={() => selectPlan(3)}>
				<Text style={styles.title}>FULL</Text>
				<Text style={styles.description}>Полный доступ ко всем прогнозам! +300% к банку!</Text>
			</ProfileCard>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		paddingBottom: 0,
		paddingTop: 40,
	},
	header: {
		marginBottom: 16,
		flexDirection: 'row',
		alignItems: 'center',
	},
	title: {
		fontFamily: 'Poppins-Bold',
		fontSize: 22,
		color: '#ffffff',
	},
	titleMin: {
		fontFamily: 'Inter-Medium',
		color: '#ffffff',
		fontSize: 14,
	},
	description: {
		fontFamily: 'Inter-Regular',
		color: '#8F919C',
		fontSize: 12,
	},
	blueButton: {
		width: '100%',
		height: 48,
		borderRadius: 12,
		backgroundColor: '#2E38E4',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 8,
		marginTop: 16,
	},
	blueButtonText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: 15,
		color: '#ffffff',
	},
})

const ArrowIcon = () => (
	<Svg width="18" height="16" viewBox="0 0 18 16" fill="none">
		<Path
			d="M7.29289 0.292893C7.68342 -0.0976311 8.31658 -0.0976311 8.70711 0.292893C9.09763 0.683418 9.09763 1.31658 8.70711 1.70711L3.414 7H17C17.5128 7 17.9355 7.38604 17.9933 7.88338L18 8C18 8.55228 17.5523 9 17 9H3.414L8.70711 14.2929C9.06759 14.6534 9.09532 15.2206 8.7903 15.6129L8.70711 15.7071C8.31658 16.0976 7.68342 16.0976 7.29289 15.7071L0.292893 8.70711L0.219689 8.62545C0.217372 8.62256 0.215071 8.61966 0.212786 8.61675C0.207285 8.60984 0.201753 8.6026 0.196334 8.59531C0.17849 8.57113 0.161719 8.54628 0.146068 8.52066C0.138607 8.50861 0.131499 8.49639 0.124671 8.48406C0.113794 8.46429 0.103377 8.44389 0.0936537 8.4231C0.0856789 8.4061 0.0781966 8.3888 0.0712256 8.37134C0.0633159 8.35158 0.0561225 8.3318 0.0495467 8.31174C0.0447288 8.29685 0.0400979 8.28146 0.0358453 8.26599C0.0298338 8.24444 0.0246396 8.22275 0.020165 8.20079C0.016702 8.18338 0.0136281 8.16595 0.0110178 8.14847C0.00376119 8.10036 0 8.05062 0 8L0.00396633 8.08925C0.0018949 8.066 0.000634706 8.04268 0.000185966 8.01935L0 8C0 7.99359 6.03044e-05 7.9872 0.000180244 7.98082C0.000599384 7.95798 0.00186552 7.93433 0.00396633 7.91075C0.00576604 7.89015 0.00811212 7.8705 0.0110192 7.85104C0.013628 7.83405 0.0167024 7.81663 0.0202403 7.79927C0.02464 7.77725 0.0298335 7.75556 0.0357208 7.73416C0.0400976 7.71854 0.0447286 7.70315 0.0497379 7.68786C0.0561223 7.6682 0.0633158 7.64842 0.071104 7.62894C0.0781965 7.61121 0.0856789 7.5939 0.0936732 7.57678C0.103377 7.55611 0.113794 7.53571 0.124876 7.51572C0.131499 7.50361 0.138607 7.49139 0.145996 7.47929C0.161719 7.45373 0.17849 7.42887 0.196313 7.40484C0.225313 7.36567 0.257499 7.32829 0.292893 7.29289L0.212786 7.38325C0.237669 7.35153 0.264427 7.32136 0.292893 7.29289L7.29289 0.292893Z"
			fill="#ffffff"
		/>
	</Svg>
)

const SelectIcon = ({ selected }: { selected: boolean }) => (
	<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Path
			d="M12 0C18.6289 0 24 5.37258 24 12L23.9962 12.305C23.8344 18.7929 18.5255 24 12 24L11.695 23.9962C5.20713 23.8344 0 18.5255 0 12L0.00379986 11.695C0.165607 5.20713 5.47454 0 12 0ZM18.2918 7.66519C17.9107 7.29876 17.292 7.29612 16.9121 7.6614L10 14.3077L7.09412 11.5136C6.70693 11.1413 6.09027 11.144 5.7082 11.5113L5.6918 11.5271C5.31071 11.8936 5.31126 12.4916 5.69523 12.8608L9.30477 16.3315C9.68723 16.6993 10.3095 16.7024 10.6913 16.3353L18.3087 9.01084C18.6902 8.64404 18.6903 8.04834 18.3082 7.68096L18.2918 7.66519Z"
			fill={selected ? '#ffffff' : '#44454B'}
		/>
	</Svg>
)
