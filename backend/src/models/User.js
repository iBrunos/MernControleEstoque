import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
    },
    avatar: {
        type: Buffer,
    },
    store: {
        type: String,
        enum: ['Loja 01', 'Loja 02'],
        required: true,
    },
});
UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  this._update.password = await bcrypt.hash(this._update.password, 10);
  next();
});


const User = mongoose.model("Users", UserSchema);

// Verifica se o usuário admin já existe


export default User;
