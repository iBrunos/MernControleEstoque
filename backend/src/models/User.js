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
    image: {
        type: Buffer,
    }
});

UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model("Users", UserSchema);

// Cria o usuário admin
const adminUser = new User({
    username: "admin",
    password: "admin",
    level: "Gerente",
    email: "admin@gmail.com",
    phone: "(71) 98799-8888",
});

// Salva o usuário no banco de dados
adminUser.save()
  .then(() => {
    console.log("Usuário admin criado com sucesso!");
  })
  .catch((err) => {
    console.log(err);
  });

export default User;
