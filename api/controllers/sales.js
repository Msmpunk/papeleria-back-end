import { getProducts, getSales, getProductsById, setSales, setDetailSales, reduceProducts } from '../models/sales'


export async function saleService(req, res)  {
    try {

        const arrayTo = req.body
        const responseStatus = []
        for (let i = 0; i < arrayTo.length; i++) {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const date = today.toISOString().substring(0, 10).replace('-', '');
            const date2 = date.replace('-', '');
            const { cantidad,  id_producto, id_cliente } = arrayTo[i]

            const result = await getProductsById(id_producto)

            const resultSales = await getSales()
            
            const { precio_unitario, id_proveedor, marca_producto, descripcion_producto} = result.data

            const prevent = await reduceProducts(id_producto, parseInt(cantidad))

            if(prevent.status){
                await setSales({
                    numero_venta: `VENT-0${resultSales.data.length+1}`, id_cliente, fecha_venta: date2
                })
                
                await setDetailSales({
                    numero_venta: `VENT-0${resultSales.data.length+1}`, id_producto, precio_unitario, cantidad
                })
            }

            responseStatus.push({
                id_producto,
                message: prevent.message,
                descripcion_producto,
                marca_producto

            })
        }

        return res.status(200).send({
            data: responseStatus,
            status: true,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
};



export async function getProductsService(req, res)  {
    try {
        const result = await getProducts()
        if(!result.status){
            return res.status(400).send({
                status: false,
                message: 'ERROR DB',
            });
        }
        return res.status(200).send({
            data: result.data,
            status: true,
        });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

export async function getSalesService(req, res)  {
    try {
        const result = await getSales()
        if(!result.status){
            return res.status(400).send({
                status: false,
                message: 'ERROR DB',
            });
        }
        return res.status(200).send({
            data: result.data,
            status: true,
        });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

export async function getProductsByIdSer(req, res)  {
    try {
        const result = await getProductsById(req.body.id_producto)
        if(!result.status){
            return res.status(400).send({
                status: false,
                message: 'ERROR DB',
            });
        }
        return res.status(200).send({
            data: result.data,
            status: true,
        });
    } catch (error) {
        console.log("🚀 ~ file: sales.js ~ line 79 ~ getProductsByIdSer ~ error", error)
        return res.status(500).send({ message: error });
    }
};
