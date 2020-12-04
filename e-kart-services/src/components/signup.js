import axios from 'axios';
import React from 'react';
import NavBar from './navbar';
import '../App.css';
class SignUpComponent extends React.Component {
    constructor() {
        super();
        this.state = { name: '', password: '', pwdconfirm: '', emailId:'',phoneNo:'',signUpStatus:'',nameMsg:'',passwordMsg:'',pwdMsg:'',emailMsg:'',phoneMsg:'',btndisable:true}
    }
    setField = (e) => {
        this.setState({ [e.target.name]: e.target.value})
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
                if (e.target.value !== this.state.pwdconfirm)
                    this.setState({ pwdMsg: 'Password and Confirm Password do not match' }, () => { this.checkEnable() });
                else {
                    this.setState({ pwdMsg: '' },()=> { this.checkEnable() });
                }
                break;
            case 'pwdconfirm':
                if (e.target.value !== this.state.password)
                    this.setState({ pwdMsg: 'Password and Confirm Password do not match' }, () => { this.checkEnable() });
                else {
                    this.setState({ pwdMsg: '' }, () => { this.checkEnable() });
                }
                break;
            case 'emailId':
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(e.target.value)) {
                    this.setState({ emailMsg: '' }, () => { this.checkEnable() });
                }
                else
                    this.setState({ emailMsg: 'Please provide a proper email' }, () => { this.checkEnable() });
                break;
            case 'phoneNo':
                const phoneValid = /^[0-9]{10}$/;
                if (phoneValid.test(e.target.value))
                    this.setState({ phoneMsg: '' }, () => { this.checkEnable() });
                else
                    this.setState({ phoneMsg: 'Please provide a valid number' }, () => { this.checkEnable() });
                break;
            default:
                break;
        }
    }
    checkEnable = () => {        
        if (this.state.emailMsg === '' && this.state.phoneMsg === '' && this.state.nameMsg === '' && this.state.passwordMsg === '' && this.state.pwdMsg === ''
            && this.state.name.trim().length > 0 && this.state.password.length > 0 && this.state.emailId.trim().length > 0 && this.state.phoneNo.length>0
        ) {
            this.setState({ btndisable: false });
            console.log('true');
        }
        else {
            this.setState({ btndisable: true });
            console.log('false');
        }
    }
    submit = (e) => {
        e.preventDefault();
        let user = { name: this.state.name, password: this.state.password, phone: this.state.phoneNo, email: this.state.emailId };
        console.log(user);
        axios.post("http://localhost:3001/insertUser", user).then(
            res => {
                if (res.data.errCode === 0) {
                    if (res.data.errMsg === 'success') {
                        this.setState({ signUpStatus: "Registration Successful", signColor:'green' });
                    }
                    else {
                        this.setState({ signUpStatus: res.data.errMsg, signColor:'red' });
                    }
                }
                else {
                    this.setState({ signUpStatus: "Some error Occured.Please try after sometime", signColor: 'red' });
                }
            }
        ).catch(err => console.log(err));
    }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <br />
                <br/>
                    <div className="container">
                    <form className="myForm" style={{ backgroundColor: 'lightgray' }}>
                        <h1 className="title">Sign Up</h1>
                        <div className="form-group" style={{ padding: "20px" }}>
                            <label htmlFor="User Name">Name</label>
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.setField} placeholder="Name" maxLength="20" />
                            <p style={{textAlign:"center",color:"red"}}>{this.state.nameMsg}</p>
                        </div>

                        <div className="form-group" style={{ padding: "20px" }}>
                            <label htmlFor="email">E-mail</label>
                            <input type="text" className="form-control" name="emailId" value={this.state.emailId} onChange={this.setField} placeholder="EmailId" />
                            <p style={{ textAlign: "center", color: "red" }}>{this.state.emailMsg}</p>
                        </div>

                        <div className="form-group" style={{ padding: "20px" }}>
                            <label htmlFor="Password">Password:</label>
                            <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.setField} placeholder="Password" />
                            <p style={{ textAlign: "center", color: "red" }}>{this.state.passwordMsg}</p>
                        </div>


                        <div className="form-group" style={{ padding: "20px" }}>
                            <label htmlFor="Confirm Password">Confirm Password:</label>
                            <input type="password" name="pwdconfirm" className="form-control" value={this.state.pwdconfirm} onChange={this.setField} placeholder="Confirm Password" />
                            <p style={{ textAlign: "center", color: "red" }}>{this.state.pwdMsg}</p>
                        </div>

                        <div className="form-group" style={{ padding: "20px" }}>
                            <label htmlFor="Phone">Phone No:</label>
                            <input type="text" name="phoneNo" value={this.state.phoneNo} className="form-control" onChange={this.setField} placeholder="Phone" maxLength="10" />
                            <p style={{ textAlign: "center", color: "red" }}>{this.state.phoneMsg}</p>
                        </div>
                        <div align="center">
                            <button type="submit" disabled={this.state.btndisable} className="btn btn-primary" onClick={this.submit}>Register</button>
                        </div>
                        <div>
                            <h3 style={{ textAlign: "center", color: this.state.signColor }}>{this.state.signUpStatus}</h3>
                        </div>
                        <br />
                        <br />

                    </form>
                    </div>
                
            </React.Fragment>
            )
    }
}

export default SignUpComponent;