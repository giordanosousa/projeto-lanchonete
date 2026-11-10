import {Request, Response} from "express";
import {DeleteOrderService} from "../../services/order/DeleteOrderService";

class DeleteOrderController {
    async handle(req: Request, res: Response){
        const {order_id} = req.query;

        const deleteOrder = new DeleteOrderService();

        const order = await deleteOrder.execute({
            order_id: order_id as string,
        });     

        return res.status(200).json(order);
    }
}

export {DeleteOrderController};