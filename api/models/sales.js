import pool from '../../db/db-connection'

export async function getSales() {
    try {
        const resultados = await pool.query("select * from venta");
        const finalResult = []
        for (let i = 0; i < resultados.rows.length; i++) {
            const element = resultados.rows[i];
            const detailSales = await pool.query(`select * from venta_detalles where numero_venta = $1`, [element.numero_venta]);
            const sales = detailSales.rows[0]
            const ob = {
                "id_producto": sales.id_producto,
                "precio_unitario": sales.precio_unitario,
                "cantidad": sales.cantidad,
                "numero_venta": element.numero_venta,
                "id_cliente": element.id_cliente,
                "fecha_venta": element.fecha_venta,
            }
            finalResult.push(ob)
        }
        return {
            data: finalResult,
            status: true
        };
    } catch(e){
        return {
            message:  e,
            status: false
          }
    }
}
  

export async function setSales(data) {
    const { numero_venta, id_cliente, fecha_venta } = data
    try {
        let resultados = await pool.query(`insert into venta
        (numero_venta, id_cliente, fecha_venta)
        values
        ($1, $2, $3) RETURNING *`, [numero_venta, id_cliente, fecha_venta]);
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

export async function setDetailSales(data) {
    const { numero_venta, id_producto, precio_unitario, cantidad } = data
    try {
        let resultados = await pool.query(`insert into venta_detalles
        (numero_venta, id_producto, precio_unitario, cantidad)
        values
        ($1, $2, $3, $4) RETURNING *`, [numero_venta, id_producto, precio_unitario, cantidad]);
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

export async function reduceProducts(id_producto, stock) {
    try {
        const resultados = await pool.query("select * from inventario where id_producto = $1", [id_producto]);
        const inventario = resultados.rows[0]
        console.log(parseInt(inventario.stock), parseInt(stock))
        if(parseInt(inventario.stock) < parseInt(stock)){
            return {
                message: `No se realizó el movimiento, este producto se queda con ${inventario.stock}, no hay mas en el inventario`,
                status: false
            }
        }
        const inv = await pool.query(`update inventario
        set stock = $1
        where id_producto = $2 RETURNING *`, [parseInt(inventario.stock) - parseInt(stock) , id_producto]);
        return {
            message: `Éxito con el movimiento, este producto tiene ${parseInt(inventario.stock) - parseInt(stock)} elementos en stock`,
            status: true
        };
    } catch(e){
        return {
        
            message:  e,
            status: false
          }
    }
        
}

export async function getProducts() {
    try {
        const resultados = await pool.query("select * from producto");
        const finalResult = []
        for (let i = 0; i < resultados.rows.length; i++) {
            const element = resultados.rows[i];
            const inventario = await pool.query(`select * from inventario where id_producto = $1`, [element.id_producto]);
            const inv = inventario.rows[0]
            const ob = {
                "codigo_barras": element.codigo_barras,
                "descripcion_producto": element.descripcion_producto,
                "marca_producto": element.marca_producto,
                "id_categoria": element.id_categoria,
                "id_proveedor": element.id_proveedor,
                "id_inventario": inv.id_inventario,
                "id_producto": inv.id_producto,
                "precio_unitario": inv.precio_unitario,
                "stock": inv.stock,
                "precio_compra": inv.precio_compra,
                "fecha_compra": inv.fecha_compra
            }
            finalResult.push(ob)
        }

        return {
            data: finalResult,
            status: true
        };
    } catch(e){
        return {
            message:  e,
            status: false
          }
    }
}
  
export async function getProductsById(id) {
    try {
        const resultados = await pool.query(`select * from producto where id_producto = $1`, [id]);
        const resu = resultados.rows[0]
        const inventario = await pool.query(`select * from inventario where id_producto = $1`, [id]);
        const inv = inventario.rows[0]
        const ob = {
            "codigo_barras": resu.codigo_barras,
            "descripcion_producto": resu.descripcion_producto,
            "marca_producto": resu.marca_producto,
            "id_categoria": resu.id_categoria,
            "id_proveedor": resu.id_proveedor,
            "id_inventario": inv.id_inventario,
            "id_producto": inv.id_producto,
            "precio_unitario": inv.precio_unitario,
            "stock": inv.stock,
            "precio_compra": inv.precio_compra,
            "fecha_compra": inv.fecha_compra
        }

        return {
            data: ob,
            status: true
        };
    } catch(e){
        return {
            message:  e,
            status: false
          }
    }
}
  