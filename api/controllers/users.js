
import { sign } from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";

import { secret } from "../config/auth.config";
import { insertar, obtenerPorCorreo } from '../models/users'

export async function signup(req, res) {

    try {

        req.body.contraseña = hashSync(req.body.contraseña, 8)
        

        const result = await insertar(req.body)
       

        if(result.status){
            result.data.rows[0].contraseña = ':)'
            return res.status(200).send({
                status: true,
                userdata: result.data.rows[0],
            });
    
        }


        if(!result.status) {
            return res.status(400).send({
                status: false,
                message: result.message.detail,
            });
        }

    } catch (error) {
        return res.status(500).send({ message: error });
    }

};

export async function signin(req, res)  {
    try {
        const { correo, contraseña } = req.body;
        const result = await obtenerPorCorreo(correo)
        
        if(!result.data){
            return res.status(400).send({
                status: false,
                message: 'There is no information',
            });
        }

        if (!result.status) {
        
            return res.status(400).send({
                status: false,
                message: result.detail,
            });
        }


        const passwordIsValid = compareSync(
            contraseña,
            result.data.contraseña
        );

        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!",
              status: false,
            });
        }
    
        
        const token = sign({ id: result.data.id_user }, secret, {
            expiresIn: 86400 // 24 hours
        });

        return res.status(200).send({
            id_user: result.data.id_user,
            nombre: result.data.nombre,
            correo: result.data.correo,
            accessToken: token,
            status: true,
        });
        
    } catch (error) {
        return res.status(500).send({ message: error });
    }

};