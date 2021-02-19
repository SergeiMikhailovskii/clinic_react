import React, {Fragment, PureComponent} from "react";
import './DoctorsList.css'
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {getDoctors as getDoctorsFromServer} from '../../models/AppModel.js';
import {downloadDoctorsAction} from "../../store/actions";


class DoctorsList extends PureComponent {

    async componentDidMount() {
        const doctors = await getDoctorsFromServer();
        this.props.downloadDoctorsDispatch(doctors);
    }

    render() {
        const {doctors} = this.props;
        return (
            <Fragment>
                <div style={{backgroundColor: 'rgba(256, 0, 0, 0.2)'}}>
                    {doctors.map(el => {
                        return <div>
                            <Link exact to={"/schedule/" + el.id}>
                                <p>{el.doctorName}</p>
                            </Link>
                        </div>
                    })}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = ({doctors}) => ({doctors});

const mapDispatchToProps = dispatch => ({
    downloadDoctorsDispatch: (doctors) => dispatch(downloadDoctorsAction(doctors))
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsList)