import React, {Fragment, PureComponent} from "react";
import './DoctorsList.css'
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {getDoctors as getDoctorsFromServer} from '../../models/AppModel.js';
import {addNewDoctorAction, downloadDoctorsAction} from "../../store/actions";
import {addDoctor, deleteDoctor, editDoctor} from "../../models/AppModel";
import Cookies from "js-cookie";


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

    deleteDoctor = async (id) => {
        if (window.confirm("Вы действительно хотите удалить пользователя?")) {
            const doctors = await deleteDoctor({"id": id});
            this.props.addNewDoctorDispatch(doctors)
        }
    };

    editDoctor = async (id) => {
        let name = prompt("Введите имя");
        if (name === null) return;
        let position = prompt("Введите специализацию");
        if (position === null) return;
        let image = prompt("Вставьте ссылку на фотографию");
        if (image === null) return;
        const doctors = await editDoctor({
            "id": id,
            "doctorName": name,
            "doctorSpecialization": position,
            "doctorPhoto": image
        });
        this.props.addNewDoctorDispatch(doctors)
    };

    render() {
        const {doctors} = this.props;
        return (
            <Fragment>
                {Cookies.get('isAdmin') === 'true' &&
                <button className="btn btn-primary btn-lg btn-block" onClick={this.onAddDoctorClick}>Добавить
                    врача</button>}
                <div className="list-group" style={{marginTop: '20px', marginLeft: '20px'}}>
                    {doctors.map(el => {
                        return <div className="list-group-item list-group-item-primary" style={{marginBottom: '25px'}}>
                            <Link exact to={"/schedule/" + el.id}>
                                <div>
                                    <img src={el.doctorPhoto} width='100px' height='100px' alt="Avatar"
                                         className="doctor-photo-list"/>
                                    <div className="doctor-name-list">
                                        <p>{el.doctorName}</p>
                                        <p>{el.doctorSpecialization}</p>
                                    </div>
                                </div>
                            </Link>
                            {Cookies.get('isAdmin') === 'true' &&
                            <button className="btn btn-primary btn-lg"
                                    onClick={() => this.deleteDoctor(el.id)}>Удалить</button>}
                            {Cookies.get('isAdmin') === 'true' &&
                            <button className="btn btn-secondary btn-lg"
                                    onClick={() => this.editDoctor(el.id)}>Изменить</button>}
                        </div>
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