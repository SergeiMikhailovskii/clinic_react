import React, {PureComponent} from "react";
import {loginUser, registerUser} from "../../models/AppModel";
import Cookies from "js-cookie"

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
        return <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            flexDirection: 'column'
        }}>
            <input placeholder="Login" style={{margin: '16px'}} onChange={this.onLoginChange}/>
            <input placeholder="Password" style={{margin: '16px'}} onChange={this.onPasswordChange}/>
            <button style={{margin: '16px'}} onClick={this.onLoginClick}>Login</button>
            <button style={{margin: '16px'}} onClick={this.onRegisterClick}>Register</button>
        </div>
    }
}

export default Login