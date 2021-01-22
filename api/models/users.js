import pool from '../../db/db-connection'

export async function insertar(data) {
  
  const { id_user, nombre, correo, contraseña } = data;

  try {
      let resultados = await pool.query(`insert into users
      (nombre, correo, contraseña)
      values
      ($1, $2, $3) RETURNING *`, [nombre, correo, contraseña]);
      return {
        data: resultados,
        status: true
      };
  } catch(e){

    return {
      message:  e,
      status: false
    }
  }
}

export async function obtener() {
    try {
        const resultados = await pool.query("select id_user, nombre, correo from users");
        return resultados.rows;
    } catch(e){
        console.log({message: 'There is a problem in the db', error: error})
    }
}
  
export async function obtenerPorCorreo(correo) {
    try {
        const resultados = await pool.query(`select id_user, nombre, correo, contraseña from users where correo = $1`, [correo]);
        return {
          data: resultados.rows[0],
          status: true
        };
    } catch (error) {
      return {
        message: error,
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
