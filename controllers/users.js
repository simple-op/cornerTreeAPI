const Users = require('../models/users');
const jwt = require('jsonwebtoken'); 



// Registering a  users
module.exports.register = async function(req,res){
     console.log(req.body)
    try{
        
//if email already exist
        let users =  await Users.findOne({email: req.body.email});
        if(users){
            return res.json(409,{
                message: "User already exists",        
            });
        }
        else{
            console.log(req.body)
            await Users.create(req.body);
            return res.json(200,{
                message: "Registered Successfully",        
            });
        }
        
    }
    catch(err){
        console.log(err);
        return res.json(404,{
            message: "err in register ",        
        })
    }
    
}
//login users 
module.exports.createSession = async function(req, res){
    try{
        let users = await Users.findOne({email: req.body.email},{});
        if(!users || users.password!= req.body.password){
            return res.json(401,{
                message: "Invalid username or password"
            });
        }
        return res.json(200,{
            message: 'Sign in successfull',
            data:  {
                token: jwt.sign(users.toJSON(), 'ptwmjgad', {expiresIn:  '1000000'})
            }
        })
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    

}