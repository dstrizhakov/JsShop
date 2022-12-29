import { Container, Row } from 'react-bootstrap'
import ProductList from '../components/ProductList.js'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../components/AppContext.js'
import { fetchCategories, fetchBrands, fetchAllProducts } from '../http/catalogAPI.js'
import { observer } from 'mobx-react-lite'
import { useLocation, useSearchParams } from 'react-router-dom'
import CategoryFilter from "../components/CategoryFilter";
import Loading from '../components/Loading';


const getSearchParams = (searchParams) => {
	let category = searchParams.get('category')
	if (category && /[1-9][0-9]*/.test(category)) {
		category = parseInt(category)
	}
	let brand = searchParams.get('brand')
	if (brand && /[1-9][0-9]*/.test(brand)) {
		brand = parseInt(brand)
	}
	let page = searchParams.get('page')
	if (page && /[1-9][0-9]*/.test(page)) {
		page = parseInt(page)
	}
	return { category, brand, page }
}

const Shop = observer(() => {
	const { catalog } = useContext(AppContext)

	const [categoriesFetching, setCategoriesFetching] = useState(true)
	const [brandsFetching, setBrandsFetching] = useState(true)
	const [productsFetching, setProductsFetching] = useState(true)

	const location = useLocation()
	const [searchParams] = useSearchParams()

	useEffect(() => {
		fetchCategories()
			.then(data => catalog.categories = data)
			.finally(() => setCategoriesFetching(false))

		fetchBrands()
			.then(data => catalog.brands = data)
			.finally(() => setBrandsFetching(false))

		const { category, brand, page } = getSearchParams(searchParams)
		catalog.category = category
		catalog.brand = brand
		catalog.page = page ?? 1

		fetchAllProducts(catalog.category, catalog.brand, catalog.page, catalog.limit)
			.then(data => {
				catalog.products = data.rows
				catalog.count = data.count
			})
			.finally(() => setProductsFetching(false))
		// eslint-disable-next-line
	}, [])

	// При каждом клике на категорию, тип или номер страницы — мы добавляем элемент в историю
	// браузера, ссылки в истории имеют вид /?page=1, /?page=2, /?page=3. При нажатии кнопки 
	// «Назад» браузера — мы отслеживаем изменение GET-параметров и изменяем состояние хранилища.
	useEffect(() => {
		const { category, brand, page } = getSearchParams(searchParams)
		if (category || brand || page) {
			if (category !== catalog.category) {
				catalog.category = category
			}
			if (brand !== catalog.brand) {
				catalog.brand = brand
			}
			if (page !== catalog.page) {
				catalog.page = page ?? 1
			}
		} else {
			catalog.category = null
			catalog.brand = null
			catalog.page = 1
		}
		// eslint-disable-next-line
	}, [location.search])

	// при клике на категорию, тип, номер страницы или при нажатии кнопки  «Назад»
	// браузера — получам с сервера список товаров, потому что это уже другой список
	useEffect(() => {
		setProductsFetching(true)
		fetchAllProducts(catalog.category, catalog.brand, catalog.page, catalog.limit)
			.then(data => {
				catalog.products = data.rows
				catalog.count = data.count
			})
			.finally(() => setProductsFetching(false))
		// eslint-disable-next-line
	}, [catalog.category, catalog.brand, catalog.page])

	return (
		<Container className="page-header">
			<h1 className="text-center">Catalog</h1>
			{categoriesFetching || brandsFetching || productsFetching
				? <Loading />
				:
				<>
					<Row >
						<CategoryFilter />
					</Row>
					<ProductList />
				</>
			}
		</Container>
	)
})

export default Shop
