import axios from 'axios';

export const getProducts = () => {
    return {
        type:'PRODUCTS'
    }
}
export const getFeedBacks = () => {
    return {
        type: 'FEEDBACK'
    }
}
export const getAllStates = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/states').then(
            res => {
                const data = res.data;
                if (res.data.errCode !== 0 || res.data.returnValues.length===0) {
                    console.log('error', res.data);
                }
                else {
                    data.returnValues.splice(0, 0, {code:-1,name:'--Select--'})
                    dispatch(stateDispatcher(data.returnValues));
                }
            }
        ).catch(err => console.log(err));
    }
}
function stateDispatcher(stateCollection) {
    return {
        type: "STATE",
        states:stateCollection
    }
}
export function logOut() {
    return {
        type:'LOGOUT'
    }
}
export const UpdateProfileState=(data)=> {
    return (dispatch) => {
        const details = JSON.parse(sessionStorage.getItem('loggedUser'));
        details.name = data.name;
        details.pass = data.password;
        sessionStorage.setItem('loggedUser', JSON.stringify(details));
        dispatch(UpdateProfile(details));
    }
}
function UpdateProfile(data) {
    return {
        type: 'PROFILE',
        data:  data 
    }
}
export const fetchUserInfo = async () => {
    let userInfo;   
    await axios.post('http://localhost:3001/fetchInfoByName', { email: JSON.parse(sessionStorage.getItem('loggedUser')).email }).then(res => {
        userInfo = res.data;
    }).catch(err => console.log(err)); 
    return userInfo;
}

export const updateProfile = async (emailP, pwd, nameP) => {
    let updt;
    await axios.put('http://localhost:3001/updateProfile', { email: emailP, password: pwd, name: nameP }).then(
        res=>updt=res.data
    ).catch(err => console.log(err));
    return updt;
}

const UpdateLogin = (verified) => {
    return {
        type: 'LOGIN',
        verified: verified
    }
}
export const login = (userId,password) => {
    return (dispatch) => {
        const userDetails = { email: userId, password: password }
        axios.post('http://localhost:3001/login', userDetails).then(result => {
            let output = result.data;
            if (output.errCode === 0 && output.returnValues) {
                if (output.returnValues.length > 0) {
                    sessionStorage.setItem('loggedUser', JSON.stringify(output.returnValues[0]));
                    dispatch(UpdateLogin(true));
                }
                else {
                    dispatch(UpdateLogin(false));
                }
            }
            else {
                console.log('error', output);
            }
        }).catch(err => console.log(err));
    }
}