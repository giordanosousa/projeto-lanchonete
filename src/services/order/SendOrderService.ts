import prismaClient from "../../prisma/index";

interface SendOrderProps {
    name: string;
    order_id: string;
}

class SendOrderService {
    async execute({ name, order_id }: SendOrderProps) {
        try{
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id,
                },
            });

            if(!order){
                throw new Error("Pedido não encontrado");
            }

            const updatedOrder = await prismaClient.order.update({
                where:{
                    id: order_id,
                },
                data:{
                    draft: false,
                    name: name,
                },
                select:{
                    id: true,
                    table: true,
                    status: true,
                    draft: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });

            return updatedOrder;

        }catch(err){
            console.log(err);
            throw new Error("Erro ao enviar pedido");
        }
    }
}

export { SendOrderService } 