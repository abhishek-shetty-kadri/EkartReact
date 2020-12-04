import React from 'react';
import { connect } from 'react-redux';
import { login } from '../Actions/actions';
import NavBar from './navbar';

import '../App.css';
const mapStatesToProps = (state) => {
    return {
        loggedIn: state.loggedInReducer.isLoggedIn,
        hasTried: state.loggedInReducer.hasTried
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        Verify: (email,password) => dispatch(login(email,password))
    }
}
class LoginComponent extends React.Component {
    constructor() {
        super();        
        this.state = { userId: '', password: '', enable: false };
    }
    enableButton() {
        if (this.state.userId.trim().length > 0 && this.state.password.length > 0)
            this.setState({ enable: true });
        else
            this.setState({ enable: false });
    }
    setFields = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => this.enableButton());        
    }
    handleLogin = (e) => {
        e.preventDefault();
        this.props.Verify(this.state.userId, this.state.password);
    }
    componentDidMount() {
        console.log('Mount');
        if (this.props.loggedIn)
            this.props.history.push('/products');
    }
    componentDidUpdate() {
        console.log('component Update');
        if (this.props.loggedIn) {
            console.log('YAYY');
            this.props.history.push('/products');
        }
    }
    render() {
        return (<React.Fragment>
            <NavBar />
            <br /><br />
            
            <div className="container">
                <form className="myform" style={{ backgroundColor: "lightgray" }}>
                    <h1 className="title">Login</h1>
                    <div className="form-group" style={{ padding: "20px" }}>
                        <label htmlFor="User Name">User Name</label>
                        <input type="text" className="form-control" name="userId" value={this.state.userId} onChange={this.setFields} /><br />
                    </div>
                    <div className="form-group" style={{ padding: '20px' }}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.setFields} /><br />



                    </div >
                    {this.props.hasTried && !this.props.loggedIn ? <p style={{ color: 'red', textAlign: 'center' }}>Invalid Credentials</p> : null}
                    <div style={{ padding: "20px" }} align="center">
                        <button type="submit" disabled={!this.state.enable} className="btn btn-primary" onClick={ this.handleLogin}>Login</button>
                    </div >
                </form >

            </div >


        </React.Fragment>)
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(LoginComponent);