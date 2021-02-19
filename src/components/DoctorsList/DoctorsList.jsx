import React, {Fragment, PureComponent} from "react";
import './DoctorsList.css'
import {Link} from "react-router-dom";


class DoctorsList extends PureComponent {

    render() {
        const list = [{
            id: 1,
            name: "User1"
        }, {
            id: 2,
            name: "User2"
        }];

        return (
            <Fragment>
                <div style={{backgroundColor: 'rgba(256, 0, 0, 0.2)'}}>
                    {list.map(el => {
                        return <div>
                            <Link exact to={"/schedule/" + el.id}>
                                <p style={{width: '200px'}} onClick={() => {
                                    console.log(el.name)
                                }}>{el.name}</p>
                            </Link>
                        </div>
                    })}
                </div>
            </Fragment>
        );
    }
}

export default DoctorsList