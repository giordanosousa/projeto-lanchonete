//import { UploadStream } from "cloudinary";
import prismaClient from "../../prisma/index";
import cloudinary from "../../config/cloudinary";
import { Readable } from "node:stream";


interface CreateProductServiceProps{
    name: string;
    price: number;
    description: string;
    category_id: string;
    imageBuffer: Buffer;
    imageName: string;
}

class CreateProductService{
    async execute({
        name,
        price,
        description,
        category_id,
        imageBuffer,
        imageName,
    }: CreateProductServiceProps){

        const categoryExists = await prismaClient.category.findFirst({
            where:{
                id: category_id
            }
        })

        if(!categoryExists){
            throw new Error("Categoria não encontrada!")
        }

        // ENVIAR PRO CLOUDINARY SALVAR A IMAGEM E PEGAR URL
        let bannerURL = "";

        try {
            
            const result = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: "products",
                    resource_type: "image",
                    public_id: `${Date.now()}-${imageName.split(".")[0]}`
                }, (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
                });

                // CRIAR O STREAM DO BUFFER E FAZER PIPE PARA O CLOUDINARY
                const bufferStream = Readable.from(imageBuffer);
                bufferStream.pipe(uploadStream);
            });

            
        bannerURL = result.secure_url;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao fazer o upload a imagem!")
        }

        // SALVAR A URL DA IMAGEM E OS DADOS NO BANCO COMO UM NOVO PRODUTO
        const product = await prismaClient.product.create({
            data:{
                name: name,
                price: price,
                description: description,
                banner: bannerURL,
                category_id: category_id
            },
            select:{
                id: true,
                name: true,
                price: true,
                description: true,
                category_id: true,
                banner: true,
                createdAt: true
            }
        })

        return product;
    }
}

export {CreateProductService}