import express from 'express';

import { BookController } from './controllers/books-controller.js';
import { AuthController } from './controllers/auth-controller.js';
import { OrderController } from './controllers/order-controller.js';
import { AuthorController } from './controllers/author-controller.js';

const router = express.Router()
/** Auth routes */
router.get("/anonymousToken", AuthController.getAnonToken);

/** Books routes */
router.get('/books', BookController.getAllBooks);
router.get('/books/:bookId', BookController.getBook);

/** Authors routes */
router.get('/authors/:authorId', AuthorController.getAuthor);

/** Orders routes */
router.get('/order', OrderController.getOrder);
router.post('/order', OrderController.createOrder);
router.patch('/order', OrderController.changeOrderStatus);
router.put('/order/item', OrderController.updateOrder);

export default router;

