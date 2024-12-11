import React from 'react';
import { getLatestNews } from '../../Api/apiNews';
import { useFetch } from '../../helpers/hooks/useFetch';
import { NewsApiResponse} from '../../interfaces'
import BannersList from '../BannersList/BannersList';
import styles from './style.module.css'

const LatestNews = () =>{
	const {data, isLoading} = useFetch<NewsApiResponse, null>(getLatestNews)

	return(
		<section className={styles.section}>
			<BannersList banners={data && data.news} isLoading={isLoading}/>
		</section>
	)
}
export default LatestNews;
