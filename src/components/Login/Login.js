import React, {PureComponent} from "react";
import {loginUser, registerUser} from "../../models/AppModel";
import Cookies from "js-cookie";
import './Login.css';

class Login extends PureComponent {

    state = {
        login: "",
        password: ""
    };

    onLoginChange = (event) => {
        this.setState({
            login: event.target.value
        });
    };

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    onLoginClick = async (login, password) => {
        const response = await loginUser({login, password});
        if (response.success === true) {
            // Cookies.set('isAdmin', response.isAdmin);
            handleResponseCookies(response.isAdmin);
            this.props.history.push("/main");
        } else {
            alert("User not found")
        }
    };

    onRegisterClick = async () => {
        const response = await registerUser({login: this.state.login, password: this.state.password});
        if (response.error && response.error === true) {
            alert("Such user exists!")
        } else {
            Cookies.set('isAdmin', false);
            console.log(Cookies.get('isAdmin'));
            this.props.history.push("/main")
        }
    };

    render() {
        return <div className="container-login">
            <div className="btns">
                <div className="input-group mb-2 input-login">
                    <div className="input-group-prepend">
                        <div className="input-group-text">@</div>
                    </div>
                    <input type="text" className="form-control" id="inlineFormInputGroup"
                           placeholder="Login" onChange={this.onLoginChange}/>
                </div>
                <div className="input-group mb-2 input-login">
                    <div className="input-group-prepend">
                        <div className="input-group-text">#</div>
                    </div>
                    <input type="password" className="form-control" id="inlineFormInputGroup"
                           placeholder="Password" onChange={this.onPasswordChange}/>
                </div>
                <br/>
                <div className="input-login">
                    <button type="button" className="btn btn-warning login-button"
                            style={{background: '#fbceb5'}}
                            onClick={() => this.onLoginClick(this.state.login, this.state.password)}>Login
                    </button>
                </div>
                <br/>
                <div className="input-login">
                    <button type="button" className="btn btn-warning reg-button" style={{background: '#fff'}}
                            onClick={this.onRegisterClick}>Register
                    </button>
                </div>
            </div>
        </div>
    }
}

export function handleResponseCookies(isAdmin) {
    Cookies.set('isAdmin', isAdmin);
    return Cookies.get('isAdmin')
}

export default Login