import { getAllData, insertar, addEmail} from '../models/clients'


export async function getClients(req, res)  {
    try {
        const result = await getAllData()
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

export async function addClient(req, res)  {
    try {

        
        const result = await insertar(req.body)

        console.log(result)

        if(!result.status){
            return res.status(400).send({
                status: false,
                message: 'ERROR DB CLIENT',
            });
        }

        
        const resultEmail = await addEmail({
            email: req.body.email,
            id_cliente: result.data.id_cliente
        })
        
        if(!resultEmail.status){
            return res.status(400).send({
                status: false,
                message: 'ERROR DB EMAIL',
            });
        }

        result.data.email = resultEmail.data.email

        return res.status(200).send({
            data: result.data,
            status: true,
        });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};