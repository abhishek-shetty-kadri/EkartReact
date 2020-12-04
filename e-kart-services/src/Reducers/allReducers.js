import { feedBackDetails } from'../components/feedbacks.json';

export const loggedInReducer = (state = {
    isLoggedIn: sessionStorage.getItem('loggedUser') != null ? true : false,
    userName: sessionStorage.getItem('loggedUser') != null ? JSON.parse(sessionStorage.getItem('loggedUser')).name : null,
    hasTried:false
}, action) => {
    switch (action.type) {
        case 'LOGIN':            
            return Object.assign({}, state, { hasTried: true, isLoggedIn: action.verified, userName: sessionStorage.getItem('loggedUser') ? JSON.parse(sessionStorage.getItem('loggedUser')).name : null });
        case 'LOGOUT':
            return Object.assign({}, state, { isLoggedIn: false, userName: null, hasTried: false });
        case 'PROFILE':
            return Object.assign({}, state, { userName: JSON.parse(sessionStorage.getItem('loggedUser')).name });
        default:
            return state;
    }
}
export const indianStates = ( state = { indiaStates: [] }, action )=>{
    switch (action.type) {
        case 'STATE':        
            return Object.assign({}, state, { indiaStates: action.states });
        default:
            return state;
    }
}

export const productReducer = (state = {
    products: [
        {
            "id": 1,
            "pdtName": "Gamia Laptop",
            "pdtPrice": 33000,
            "pdtCode": "1",
            "pdtDescription": "An excellent choice for an awesome gaming experience.",
            "pdtCategory": "Electronics",
            "rating": 3,
            "purchasedUser": "roopa",
            "pdtImg": "/images/Laptop.jpg",
            "isReturned": true
        },
        {
            "id": 2,
            "pdtName": "Ind Mobile EX321",
            "pdtPrice": 8999,
            "pdtCode": "2",
            "pdtDescription": "This will take you to next level of communication.",
            "pdtCategory": "Electronics",
            "rating": 4,
            "purchasedUser": "rimika",
            "pdtImg": "/images/Mobile.png",
            "isReturned": false
        },
        {
            "id": 3,
            "pdtName": "Khaadi Shirt",
            "pdtPrice": 982,
            "pdtCode": "3",
            "pdtDescription": "Best suitable for tropical climate.",
            "pdtCategory": "Costumes",
            "rating": 4,
            "purchasedUser": "roopa",
            "pdtImg": "/images/shirt.jpg",
            "isReturned": true
        },
        {
            "id": 4,
            "pdtName": "SungSam Headphones",
            "pdtPrice": 2200,
            "pdtCode": "4",
            "pdtDescription": "Excellent bluetooth headphones with good sound quality",
            "pdtCategory": "Electronics",
            "rating": 2,
            "purchasedUser": "khalid",
            "pdtImg": "/images/headphones.png",
            "isReturned": false
        }
    ]
},action) => {
    switch (action.type) {
        case 'PRODUCT':
            return state;
        default:
            return state;
    }

}

export const feedBackReducer = (state = { feedbacks: feedBackDetails}, action)=>{    
    switch (action.type) {        
        case 'FEEDBACK':
            return {
                ...state,
                feedbacks:action.payload
            }
        default:
            return state;
    }
}

