import { obtener } from '../models/productos'


export async function getProducts(req, res)  {
    try {
        const result = await obtener()
        if(!result.length){
            return res.status(400).send({
                status: false,
                message: 'There is no information',
            });
        }
        return res.status(200).send({
            data: result,
            status: true,
        });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};