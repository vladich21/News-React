import styles from './style.module.css'

const Pagination = ({totalPages, handleNextPage, handlePreviousPage, handePageClick, currentPage}) =>{
	return(
		<div className={styles.pagination}>
			<button  
			onClick={handlePreviousPage} 
			disabled={currentPage <= 1}
			className={styles.arrow}>{'<'}
			</button>
				<div  className={styles.list}>
					{[...Array(totalPages)].map((_, index) => {
						return 	<button 
						onClick={() =>handePageClick(index + 1)} 
						className={styles.pageNumber}
						disabled={index + 1 === currentPage}
						key={index}>{index + 1}</button>
					})}
				</div>
			<button
				onClick={handleNextPage} 
				disabled={currentPage >= totalPages}
			  className={styles.pageNumber}>{'>'}</button>
		</div>
	)
}
export default Pagination;