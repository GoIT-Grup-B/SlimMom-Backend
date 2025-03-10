import {registerUser,getUser} from '../services/auth.js';
import createHttpError from "http-errors";

export const registerUserController = async(req, res, next)=>{
    try{
        const {name, email, password} = req.body;
        const user = await getUser(email);

        if(user){
            return next(createHttpError(409,'Email in use'));
        }

        const newUser = await registerUser({name, email, password});
        console.log(newUser);
        const userwithoutpass = {...newUser};
        delete userwithoutpass.password;

        res.status(201).json({
            status:201,
            message: "Successfully registered a user!",
            data: {
                id: userwithoutpass._doc._id,
                name: userwithoutpass._doc.name,
                email: userwithoutpass._doc.email,
                createdAt: userwithoutpass._doc.createdAt,
                updatedAt: userwithoutpass._doc.updatedAt,
            }
        });
        
    }catch(error){
        next(createHttpError(500,error));
    }
};
