import React from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, updateProfile, UpdateProfileState } from '../Actions/actions';
import AddressComponent from './addressComponent';
import NavBar from './navbar';
import { Link } from 'react-router-dom';
const mapStatesToProps = (state) => {
    return {
        name: state.loggedInReducer.userName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateDetails: (nam, pass) => {
            const data = { name: nam, password: pass };
            dispatch(UpdateProfileState(data));
        }
    }
}

class ProfileComponent extends React.Component {
    constructor() {
        super();
        this.state = { name: '', password: '', confirmpassword: '', addresses: '', nameMsg: '', pwdMsg: '', passwordMsg: '', btndisable:false}
        
    }
    checkEnable() {
        if (this.state.nameMsg === '' && this.state.passwordMsg === '' && this.state.pwdMsg === ''
            && this.state.name.trim().length > 0 && this.state.password.length > 0
        ) {
            this.setState({ btndisable: false });
            console.log('true');
        }
        else {
            this.setState({ btndisable: true });
            console.log('false');
        }
    }
    setFields = (e)=>{
        this.setState({ [e.target.name]: e.target.value });
        switch (e.target.name) {
            case 'name':
                if (e.target.value.length === 0)
                    this.setState({ nameMsg: 'Name is Required' });
                else {
                    let namepattern = /^[a-z A-Z \s]+$/;
                    if (namepattern.test(e.target.value)) {
                        this.setState({ nameMsg: '' }, () => { this.checkEnable() });
                    }
                    else {
                        this.setState({ nameMsg: "Name should contain only alphabets and spaces" }, () => { this.checkEnable() });
                    }
                }
                break;
            case 'password':
                let regularExpression = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
                console.log('In PWD');
                if (regularExpression.test(e.target.value)) {
                    this.setState({ passwordMsg: '' }, () => { this.checkEnable() });
                }
                else
                    this.setState({ passwordMsg: 'Password should contain at least an uppercase and a lowercase character, a number and a special character with 8 to 16 characters' }, () => { this.checkEnable() });
                if (e.target.value !== this.state.confirmpassword)
                    this.setState({ pwdMsg: 'Password and Confirm Password do not match' }, () => { this.checkEnable() });
                else {
                    this.setState({ pwdMsg: '' }, () => { this.checkEnable() });
                }
                break;
            case 'confirmpassword':
                if (e.target.value !== this.state.password)
                    this.setState({ pwdMsg: 'Password and Confirm Password do not match' }, () => { this.checkEnable() });
                else {
                    this.setState({ pwdMsg: '' }, () => { this.checkEnable() });
                }
                break;          
            default:
                break;
        }

    }
    updateProfile = async(e) => {
        e.preventDefault();
        const updtInfo = await updateProfile(JSON.parse(sessionStorage.getItem('loggedUser')).email, this.state.password, this.state.name);
        if (updtInfo.errCode === 0 && updtInfo.errMsg === '') {
            this.setState({ UpdtMessage: 'Success!!!',statuscolor:'green' });
            this.props.updateDetails(this.state.name, this.state.password);
        }
        else {            
            this.setState({ UpdtMessage: 'Some Error Occured!!!', statuscolor: 'red' });
        }
    }
    async componentDidMount() {        
        const userInfo = await fetchUserInfo();        
        this.setState({ name: this.props.name, password: userInfo.returnValues[0].password, confirmpassword: userInfo.returnValues[0].password });
    }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <br />
                <br/>
                <div className="container profile">
                    <Link to="/products" style={{ textDecoration:"underline" }}><h3>&lt;&lt;Go to Products</h3></Link>
                    <h1 className="title">My Profile</h1>
                    <form>
                        <h3 style={{ color: this.state.statuscolor, textAlign:"center" }}>{this.state.UpdtMessage}</h3>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" name='name' value={this.state.name} onChange={this.setFields} />
                            <p style={{ color: "red" }}>{this.state.nameMsg}</p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" name='password' value={this.state.password} onChange={this.setFields} />
                            <p style={{ color: "red" }}>{this.state.passwordMsg}</p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="pwdcnfm">Confirm Password:</label>
                            <input type="password" className="form-control" name="confirmpassword" value={this.state.confirmpassword} onChange={this.setFields} />
                            <p style={{ color: "red" }}>{this.state.pwdMsg}</p>
                        </div>
                        <div align="center">
                            <button type="submit" className="btn btn-primary" disabled={this.state.btndisable} onClick={this.updateProfile }>Modify</button>
                            </div>

                    </form>
                    <br />
                    <AddressComponent />
                    <br/>
                </div>
            </React.Fragment>
            
            )
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(ProfileComponent);