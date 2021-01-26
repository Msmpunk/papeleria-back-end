import pool from '../../db/db-connection'

export async function getAllData() {
    try {
        const resultados = await pool.query("select * from cliente");
        return resultados.rows;
    } catch(e){
        console.log({message: 'There is a problem in the db', error: error})
    }
}

export async function insertar(data) {
    const { nombre, razon_social, calle, numero, colonia, estado, codigo_postal } = data
    try {
        let resultados = await pool.query(`insert into cliente
        (nombre, razon_social, calle, numero, colonia, estado, codigo_postal)
        values
        ($1, $2, $3, $4 ,$5, $6, $7) RETURNING *`, [nombre, razon_social, calle, numero, colonia, estado, codigo_postal]);
        return {
            data: resultados.rows[0],
            status: true
          };
    } catch(e){
        return {
            message:  e,
            status: false
          }
    }
}

export async function addEmail(data) {
    const { email, id_cliente } = data
    try {
        let resultados = await pool.query(`insert into email_cliente
        (email, id_cliente)
        values
        ($1, $2) RETURNING *`, [email, id_cliente]);
        return {
            data: resultados.rows[0],
            status: true
          };
    } catch(e){
        return {
            message:  e,
            status: false
          }
    }
}
  