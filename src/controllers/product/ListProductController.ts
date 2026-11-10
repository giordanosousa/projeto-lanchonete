import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController{
    async handle(req: Request, res: Response){
        const disabled = req.query.disabled as string | undefined;

        //console.log(typeof disabled)

        const listProduct = new ListProductService();

        const products = await listProduct.execute({
            disabled: disabled
        });

        return res.status(200).json(products)
    }
}

export {ListProductController}