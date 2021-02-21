import React, {Fragment, PureComponent} from "react";
import './DoctorsList.css'
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {getDoctors as getDoctorsFromServer} from '../../models/AppModel.js';
import {addNewDoctorAction, downloadDoctorsAction} from "../../store/actions";
import {addDoctor} from "../../models/AppModel";


class DoctorsList extends PureComponent {

    async componentDidMount() {
        const doctors = await getDoctorsFromServer();
        this.props.downloadDoctorsDispatch(doctors);
    }

    onAddDoctorClick = async () => {
        let name = prompt("Введите имя");
        if (name === null) return;
        let position = prompt("Введите специализацию");
        if (position === null) return;
        let image = prompt("Вставьте ссылку на фотографию");
        if (image === null) return;
        const doctors = await addDoctor({"doctorName": name, "doctorSpecialization": position, "doctorPhoto": image});
        this.props.addNewDoctorDispatch(doctors)
    };

    render() {
        const {doctors} = this.props;
        return (
            <Fragment>
                <button onClick={this.onAddDoctorClick}>Добавить врача</button>
                <div style={{backgroundColor: 'rgba(256, 0, 0, 0.2)', marginTop: '20px', marginLeft: '20px'}}>
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
    downloadDoctorsDispatch: (doctors) => dispatch(downloadDoctorsAction(doctors)),
    addNewDoctorDispatch: (doctors) => dispatch(addNewDoctorAction(doctors))
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsList)