import React from 'react'
import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import axios from 'axios'
import api from '../api'

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: ''
        }

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signin = this.signin.bind(this);
    }

    signin(obj) {
        return axios.post(`${api.url}/api/Token`, obj);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.login && this.state.password) {
            const creds = {
                login: this.state.login,
                password: this.state.password
            };
            console.log('creds', creds);
            this.signin(creds)
            .then(res => {
                console.log('res', res);
                console.log(res.data);
            }).catch(err => {
                console.log('err', err);
            });
        } else {
            console.log('creds error');
        }
        console.log('Form is submitted')
    }

    handleLoginChange(event) {
        this.setState({ login: event.target.value })
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Sign In</h2>
                <Link to="/login" >Have an account?</Link>
                <ListErrors errors={this.props.errors} />
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder="Login"
                        value={this.state.login}
                        onChange={this.handleLoginChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    <input
                        type="submit"
                        value="Sign in" />
                </form>
            </div>
        );
    }
}