import pool from '../../db/db-connection'

export async function insertar(req, res) {
    try {
        let resultados = await pool.query(`insert into productos
        (nombre, precio)
        values
        ($1, $2)`, [nombre, precio]);
        return resultados;
    } catch(e){
      console.log({message: 'There is a problem in the db', error: error})
    }
}
  
export async function obtenerPorId(id) {
    try {
        const resultados = await pool.query(`select id, nombre, precio from productos where id = $1`, [id]);
        return resultados.rows[0];
    } catch (error) {
        console.log({message: 'There is a problem in the db', error: error})
    }

}

export async function obtener(req, res) {
    try {
        const resultados = await pool.query("select id, nombre, precio from productos");

        return {
            data: resultados.rows,
            status: true
        };
    } catch(e){
        return {
            message:  e,
            status: false
          }
    }
}

export async function actualizar(id, nombre, precio) {
    try {
        const resultados = pool.query(`update productos
        set nombre = $1,
        precio = $2
        where id = $3`, [nombre, precio, id]);
        return resultados;
    } catch (error) {
        console.log({message: 'There is a problem in the db', error: error})
    }

}

export async function eliminar(id) {
    try {
        const resultados = pool.query(`delete from productos
        where id = $1`, [id]);
        return resultados;
    } catch (error) {
        console.log({message: 'There is a problem in the db', error: error}) 
    }

}
