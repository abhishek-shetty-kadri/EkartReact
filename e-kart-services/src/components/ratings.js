import '../styles/styles.css';
function RatingComponent(props) {
    let rating=[1,2,3,4,5]
    return (
        rating.map((rat) => {
            if (rat <= props.rating) {
                return <span key={rat} className="fa fa-star checked"></span>
            }
            else {
                return <span key={rat} className="fa fa-star"></span>
            }
        })
        )
}

export default RatingComponent;