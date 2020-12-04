import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignUpComponent from './components/signup';
import LoginComponent from './components/login';
import { BrowserRouter as Router,Link,Route } from 'react-router-dom';
import NavBar from './components/navbar';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import reducer from './Reducers/reducer';
import ProductsComponent from './components/products';
import ProfileComponent from './components/profileComponent';
import AddressComponent from './components/addressComponent';
import AddressPart from './components/editAddressComponent';
import ProductDetailsComponent from './components/productDetail';
let store = applyMiddleware(thunk)(createStore)(reducer);

ReactDOM.render(
    <React.StrictMode>        
        <Provider store={store}>
            <Router>
               
                <Route exact path="/" component={LoginComponent} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/register" component={SignUpComponent} />
                <Route path="/products" component={ProductsComponent} />
                <Route path="/profile" component={ProfileComponent} />
                <Route path="/address" component={AddressComponent} />
                <Route path="/editAddress/:addid" component={AddressPart} />
                <Route path="/productdetails/:prodid" component={ProductDetailsComponent}/>
            </Router>
        </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
