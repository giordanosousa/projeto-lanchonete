import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController{
    async handle(req: Request, res: Response){
        // Adicione "as string" ao extrair o product_id da query
        const product_id = req.query.product_id as string;

        const deleteProduct = new DeleteProductService();

        const product = await deleteProduct.execute({product_id: product_id});

        return res.status(200).json(product);
    }
}

export {DeleteProductController}