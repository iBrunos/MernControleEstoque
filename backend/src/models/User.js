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
    }
});

UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model("Users", UserSchema);

// Verifica se o usuário admin já existe
User.findOne({ username: "admin" })
  .then((existingUser) => {
    if (existingUser) {
      console.log("Usuário admin já existe no banco de dados!");
    } else {
      // Cria o usuário admin
      const adminUser = new User({
        username: "admin",
        password: "admin",
        level: "Gerente",
        email: "admin@gmail.com",
        phone: "(71) 98799-8888",
        avatar: ""
      });

      // Salva o usuário no banco de dados
      adminUser.save()
        .then(() => {
          console.log("Usuário admin criado com sucesso!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })
  .catch((err) => {
    console.log(err);
  });

export default User;
