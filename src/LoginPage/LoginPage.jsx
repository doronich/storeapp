import React from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../actions';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.props.dispatch(userActions.logout());

        this.state = {
            username: 'Test1000',
            password: 'FKdf9dFff23',
            submitted: false
        }
    }

    handleChange = event => {
        const {name, value } = event.target;
        this.setState({[name]:value});
    }

    handleSubmit = event => {
        event.preventDefault();
        
        this.setState({submitted: true});
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password){
            dispatch(userActions.login(username,password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div>
                <h2>Sign In</h2>
                <Link to="/register">Need an account?</Link>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" value={username} onChange={this.handleChange} placeholder="Login"/>
                        {
                            submitted && !username && 
                            <div>Username is required</div>
                        }
                    </div>
                    
                    <div>
                        <input type="password"value={password} onChange={this.handleChange} placeholder="Password"/>
                        {
                            submitted && !password && 
                            <div>Password is required</div>
                        }
                    </div>
                    <div>
                        <button>Sign in</button>
                        {
                            loggingIn &&
                            <div>Loading...</div>
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };