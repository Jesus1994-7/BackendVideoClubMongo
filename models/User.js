import mongoose from 'mongoose';
import validator from 'validator'
const UserSchema = new mongoose.Schema({
        name: String,
        email: {
            type: String,
            required: [true, 'El email es requerido'],
            validate: {
                validator: function(email) {
                    return validator.isEmail(email)
                },
                message: props => `${props.value} no es un email válido!`
            },
        },
        password: {
            type: String,
            required: [true, 'El password es requerido'],
        },
        tokens: [String],
        role: {
            type:String,
            enum:['user','admin']
        }
    }, {
        timestamps: true
    })
    //override del toJSON 
UserSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    return user;
}
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;