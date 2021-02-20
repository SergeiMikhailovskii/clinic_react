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
                        return <Link exact to={"/schedule/" + el.id}>
                            <div>
                                <img src={el.doctorPhoto} width='100px' height='100px' className="doctor-photo-list"/>
                                <div className="doctor-name-list">
                                    <p>{el.doctorName}</p>
                                    <p>{el.doctorSpecialization}</p>
                                </div>
                            </div>
                        </Link>
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