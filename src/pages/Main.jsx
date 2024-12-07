import { getCategories, getNews } from '../Api/apiNews';
import NewsBanner from '../components/NewsBanner/NewsBanner';
import NewsList from '../components/NewsList/NewsList'
import styles from './styles.module.css'
import Pagination from '../components/Pagination/Pagination';
import Categories from '../components/Categories/Categories';
import Search from '../components/Search/Search';
import { useDebounce } from '../helpers/hooks/useDebounce';
import { PAGE_SIZE, TOTAL_PAGES } from '../constant/constant';
import { useFetch } from '../helpers/hooks/useFetch';
import { useFilters } from '../helpers/hooks/useFilters';

const Main = () => {
	const {filters, changeFilter} = useFilters({
		page_number: 1,
		page_size: PAGE_SIZE,
		category: null, 
		keywords: '',
	})
	
	const debouncedKeywords = useDebounce(filters.keywords, 1500)
	
	const {data, isLoading} = useFetch(getNews, {
		...filters,
		keywords: debouncedKeywords,
	})

	const {data: dataCategories} = useFetch(getCategories)

const handleNextPage = () => {
	if (filters.page_number < TOTAL_PAGES) {
		changeFilter('page_number', filters.page_number + 1)
	}
}

const handlePreviousPage = () => {
	if (filters.page_number > 1) {
		changeFilter('page_number', filters.page_number - 1)
	}
}

const handePageClick = (pageNumber) => {
	changeFilter('page_number', pageNumber);
}

	return(
		<main className={styles.main}>
		{dataCategories ?
		 <Categories categories={dataCategories.categories} setSelectedCategory={filters.category} selectedCategory={(category)=> changeFilter("category", category)}/> : null
}
		<Search keywords={filters.keywords} setKeywords={(keywords)=> changeFilter("keywords", keywords)} />

		<NewsBanner isLoading={isLoading} item={data && data.news && data.news[0]} />

		<Pagination 
		handleNextPage={handleNextPage}  
		handlePreviousPage={handlePreviousPage} handePageClick={handePageClick} 
		totalPages={TOTAL_PAGES} 
		currentPage={filters.page_number}/>

	<NewsList news={data?.news} isLoading={isLoading}/>
	
	<Pagination 
		handleNextPage={handleNextPage}  
		handlePreviousPage={handlePreviousPage} handePageClick={handePageClick} 
		totalPages={TOTAL_PAGES} 
		currentPage={filters.page_number}/>
	</main>
	)
}
export default Main;
