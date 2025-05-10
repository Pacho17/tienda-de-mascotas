import {response} from "express"
import { mysql } from "../database/conexion.js"

export const listarCategoriafjbs =async(req,resp)=>{
    try{
        const sql="select * from categoria"
        const[result]=await mysql.query(sql)

        if(result.length>0)return resp.status(200).json(result)
        if(result.length==0)return resp.status(404).json({"message":"no se registran categorias en la bd"})
}catch(error){
    resp.status(500).json({"message":"error al listar las categorias"})
}
}

export const buscarCategoriafjbs=async(req,resp)=>{
    try{
        const id=req.params.id_categoria
        const sql=`select * from categoria where id_categoria=?`
        const[rows]=await mysql.query(sql, [id])

        if(rows.length>0)return resp.status(200).json({"message":"Categoria Encontrada",rows})
        else{
            return resp.status(404).json({"message":"Categoria NO encontrada"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({"message":"Error en el sistema"})
}
}


export const registrarCategoriafjbs=async(req,resp)=>{
    try{
        const{nombre}=req.body
        const sql=`insert into categoria(nombre)values(?)`
        const[rows]=await mysql.query(sql,[nombre])

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


export const actualizarCategoriafjbs=async(req,resp)=>{
    try{
        const {nombre}=req.body
        const id=req.params.id_categoria
        const sql=`update categoria set nombre=? where id_categoria=?`
        const[rows]=await mysql.query(sql, [nombre, id])

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

export const eliminarCategoriafjbs=async(req,resp)=>{
    try{
        const id=req.params.id_categoria
        const sql=`delete from categoria where id_categoria=?`
        const[rows]=await mysql.query(sql, [id])

        if(rows.affectedRows>0)return resp.status(200).json({"message":"Categoria Eliminada"})
        else{
            return resp.status(404).json({"message":"Categoria NO eliminada"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({"message":"Error en el sistema"})
}
}
