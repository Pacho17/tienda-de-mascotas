import { response } from "express"
import { mysql } from "../database/conexion.js"



export const listarUsuariofjbs =async(req,resp)=>{
try{
    const sql="select * from usuario"
    const[result]= await mysql.query(sql)

    if(result.length>0)return resp.status(200).json(result)

    if(result.length==0) return resp.status(404).json({"message":"no se registran usuarios en la bd"})


}catch(error){
    resp.status(500).json({"message":"error al listar los usuarios"})
}
}



export const registrarUsuariofjbs =async(req,resp)=>{
    try{
        const {nombre,correo,contraseña}=req.body
        const sql=`insert into usuario(nombre, correo, contraseña) values(?,?,?)`
        const[rows]=await mysql.query(sql, [nombre,correo,contraseña])

        if(rows.affectedRows>0)return resp.status(200).json({"message":"registro exitoso"})
        else{
            return resp.status(404).json({"message":"registro fallido"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({"message":"Error en el sistema"})
}
}


export const actualizarUsuariofjbs =async(req,resp)=>{
    try{
        const {nombre, correo,contreseña}=req.body
        const id=req.params.id
        const sql=`update usuario set  nombre=?, correo=?, contraseña=? where id=?`
        const[rows]=await mysql.query(sql, [ nombre, correo, correo, id])

        if(rows.affectedRows>0)return resp.status(200).json({"message":"actualizacion exitosa"})
        else{
            return resp.status(404).json({"message":"actualizacion fallida"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({"message":"Error en el sistema"})
}
}


export const eliminarUsuariofjbs =async(req,resp)=>{
    try{
        const id=req.params.id_usuario
        const sql=`delete from usuario where id_usuario=?`
        const[rows]=await mysql.query(sql, [id])

        if(rows.affectedRows>0)return resp.status(200).json({"message":"Usuario Eliminado"})
        else{
            return resp.status(404).json({"message":"Usuario NO eliminado"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({"message":"Error en el sistema"})
}
}



export const buscarUsuariofjbs =async(req,resp)=>{
    try{
        const id=req.params.id_usuario
        const sql=`select * from usuario where id=?`
        const[rows]=await mysql.query(sql, [id])

        if(rows.length>0)return resp.status(200).json({"message":"Usuario Encontrado",rows})
        else{
            return resp.status(404).json({"message":"Usuario NO encontrado"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({"message":"Error en el sistema"})
}
}



