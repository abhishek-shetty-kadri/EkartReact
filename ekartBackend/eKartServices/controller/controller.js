const mongojs=require('mongojs');
const db=mongojs('mongodb://localhost:27017/EKartServices');

exports.UpdateAddress=async(req,res)=>{  
    db.address.updateMany({_id:new db.ObjectId(req.body.id)},{$set:{phone:req.body.phone,
        house:req.body.hNo,city:req.body.city,pin:req.body.pinCode,state:req.body.state    
    }},function(err,returned){
        if(err||!returned){
            res.status(200).json({errCode:-1,errMsg:err,returnValues:undefined});
        }
        else{
            res.status(200).json({errCode:0,errMsg:'',returnValues:returned});
        }
    })

}
exports.validateUser=async (req,res)=>{
    let obj={errCode:'',errMsg:'',returnValues:[]};
    await db.users.find({email:req.body.email,password:req.body.password},function(err,returned){
        if(err||!returned){
            res.status(200).json({errCode:-1,errMsg:err,returnValues:undefined});
        }
        else{
            res.status(200).json({errCode:0,errMsg:'',returnValues:returned});
        }
    });

}
exports.getAddressById=async(req,res)=>{
    console.log(req.params.addId);
    db.address.find({_id: new db.ObjectId(req.params.addId)},function(err,returned){
        if(err||!returned){
            res.status(200).json({errCode:-1,errMsg:err,returnValues:undefined});
        }
        else{
            res.status(200).json({errCode:0,errMsg:'',returnValues:returned});
        }
    })
}
exports.addAddress=async(req,res)=>{
  
    await db.address.insert(req.body,function(err,returned){
        if(err||!returned){
            res.status(200).json({errCode:-1,errMsg:err,returnValues:undefined});
        }
        else{
            res.status(200).json({errCode:0,errMsg:'',returnValues:returned});
        }
    });
}
exports.fetchUserInfo=async (req,res)=>{

    await db.users.find({email:req.body.email},function(err,returned){
        if(err||!returned){
            res.status(200).json({errCode:-1,errMsg:err,returnValues:undefined});
        }
        else{
            res.status(200).json({errCode:0,errMsg:'',returnValues:returned});
        }
    });

}

exports.deleteAddress=async(req,res)=>{
     db.address.remove({_id: new db.ObjectId(req.params.addid)},function(err,returned){
        if(err||!returned){
            res.status(200).json({errCode:-1,errMsg:err,returnValues:undefined});
        }
        else{
            res.status(200).json({errCode:0,errMsg:'',returnValues:returned});
        }
    })
}

exports.getStatesMst=async(req,res)=>{
   

    await db.statesMst.find({},{_id:0},
        function(err,returned){
            if(err||!returned){
                res.status(200).json({errCode:-1,errMsg:err,returnValues:undefined});                
            }
            else{
                res.status(200).json({errCode:0,errMsg:'',returnValues:returned});
            }


    })
}
exports.fetchAddress=async(req,res)=>{

    await db.address.find({email:req.params.email},
        function(err,returned){
            if(err||!returned){
                res.status(200).json({errCode:-1,errMsg:err,returnValues:undefined});
            }
            else{
                res.status(200).json({errCode:0,errMsg:'',returnValues:returned});
            }


    })
}
exports.UpdateUserInfo=async(req,res)=>{

    await db.users.update({email:req.body.email},{$set:{name:req.body.name,password:req.body.password}},
        function(err,returned){
            if(err||!returned){
                res.status(200).json({errCode:-1,errMsg:err,returnValues:undefined});
            }
            else{
                res.status(200).json({errCode:0,errMsg:'',returnValues:returned});
            }


    })
}


exports.createUser=async (req,res)=>{

    await db.users.find({email:req.body.email},function(err,returned){
        if(err||!returned){
            res.status(200).json({errCode:-1,errMsg:err,returnValues:undefined});
        }
        else{
            if(returned.length>0)
                res.status(200).json({errCode:0,errMsg:'UserId already taken',returnValues:returned});
            else{
                db.users.insert(req.body,function(err,returnedinsert){
                    
                    if(err||!returnedinsert){
                        res.status(200).json({errCode:-1,errMsg:err});
                    }
                    else{
                        res.status(200).json({errCode:0,errMsg:'success'});
                    }
                })
                

            }
        }
    });


}