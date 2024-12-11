import React from 'react';
import { getCategories } from '../../Api/apiNews';
import { useFetch } from '../../helpers/hooks/useFetch';
import Categories from '../Categories/Categories';
import Search from '../Search/Search';
import Slider from '../Slider/Slider';
import styles from './style.module.css'
import { CategoriesApiResponse, IFilters } from '../../interfaces';
import { useTheme } from '../../context/ThemeContext';

interface Props {
	filters: IFilters;
	changeFilter: (key: string, value: string | number | null) => void
}

const NewsFilters = ({filters, changeFilter}: Props) =>{
	const {isDark} = useTheme()
	const {data: dataCategories} = useFetch<CategoriesApiResponse, null>(getCategories)

	return(
		<div className={styles.filters}>
		{dataCategories ?
			<Slider isDark={isDark}>
				<Categories
				categories={dataCategories.categories} selectedCategory={filters.category} setSelectedCategory={(category)=> changeFilter("category", category)}/>						
			</Slider>								
		: null}

		<Search 
			keywords={filters.keywords} 
			setKeywords={(keywords)=> changeFilter("keywords", keywords)} />
		</div>
	)
}
export default NewsFilters;