import _ from 'lodash';
import { Order } from '../schemas/Order.js';
import { Book } from '../schemas/Book.js';
import bodyParser from "body-parser";
import mongoose from 'mongoose';


const ObjectId = mongoose.Types.ObjectId

export class OrderController {


    static async createOrder(req, res) {
        const user = req.user

        const existing_order = await Order
            .findOne({
                user_id : user.id,
                status: "NotSubmitted"
            });
        if (existing_order) {
            res.status(200).json(existing_order);
            // res.status(400).send("Order already exist");
            return;
        }

        const order = new Order({
            user_id : user.id
        });
        const created_order = await order.save();
        res.status(200).json(created_order);

    }

    static async getOrder(req, res) {
        const user = req.user

        const existing_order = await Order
            .findOne({
                user_id : user.id,
                status: "NotSubmitted"
            });

        res.status(200).json(existing_order);
    }

    static async getSubmitedOrders(req, res) {
        const user = req.user

        const existing_orders = await Order
            .find({
                user_id : user.id,
                status: "Submitted"
            });

        res.status(200).json(existing_orders);
    }

    static async changeOrderStatus(req, res) {
        const user = req.user

        const existing_order = await Order
            .findOne({
                user_id : user.id,
                status: "NotSubmitted"
            });

        if (!existing_order){
            res.status(400).send("Order doesn't exist!");
            return
        }

        const books_ids = existing_order.items.map(item => new ObjectId(item.id));
        const books = await Book.find({
            id: {$in: books_ids}
        })

        const books_by_id = _.keyBy(books, 'id')
        const books_are_available = existing_order.items.every(item => books_by_id[item.item_id].qty >= item.qty)
        if (!books_are_available) {
            res.status(400).send("Some of the books are no longer available");
            return
        }

        const update_promises = existing_order.items.map(item => {
            return Book.findByIdAndUpdate(item.item_id,  { $inc: { qty: -item.qty} })
        })
        await Promise.all(update_promises);
        existing_order.status = "Submitted";
        await existing_order.save();
        res.status(200).json(existing_order);
    }

    static async addItemToOrder(req, res) {
        const item_id = req.body.item_id
        const user = req.user

        let order = await Order
            .findOne({
                user_id : user.id,
                status: "NotSubmitted"
            });

        if (!order){
             order = new Order({
                user_id : user.id
            });
             await order.save();

        }

        const existing_item = order.items.find(item => item.item_id === item_id)
        if (existing_item){
            existing_item.qty += 1
        }
        else {
            const book = await Book.findById(item_id)
            if (!book){
                res.status(404).send("Book not found");
                return;
            }
            const new_item = {
                item_id : item_id,
                price: book.price,
                qty: 1
            }
            order.items.push(new_item)
        }
        await order.save()
        res.status(200).json(order);
    }

}