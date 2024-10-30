import {formatTimeAgo} from '../../helpers/formatTimeAgo'
import PropTypes from 'prop-types';
import styles from './style.module.css'

const NewsItem = ({item}) =>{
	return(
		<li className={styles.item}>
			<div className={styles.wrapper} style={{backgroundImage: `url(${item.image})`}}></div>
			<div className={styles.info}>
			<h3 className={styles.title}>{item.title}</h3>
			<p className={styles.extra}>{formatTimeAgo(item.published)} by {item.author}</p>
			</div>
		</li>
	)
}

NewsItem.propTypes ={
	item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string, // если изображение не обязательно
  }).isRequired,
}
export default NewsItem;
