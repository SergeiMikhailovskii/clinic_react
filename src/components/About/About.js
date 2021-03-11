import React, {PureComponent} from "react";
import {GoogleApiWrapper, Map} from "google-maps-react";
import {addReview, getReviews} from "../../models/AppModel";
import {compose} from "redux";
import {connect} from "react-redux";
import {downloadReviewsAction} from "../../store/actions";
import "./About.css";

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
            <div style={{background: '#c4edff'}}>
                <div className="header">
                    <img width='150px' height='130px' src={"logo.png"}/>
                    <div style={{margin: 16}}>
                        <h1>УЗ «21-я центральная районная поликлиника Заводского района г. Минска»</h1>
                        <ul><h5>Телефон для справок:</h5></ul>
                        <li style={{color: '#ff0000'}}><a href="tel:8-017-345-92-77" style={{color: '#ff0000'}}>8 017
                            345-92-77</a></li>
                        <h5>Платные услуги:</h5>
                        <li style={{color: '#ff0000'}}><a href="tel:8-017-345-92-77" style={{color: '#ff0000'}}>8 017
                            345-92-77</a></li>
                        <h5>Вызов врача на дом</h5>
                        <li style={{color: '#ff0000'}}><a href="tel:8-017-345-92-77" style={{color: '#ff0000'}}>8 017
                            345-92-77</a></li>
                    </div>
                </div>
                <div className="img-div"/>
                <input placeholder={"Оставьте отзыв"} onChange={this.onReviewChange}/>
                <button onClick={this.saveReview}>Save</button>
                <br/>
                {reviews && <div>
                    <br/>
                    <h3>Отзывы</h3>
                    {reviews.map(el => {
                        return <h5>{el.review}</h5>
                    })}
                </div>}
                <br/>
                <Map
                    google={this.props.google}
                    zoom={18}
                    style={{width: "100%"}}
                    initialCenter={
                        {
                            lat: 53.8692218,
                            lng: 27.6305805
                        }
                    }
                />
            </div>
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