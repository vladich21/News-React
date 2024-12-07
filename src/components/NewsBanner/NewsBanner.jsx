import {formatTimeAgo} from '../../helpers/formatTimeAgo'
import PropTypes from 'prop-types';
import Image from '../Image/Image'
import styles from './style.module.css'
import withSkeleton from '../../helpers/hocs/withSkeleton';

const NewsBanner = ({item}) =>{
	return(
		<div className={styles.banner}>
			<Image image={item?.image}/>
			<h3 className={styles.title}>{item.title}</h3>
			<p className={styles.extra}>{formatTimeAgo(item.published)} by {item.author}</p>
		</div>
	)
}

NewsBanner.propTypes ={
	item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string, // если изображение не обязательно
  }).isRequired,
}

const NewsBannerWithSkeleton = withSkeleton(NewsBanner, 'banner', 1)

export default NewsBannerWithSkeleton;
