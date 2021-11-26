const bcrypt = require('bcrypt');

module.exports = mongoose => {
    const Admin = new mongoose.Schema({
        email: {
          type: String,
          unique: true,
          lowercase: true,
          require: true,
          trim: true,
        },
        password: {
          type: String,
          require: true,
          trim: true,
        },
    },
    { timestamps: true }
    );
    
    Admin.pre('save', async function () {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    });
    
    return mongoose.model("admin", Admin);
};