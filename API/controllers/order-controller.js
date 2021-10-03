import _ from 'lodash';
import { Order } from '../schemas/Order.js';
import { Book } from '../schemas/Book.js';
import bodyParser from "body-parser";


export class OrderController {


    static async createOrder(req, res) {
        const token = req.headers.anon_token

        const existing_order = await Order
            .findOne({
                anon_token : token,
                status: "NotSubmitted"
            });
        if (existing_order) {
            res.status(200).json(existing_order);
            // res.status(400).send("Order already exist");
            return;
        }

        const order = new Order({
            anon_token: token
        });
        const created_order = await order.save();
        res.status(200).json(created_order);

    }

    static async getOrder(req, res) {
        const token = req.headers.anon_token

        const existing_order = await Order
            .findOne({
                anon_token : token,
            });

        res.status(200).json(existing_order);
    }

    static async changeOrderStatus(req, res) {
        const token = req.headers.anon_token

        const existing_order = await Order
            .findOne({
                anon_token : token,
                status: "NotSubmitted"
            });

        if (existing_order) {

            existing_order.status = "Submitted";

            const books = await Book.find().where('_id').in(existing_order.items).exec();
            books.forEach(book => book.amount -= 1);
            //
            // for (let i = 0; i < existing_order.items.length; i++){
            //     const book = await Book.findById(existing_order.items[i])
            //     if (book.amount === 0)
            //     {
            //           res.status(404).send("Book not found");
            //           return
            //     }
            //     book.amount -= 1;
            // }
            res.status(200).json(existing_order);
            return;
        }
        res.status(400).send("Order already exist");
    }

    static async updateOrder(req, res) {
        const title = req.body.title
        // const bodyParser = require('body-parser');
        console.log(title)
        // res.status(200).json("bodyParser");
    }

}