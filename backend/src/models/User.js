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
User.findOne({ username: "admin" })
  .then((existingUser) => {
    if (existingUser) {
    } else {
      // Cria o usuário admin
      const adminUser = new User({
        username: "admin",
        password: "admin",
        level: "Gerente",
        email: "admin@gmail.com",
        phone: "(71) 98799-8888",
        loja: "",
        avatar: ""
      });

      // Salva o usuário no banco de dados
      adminUser.save()
        .then(() => {
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
