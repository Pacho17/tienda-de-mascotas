import {response} from "express"
import { mysql } from "../database/conexion.js"

export const listarRazafjbs =async(req,resp)=>{
    try{
        const sql="select * from raza"
        const[result]=await mysql.query(sql)

        if(result.length>0)return resp.status(200).json(result)
        if(result.length==0)return resp.status(404).json({"message":"no se registran razas en la bd"})
}catch(error){
    resp.status(500).json({"message":"error al listar las razas"})
}
}

export const buscarRazafjbs=async(req,resp)=>{
    try{
        const id=req.params.id_categoria
        const sql=`select * from raza where id_raza=?`
        const[rows]=await mysql.query(sql, [id])

        if(rows.length>0)return resp.status(200).json({"message":"Raza Encontrada",rows})
        else{
            return resp.status(404).json({"message":"Raza NO encontrada"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({"message":"Error en el sistema"})
}
}


export const registrarRazafjbs=async(req,resp)=>{
    try{
        const{nombre}=req.body
        const sql=`insert into raza(nombre)values(?)`
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


export const actualizarRazafjbs=async(req,resp)=>{
    try{
        const {nombre}=req.body
        const id=req.params.id
        const sql=`update raza set nombre=? where id=?`
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

export const eliminarRazafjbs=async(req,resp)=>{
    try{
        const id=req.params.id_raza
        const sql=`delete from categoria where id_raza=?`
        const[rows]=await mysql.query(sql, [id])

        if(rows.affectedRows>0)return resp.status(200).json({"message":"Raza Eliminada"})
        else{
            return resp.status(404).json({"message":"Raza NO eliminada"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({"message":"Error en el sistema"})
}
}
