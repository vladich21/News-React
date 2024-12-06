import {useEffect, useState} from 'react'
import { getCategories, getNews } from '../Api/apiNews';
import NewsBanner from '../components/NewsBanner/NewsBanner';
import NewsList from '../components/NewsList/NewsList'
import styles from './styles.module.css'
import Skeleton from '../components/Skeleton/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import Categories from '../components/Categories/Categories';
import Search from '../components/Search/Search';
import { useDebounce } from '../helpers/hooks/useDebounce';

const Main = () => {
	const [news, setNews] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1);
	const [categories, setCategories] = useState([])
	const [keywords, setKeywords] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('All')
	const totalPages = 10;
	const pageSize = 10;
	
	const debouncedKeywords = useDebounce(keywords, 1500)
	
	const fetchNews = async (currentPage) => {
		try { 
			setIsLoading(true)
			const response = await getNews({
			page_number: currentPage,
			page_size: pageSize,
			category: selectedCategory === 'All' ? null : selectedCategory, 
			keywords: debouncedKeywords,
		})
			setNews(response.news);
			setIsLoading(false)
		} catch (error) {
			console.log(error);	
		}
	} 

	const fetchCategories = async () => {
		try { 
		
			const response = await getCategories()
			setCategories(["ALL", ...response.categories]);
		
		} catch (error) {
			console.log(error);	
		}
	} 

	useEffect(() => {
		fetchCategories()
	},[])


	useEffect(() => {
		fetchNews(currentPage)
	},[currentPage, selectedCategory, debouncedKeywords])

const handleNextPage = () => {
	if (currentPage < totalPages) {
		setCurrentPage(currentPage + 1)
	}
}

const handlePreviousPage = () => {
	if (currentPage > 1) {
		setCurrentPage(currentPage - 1)
	}
}

const handePageClick = (pageNumber) => {
		setCurrentPage(pageNumber);
}

	return(
		<main className={styles.main}>
			<Categories categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory}/>

			<Search keywords={keywords} setKeywords={setKeywords} />

		{news.length > 0 && !isLoading ? (<NewsBanner item={news[0]} />) : (<Skeleton type={'banner'} count ={1}/>)}
		<Pagination 
		handleNextPage={handleNextPage}  
		handlePreviousPage={handlePreviousPage} handePageClick={handePageClick} 
		totalPages={totalPages} 
		currentPage={currentPage}/>

	{!isLoading ? ( <NewsList news={news}/> ): (<Skeleton type={'item'} count ={10}/>)}	
	
	<Pagination 
		handleNextPage={handleNextPage}  
		handlePreviousPage={handlePreviousPage} handePageClick={handePageClick} 
		totalPages={totalPages} 
		currentPage={currentPage}/>
	</main>
	)
}
export default Main;
