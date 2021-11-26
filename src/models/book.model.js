
module.exports = mongoose => {
    const Book = new mongoose.Schema({
        title: {
          type: String,
          require: true,
          trim: true,
        },
        authors: [{
          type: String,
          require: true,
          trim: true,
        }],
        dateOfPublication: {
            type: String,
            trim: true,
          },
        pages: {
          type: Number,
          require: true,
        },
        isbn: {
            type: String,
            require: true,
            trim: true,
        },
        resume: {
            type: String,
            require: true,
            trim: true,
        },
        borrowed: {
            type: Boolean,
            require: false,
        },
    },
    { timestamps: true }
    );
    
    return mongoose.model("book", Book);
};