let express=require('express');
let route=express.Router();
const controller=require('../controller/controller');

route.post('/login',controller.validateUser);
route.post('/insertUser',controller.createUser);
route.post('/fetchInfoByName',controller.fetchUserInfo);
route.put('/updateProfile',controller.UpdateUserInfo);
route.get('/states',controller.getStatesMst);
route.get('/address/:email',controller.fetchAddress);
route.post('/addAddress',controller.addAddress);
route.delete('/deleteAddress/:addid',controller.deleteAddress);
route.get('/getAddressById/:addId',controller.getAddressById);
route.put('/updateAddress',controller.UpdateAddress);
module.exports=route;