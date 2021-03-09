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

    onLoginClick = async () => {
        const response = await loginUser({login: this.state.login, password: this.state.password});
        if (response.success === true) {
            Cookies.set('isAdmin', response.isAdmin);
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
            this.props.history.push("/main")
        }
    };

    render() {
        return <div className="container">
            <div className="input-group mb-2 input-login" style={{width: '40%'}}>
                <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                </div>
                <input type="text" className="form-control" id="inlineFormInputGroup"
                       placeholder="Login" onChange={this.onLoginChange}/>
            </div>
            <div className="input-group mb-2 input-login" style={{width: '40%'}}>
                <div className="input-group-prepend">
                    <div className="input-group-text">#</div>
                </div>
                <input type="password" className="form-control" id="inlineFormInputGroup"
                       placeholder="Password" onChange={this.onPasswordChange}/>
            </div>
            <br/>
            <div className="input-login" style={{width: '40%'}}>
                <button type="button" className="btn btn-warning login-button" style={{background: '#fbceb5'}}
                        onClick={this.onLoginClick}>Login
                </button>
            </div>
            <br/>
            <div className="input-login" style={{width: '40%'}}>
                <button type="button" className="btn btn-warning reg-button" style={{background: '#fff'}}
                        onClick={this.onRegisterClick}>Register
                </button>
            </div>
        </div>
    }
}

export default Login