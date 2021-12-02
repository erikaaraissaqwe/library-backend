
module.exports = mongoose => {
    const Book = new mongoose.Schema({
        title: {
          type: String,
          require: true,
          trim: true,
        },
        author: {
          type: String,
          require: true,
          trim: true,
        },
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
        image: {
          type: String,
          require: false,
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