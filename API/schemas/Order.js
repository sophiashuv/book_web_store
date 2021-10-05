import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderItemSchema = new Schema({
    item_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }

})

const orderSchema = new Schema({
    anon_token: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Submitted", "NotSubmitted"],
        default: "NotSubmitted"
    },
    items: {
        type: [orderItemSchema],
    }

},{timestamps: true});

export const Order = mongoose.model('Order', orderSchema);