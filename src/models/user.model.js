const bcrypt = require('bcrypt');

module.exports = mongoose => {
    const User = new mongoose.Schema({
        name: {
          type: String,
          require: true,
        },
        email: {
          type: String,
          unique: true,
          lowercase: true,
          require: true,
        },
        phone: {
            type: String,
            require: true,
          },
        password: {
          type: String,
          require: true,
        },
        listBook: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book',
        }],
    },
    { timestamps: true }
    );

    User.pre('save', async function () {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    });
    
    return mongoose.model("user", User);
};