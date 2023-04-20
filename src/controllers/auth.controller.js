import bcrypt from 'bcrypt'
import { loginService } from '../services/auth.service.js';

const login = async (req, res) => {
    const {username, password} = req.body;

    try{
        const user = await loginService(username);

        if (!user){
            return res.status(404).send({message: "User or Password not found"})
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        

        if (!passwordIsValid){
            return res.status(400).send({message: "User or Password not found"})
        }
        
        console.log(passwordIsValid)
        res.send("Login OK")
    }catch(err){
        res.status(500).send(err.message)
    }

}

export {login};