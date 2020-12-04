import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { getAllStates } from '../Actions/actions';


const mapStatestoProps = (state) => {
	return {
		indStates: state.indianStates.indiaStates
    }
}
const mapDispatchToProps = (dispatch) => {
	return {
		getStates: () => dispatch(getAllStates())
    }
}
class AddressComponent extends React.Component {
	constructor() {
		super();
		this.state = { addresses: [] };
		this.hNoRef = React.createRef();
		this.cityRef = React.createRef();
		this.stateRef = React.createRef();
		this.pinRef = React.createRef();
		this.phoneRef = React.createRef();
	}	
	

	componentDidMount() {
		axios.get('http://localhost:3001/address/' + JSON.parse(sessionStorage.getItem('loggedUser')).email).then(
			res => {
				if (res.data.errCode === 0) {
					this.setState({ addresses: res.data.returnValues });
				}
				else
					console.log('Some Error', res.data.errMsg);
			}
		)
		this.props.getStates();
	}
	saveAddress = async (e) => {
		this.setState({ addMsg: '' });
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
				this.setState({ cityMsg: 'City should contain only alphabets,spaces and numbers'});
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
			await axios.post('http://localhost:3001/addAddress', { email: JSON.parse(sessionStorage.getItem('loggedUser')).email, phone: this.phoneRef.current.value, house: this.hNoRef.current.value, city: this.cityRef.current.value, pin: this.pinRef.current.value, state: this.stateRef.current.value }).then(
				res => {
					if (res.data.errCode === 0) {
						this.setState({ addMsg: "Address Saved Successfully!!" });
						this.hNoRef.current.value = '';
						this.cityRef.current.value = '';
						this.pinRef.current.value = '';
						this.stateRef.current.value = -1;
						this.phoneRef.current.value = "";
						this.setState({ AddAddress: null });
					}
                }

			).catch(err => console.log(err));

			axios.get('http://localhost:3001/address/' + JSON.parse(sessionStorage.getItem('loggedUser')).email).then(
				res => {
					if (res.data.errCode === 0) {
						this.setState({ addresses: res.data.returnValues });
					}
					else
						console.log('Some Error', res.data.errMsg);
				}
			)
        }
	}
	editAddress = (e) => {
		console.log(e);
		this.setState({ addMsg: '' });
		let CHILD_WINDOW_HANDLE = window.open(window.location.origin +'/editAddress/' + e._id, '_blank', 'width=700,height=500,left=200,top=100');
		window.addEventListener('message',  (e)=> {
			ab(e.data);
		}, false);
		const ab = (data) => {
			axios.put('http://localhost:3001/updateAddress', data).then(res=>{
				console.log('put', res.data);
				axios.get('http://localhost:3001/address/' + JSON.parse(sessionStorage.getItem('loggedUser')).email).then(
					res => {
						if (res.data.errCode === 0) {
							this.setState({ addresses: res.data.returnValues });
							this.setState({ addMsg:"Address Updated Successfully" });
						}
						else
							console.log('Some Error', res.data.errMsg);
					}
				).catch(err => console.log(err));
			}).catch(err => console.log(err));
        }
	}
	
	deleteAddress = async (e) => {
		this.setState({ addMsg: '' });
		console.log(e);
		await axios.delete('http://localhost:3001/deleteAddress/' + e).then(res => console.log(res.data)).catch(err => console.log(err));
		axios.get('http://localhost:3001/address/' + JSON.parse(sessionStorage.getItem('loggedUser')).email).then(
			res => {
				if (res.data.errCode === 0) {
					this.setState({ addresses: res.data.returnValues });
				}
				else
					console.log('Some Error', res.data.errMsg);
			}
		).catch(err => console.log(err));
    }
	render() {
		return (
			<React.Fragment>

			<div style={{ border: "2px solid blue", borderRadius: "10px", padding: "30px" }}>
				
				<h1 className="title">Your Address Info</h1>
				{this.state.AddAddress ?
					<form>
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
							{this.props.indStates ?

								this.props.indStates.map(state => {
									return <option key={state.code} value={state.code}>{state.name}</option>
								})
								: <option value="-1">--Select--</option>}
						</select>
						<br />
						<p style={{ color: 'red', textAlign: 'center' }}>{this.state.stateMsg}</p>
						<br />
						<div align="center">
							<button type="submit" className="btn btn-primary" onClick={this.saveAddress}>Save</button>&nbsp;&nbsp;
							<button type="reset" className="btn btn-primary" onClick={() => { this.setState({ AddAddress: null }) }}>Cancel</button>
						</div>
					</form>


					: null}
				<h4 style={{ color: 'green', textAlign:'center' }}>{this.state.addMsg}</h4>
				{
					this.state.addresses && this.state.addresses.length > 0 ? <div align="center">
							<button className="btn btn-primary" onClick={() => this.setState({ AddAddress: true, addMsg: null })}>Add a new Address?</button>
							<br />
							<br/>
						<div className="row" style={{ backgroundColor: 'lightGray', borderBottom: "2px solid blue" }}>
							<div className="col-sm-2"><h4>House No</h4></div>
							<div className="col-sm-2"><h4>City</h4></div>
							<div className="col-sm-1"><h4>Pin</h4></div>
							<div className="col-sm-2"><h4>State</h4></div>
							<div className="col-sm-2"><h4>Phone</h4></div>
							<div className="col-sm-2"><h4>Actions</h4></div>
						</div>
						{this.state.addresses.map((add, index) => {
							return (<div className="row" key={index} style={{ paddingTop: "5px",paddingBottom:"5px", borderBottom: "2px solid blue"}}>
								<div className="col-sm-2">{add.house}</div>
								<div className="col-sm-2">{add.city}</div>
								<div className="col-sm-1">{add.pin}</div>

								<div className="col-sm-2" >{this.props.indStates && this.props.indStates.filter(x => x.code.toString() === add.state.toString())[0] ? this.props.indStates.filter(x => x.code.toString() === add.state.toString())[0].name : null}</div>
								<div className="col-sm-2" >{add.phone}</div>
								<div className="col-sm-3">
									<button className="btn btn-primary" onClick={()=>this.editAddress(add)}>Update</button>&nbsp;&nbsp;
									<button className="btn btn-danger" onClick={() => this.deleteAddress(add._id)}>Remove</button>							
								</div>	
								{console.log('modify'+index)}
								<div style={{ display: "none" }} id={'modify' + index}>
									Hi
								</div>
							</div>)
						})}
						
						
					</div> :
						<div style={{ backgroundColor: 'lightgray', height:'100px' }} align="center">
							<h3>You have not added any Address.Please add one.<br /><br />
								<button className="btn btn-primary" onClick={()=>this.setState({ AddAddress:true })}>Add Address</button></h3>
						</div>
				}
				
					</div>
				
			</React.Fragment>
			)
	}
}

export default connect(mapStatestoProps, mapDispatchToProps)(AddressComponent);