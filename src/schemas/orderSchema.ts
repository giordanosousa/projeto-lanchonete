import { z } from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        table: z
        .number({message: "Onúmero da mesa é obrigatório"})
        .int({message: "O número da mesa deve ser um número inteiro"})
        .positive({message: "O número da mesa deve ser um número positivo"}),
        name: z.string().optional(),
    }),
});

export const addItemOrderSchema = z.object({
    body: z.object({
        order_id: z
            .string({message: "O pedido deve ser uma string"})
            .min(1, "A order_id deve ser obrigatória"),
        product_id: z
            .string({message: "O produtodeve ser uma string"})
            .min(1, "A produto_id deve ser obrigatória"),
        amount: z
            .number({message: "A quantidade é obrigatória"})
            .int({message: "A quantidade deve ser um número inteiro"})
            .positive({message: "A quantidade deve ser um número positivo"}),
    }),
});

export const removeItemOrderSchema = z.object({
    query: z.object({
        item_id: z
            .string({message: "O item deve ser uma string"})
            .min(1, "A item_id deve ser obrigatória"),
    }),
});

export const detailOrderSchema = z.object({
    query: z.object({
        order_id: z
            .string({message: "O pedido deve ser uma string"})
            .min(1, "A order_id deve ser obrigatória"),
    }),
}); 

export const sendOrderSchema = z.object({
    body: z.object({
        order_id: z         
            .string({message: "O pedido deve ser uma string"})
            .min(1, "A order_id deve ser obrigatória"),
        name: z
            .string({message: "O nome do cliente deve ser um texto"})
            .min(1, "O nome do cliente deve ser obrigatório"),
    }),
}); 

export const finishOrderSchema = z.object({
    body: z.object({
        order_id: z 
            .string({message: "O pedido deve ser uma string"})
            .min(1, "A order_id deve ser obrigatória"),
    }),
}); 

export const deleteOrderSchema = z.object({
    query: z.object({
        order_id: z
            .string({message: "O pedido deve ser uma string"})
            .min(1, "A order_id deve ser obrigatória"),
    }),
});