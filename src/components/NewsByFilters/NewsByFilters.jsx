import { TOTAL_PAGES } from '../../constant/constant';
import styles from './style.module.css'
import Pagination from '../Pagination/Pagination'
import NewsList from '../NewsList/NewsList'
import NewsFilters from '../NewsFilters/NewsFilters';


const NewsByFilters = ({filters, changeFilter, isLoading, news}) =>{

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
		<section className={styles.section}>
			<NewsFilters filters={filters} changeFilter={changeFilter}/>

		<Pagination 
		handleNextPage={handleNextPage}  
		handlePreviousPage={handlePreviousPage} handePageClick={handePageClick} 
		totalPages={TOTAL_PAGES} 
		currentPage={filters.page_number}/>

	<NewsList news={news} isLoading={isLoading}/>
	
	<Pagination 
		handleNextPage={handleNextPage}  
		handlePreviousPage={handlePreviousPage} handePageClick={handePageClick} 
		totalPages={TOTAL_PAGES} 
		currentPage={filters.page_number}/>
		</section>
	)
}
export default NewsByFilters;
