import React, {Fragment, PureComponent} from "react";
import './DoctorsList.css'

class DoctorsList extends PureComponent {

    render() {
        const list = [{
            name: "User1"
        }, {
            name: "User2"
        }];

        return (
            <Fragment>
                <div style={{backgroundColor: 'rgba(256, 0, 0, 0.2)'}}>
                    {list.map(el => {
                        return <p style={{width: '200px'}} onClick={this.onRecordClick(el)}>{el.name}</p>
                    })}
                </div>
            </Fragment>
        );
    }

    onRecordClick(element) {
        console.log(element.name)
    }
}

export default DoctorsList