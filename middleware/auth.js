import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'

export const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, 'miSecretito');
        const user = await UserModel.findOne({
            tokens: token
        })
        if(!user) {
            return res.status(400).send({ message : 'No estas autorizado'})
        }
        req.user = user
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message : 'no estas autorizado',
            error
        });
    }

}
export const isAdmin = (req,res,next) => {
    if(req.user.role !== 'admin'){
        return res.status(403).send({ message : 'No tienes suficientes privilegios'})
    }
    next();
}