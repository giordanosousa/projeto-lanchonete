import {Router} from 'express'
import multer from 'multer';
import uploadConfig from './config/multer'

import { authUserSchema, createUserSchema } from './schemas/userSchema';

import { CreateUserController } from './controllers/user/CreateUserController';
import { validateSchema } from './middlewares/validateSchema';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { isAdmin } from './middlewares/isAdmin';
import { createCategorySchema } from './schemas/categorySchema';
import { CreateProductController } from './controllers/product/CreateProductController';
import { createProductSchema, listProductByCategorySchema, listProductSchema } from './schemas/productSchema';
import { ListProductController } from './controllers/product/ListProductController';
import { DeleteProductController } from './controllers/product/DeleteProductController';
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { createOrderSchema, addItemOrderSchema, removeItemOrderSchema, detailOrderSchema, sendOrderSchema, finishOrderSchema, deleteOrderSchema } from './schemas/orderSchema';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { AddItemOrderController } from './controllers/order/AddItemOrderController';
import { RemoveItemOrderController } from './controllers/order/RemoveItemOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';
import { DeleteOrderController } from './controllers/order/DeleteOrderController';


const router = Router();
const upload = multer(uploadConfig);

router.post(
    '/users', 
    validateSchema(createUserSchema), 
    new CreateUserController().handle
);

router.post(
    '/session', 
    validateSchema(authUserSchema),
    new AuthUserController().handle
);

router.get('/me', isAuthenticated, new DetailUserController().handle)

// Rota Category
router.get(
    '/category',
    isAuthenticated,
    new ListCategoryController().handle
);

router.post('/category',
    isAuthenticated,
    isAdmin,
    validateSchema(createCategorySchema),
    new CreateCategoryController().handle
);

// Rotas Product
router.post('/product',
    isAuthenticated,
    isAdmin,
    upload.single("file"),
    validateSchema(createProductSchema),
    new CreateProductController().handle
);

router.get('/products',
    isAuthenticated,
    validateSchema(listProductSchema),
    new ListProductController().handle
);

router.delete('/product',
    isAuthenticated,
    isAdmin,
    new DeleteProductController().handle
);

router.get('/category/products',
    isAuthenticated,
    validateSchema(listProductByCategorySchema),
    new ListProductByCategoryController().handle
);

router.post('/order',
    isAuthenticated,
    validateSchema(createOrderSchema),
    new CreateOrderController().handle
);

router.get('/orders',
    isAuthenticated,
    new ListOrdersController().handle
);

// Adicionar item ao pedido

router.post('/order/add',
    isAuthenticated,
    validateSchema(addItemOrderSchema),
    new AddItemOrderController().handle
);

router.delete('/order/remove',
    isAuthenticated,
    validateSchema(removeItemOrderSchema),
    new RemoveItemOrderController().handle
);

router.get('/order/detail',
    isAuthenticated,
    validateSchema(detailOrderSchema),
    new DetailOrderController().handle
);

router.put('/order/send',
    isAuthenticated,
    validateSchema(sendOrderSchema),
    new SendOrderController().handle
);

router.put('/order/finish',
    isAuthenticated,
    validateSchema(finishOrderSchema),
    new FinishOrderController().handle
);

router.delete('/order',
    isAuthenticated,
    validateSchema(deleteOrderSchema),
    new DeleteOrderController().handle
);

export {router}