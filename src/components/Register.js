import React from 'react'
import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';

export default class Register extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            login:'',
            email:'',
            password:''
        }

        this.handleLoginChange=this.handleLoginChange.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('Form is submitted')
    }

    handleLoginChange(event){
        this.setState({login: event.target.value})
    }

    handleEmailChange(event){
        this.setState({email: event.target.value})
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value})
    }

    render(){
        return(
            <div>
                <h2>Sign Up</h2>
                <Link to="/login" >Have an account?</Link>
                <ListErrors errors={this.props.errors}/>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
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
                        value="Sign up"/>
                </form>
            </div>
        );
    }
}