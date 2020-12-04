import React from 'react';
import '../styles/styles.css';
import ReactTooltip from "react-tooltip";
import { connect } from 'react-redux';
import { logOut } from '../Actions/actions';
import { withRouter, Link } from 'react-router-dom';
const mapStatesToProps = (state) => {
    return {
        logged: state.loggedInReducer.isLoggedIn,
        userName: state.loggedInReducer.userName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logOut())        
    }
}

class NavBar extends React.Component {
    logout = () => {
        sessionStorage.clear();
        this.props.logout();
        this.props.history.push('/');
    }
    editMyProfile = () => {

    }
    gotoLogin = () => {
        this.props.history.push('/login');
    }
    signup = () => {
        this.props.history.push('/register')
    }
    render() {
        return (
            <React.Fragment>
                {!this.props.logged ? (<div className="topnav">

                    <button style={{ fontSize: '20px' }}>E-Kart Services</button>



                    <div className="topnav-right">
                        <button onClick={this.signup}>Sign Up</button>
                        <button onClick={this.gotoLogin}><i className="glyphicon glyphicon-log-in" /> Login</button>
                       
                    </div>
                </div>) : (<div className="topnav">

                        <a style={{ fontSize: "23px" }}>E-Kart Services</a>


                        

                        <div className="topnav-right">                           
                                                      

                            <Link to="/profile" style={{ color: "blue", fontSize: "18px", cursor: 'pointer' }} data-tip data-for="Profile" className="navbar-btn"><span className="glyphicon glyphicon-user"></span>&nbsp;<b style={{ textDecorationLine: "underline"}}>Hi  {this.props.userName ? this.props.userName : null}</b></Link>
                            <button align="center" className="btn btn-primary navbar-btn" onClick={this.logout}>Log out</button>&nbsp;
                        <ReactTooltip id="Profile" place="top" effect="solid">
                                Click here to Manage your Profile<br/> and Address
                            </ReactTooltip>
               

                    </div>
                </div >)}</React.Fragment>
        )
    }
    
}
export default withRouter(connect(mapStatesToProps, mapDispatchToProps)(NavBar));