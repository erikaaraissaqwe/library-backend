module.exports = mongoose => {
    const BookUser = new mongoose.Schema({
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book',
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        loadDate: {
          type: String,
          require: true,
          trim: true,
        },
        expectedDeliveryDate: {
            type: String,
            require: true,
            trim: true,
        },
        actualDeliveryDate: {
            type: String,
            require: true,
            trim: true,
        },
    },
    { timestamps: true }
    );
    
    return mongoose.model("bookUser", BookUser);
};