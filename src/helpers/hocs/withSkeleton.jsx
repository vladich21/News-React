function withSkeleton(component, type, count) {
	return function withSkeleton(props){
		const {isLoading, ...resProps} = props
		if(isLoading) {
			return <Skeleton type={type} count={count}/>
		}
		return <Component {...restProps}/>
	}
}
export default withSkeleton;