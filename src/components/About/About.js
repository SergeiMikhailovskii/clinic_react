import React, {Fragment, PureComponent} from "react";
import {GoogleApiWrapper, Map} from "google-maps-react";
import {addReview, getReviews} from "../../models/AppModel";
import {compose} from "redux";
import {connect} from "react-redux";
import {downloadReviewsAction} from "../../store/actions";

class About extends PureComponent {

    review = "";

    async componentDidMount() {
        const reviews = await getReviews();
        this.props.downloadReviewsDispatch(reviews);
    }

    saveReview = async () => {
        if (this.review) {
            const reviews = await addReview(this.review);
            this.props.downloadReviewsDispatch(reviews);
        }
    };

    onReviewChange = (event) => {
        this.review = event.target.value;
    };

    render() {
        const {reviews} = this.props;

        return (
            <Fragment>
                <h1>УЗ «21-я центральная районная поликлиника Заводского района г. Минска»</h1>
                <h3>Address: vulica Filatava 13, Minsk 220026</h3>
                <h3>Phone: 8 017 345-92-77</h3>
                <br/>
                <input placeholder={"Оставьте отзыв"} onChange={this.onReviewChange}/>
                <button onClick={this.saveReview}>Save</button>
                <br/>
                {reviews && <div>
                    <br/>
                    <h3>Reviews</h3>
                    {reviews.map(el => {
                        return <h5>{el.review}</h5>
                    })}
                </div>}
                <br/>
                <Map
                    google={this.props.google}
                    zoom={18}
                    style={{width: "100%", height: "50%"}}
                    initialCenter={
                        {
                            lat: 53.8692218,
                            lng: 27.6305805
                        }
                    }
                />
            </Fragment>
        )
    }
}

const mapStateToProps = ({reviews}) => ({reviews});

const mapDispatchToProps = dispatch => ({
    downloadReviewsDispatch: (reviews) =>
        dispatch(downloadReviewsAction(reviews))
});

export default compose(
    GoogleApiWrapper({
        apiKey: 'AIzaSyCvt6UqOQerhAoNEiQz3OW6GSYNYcbdmyQ'
    }),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(About);