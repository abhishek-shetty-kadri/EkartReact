import React from 'react';
import { connect } from 'react-redux';
import { getAllStates } from '../Actions/actions';
import axios from 'axios';

class AddressPart extends React.Component {


	saveAddress = async (e) => {		
		e.preventDefault();
		let validate = true;
		if (this.stateRef.current.value >= 0) {
			this.setState({ stateMsg: '' });
		}
		else {
			validate = false;
			this.setState({ stateMsg: 'Please select a state' });
		}

		if (this.cityRef.current.value.length > 0) {
			let cityReg = /^[A-Z a-z\s0-9]+$/;
			if (cityReg.test(this.cityRef.current.value)) {
				this.setState({ cityMsg: '' });

			}
			else {
				validate = false;
				this.setState({ cityMsg: 'City should contain only alphabets,spaces and numbers' });
			}
		}
		else {
			validate = false;
			this.setState({ cityMsg: 'City is required' });
		}


		if (this.phoneRef.current.value.length > 0) {
			let phnReg = /^[0-9]{10}$/;
			if (phnReg.test(this.phoneRef.current.value)) {
				this.setState({ phoneMsg: '' });
			}
			else {
				this.setState({ phoneMsg: 'Please enter valid Phone number' });
				validate = false;
			}
		}
		else {
			validate = false;
			this.setState({ phoneMsg: 'Phone number is required' });
		}


		if (this.pinRef.current.value.length > 0) {
			let pinReg = /^[0-9]{6}$/;
			if (pinReg.test(this.pinRef.current.value)) {
				this.setState({ PINMsg: '' });
			}
			else {
				this.setState({ PINMsg: 'Please enter valid pin' });
				validate = false;
			}
		}
		else {
			validate = false;
			this.setState({ PINMsg: 'PIN is required' });
		}
		if (this.hNoRef.current.value.length > 0) {
			this.setState({ houseMsg: '' });

		}
		else {
			validate = false;
			this.setState({ houseMsg: 'House Number is required' });
		}

		if (validate) {
			console.log(validate);
			this.btnClick({id:this.state.id,
				hNo: this.hNoRef.current.value, phone: this.phoneRef.current.value, city: this.cityRef.current.value,
				state: this.stateRef.current.value, pinCode: this.pinRef.current.value
			});
			
		}
	}


	constructor() {
		super();
		this.hNoRef = React.createRef();
		this.cityRef = React.createRef();
		this.stateRef = React.createRef();
		this.pinRef = React.createRef();
		this.phoneRef = React.createRef();
        this.state = {states:[]}
	}
	async componentDidMount() {
		this.setState({ id: this.props.match.params.addid });

		axios.get('http://localhost:3001/getAddressById/' + this.props.match.params.addid).then(res => {
			if (res.data.errCode === 0) {
				this.cityRef.current.value = res.data.returnValues[0].city;
				this.hNoRef.current.value = res.data.returnValues[0].house;
				this.pinRef.current.value = res.data.returnValues[0].pin;				
				this.stateRef.current.value = res.data.returnValues[0].state;
				this.phoneRef.current.value = res.data.returnValues[0].phone;
			}

			axios.get('http://localhost:3001/states').then(
				res1 => {
					this.setState({ states: res1.data.returnValues }, () => this.stateRef.current.value = res.data.returnValues[0].state);
				}
			)


		}).catch(err => console.log(err));


		
		
		
    }
    btnClick = (data) => {
        window.opener.postMessage(data, "*");
        window.close();
    }
	render() {		

        return (<div class="container">
			<form>
				<h1 class="title">Edit Address</h1>
				<br />
				<input type="text" className="form-control" placeholder="House Number" ref={this.hNoRef} maxLength="50" />
				<br />
				<p style={{ color: 'red', textAlign: 'center' }}>{this.state.houseMsg}</p>
				<br />
				<input type="text" className="form-control" ref={this.cityRef} placeholder="City" maxLength="50" />
				<br />
				<p style={{ color: 'red', textAlign: 'center' }}>{this.state.cityMsg}</p>
				<br />
				<input type="text" className="form-control" ref={this.pinRef} placeholder="PIN" maxLength="6" />
				<br />
				<p style={{ color: 'red', textAlign: 'center' }}>{this.state.PINMsg}</p>
				<br />

				<input type="text" className="form-control" placeholder="Phone Number" ref={this.phoneRef} maxLength="10" />
				<br />
				<p style={{ color: 'red', textAlign: 'center' }}>{this.state.phoneMsg}</p>
				<br />
				<select className="form-control" ref={this.stateRef} >
					{this.state.states ?

						this.state.states.map(state => {
							return <option key={state.code} value={state.code}>{state.name}</option>
						})
						: <option value="-1">--Select--</option>}
				</select>
				<br />
				<p style={{ color: 'red', textAlign: 'center' }}>{this.state.stateMsg}</p>
				<br />
				<div align="center">
					<button type="submit" className="btn btn-primary" onClick={this.saveAddress}>Save</button>&nbsp;&nbsp;							
				</div>
			</form>

        </div>);
    }
}

export default (AddressPart);