import {registerUser,getUser} from '../services/auth.js';
import createHttpError from "http-errors";

export const registerUserController = async(req, res, next)=>{
    try{
        const {name, email, password} = req.body;
        const user = await getUser(email);
        console.log(user);
        if(user){
            return next(createHttpError(409,'Email in use'));
        }

        const newUser = await registerUser({name, email, password});
        const userwithoutpass = {...newUser};
        delete userwithoutpass.password;

        res.status(201).json({
            status:201,
            message: "Successfully registered a user!",
            data: userwithoutpass
        });
        
    }catch(error){
        next(createHttpError(500,error));
    }
};
