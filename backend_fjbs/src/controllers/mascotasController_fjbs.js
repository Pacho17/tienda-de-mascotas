import { response } from "express"
import multer from  'multer';
import { mysql } from "../database/conexion.js"


const storage =multer.diskStorage({
    destination:function(req,img,cb){
        cb(null,"public/img")
    },
    filename: function(req,img,cb){
        cb(null,img.originalname)
    }
})
const upload=multer({storage:storage})

export const cargarImagen=upload.single("foto")






export const listarMascotasfjbs =async(req,resp)=>{
    try{
        const sql="select * from mascotas"
        const[result]= await mysql.query(sql)

        if(result.length>0)return resp.status(200).json(result)

        if(result.length==0) return resp.status(404).json({"message":"no se registran mascotas en la bd"})


    }catch(error){
        resp.status(500).json({"message":"error al listar los mascotas"})
    }
    }

export const buscarMascotasfjbs=async(req,resp)=>{
    try{
        const id=req.params.id_mascota
        const sql=`select * from mascotas where id_mascota=?`
        const[rows]=await mysql.query(sql, [id])

        if(rows.length>0)return resp.status(200).json({"message":"Mascota Encontrada",rows})
        else{
            return resp.status(404).json({"message":"Mascota NO encontrada"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({"message":"Error en el sistema"})
}
}


export const registrarMascotasfjbs=async(req,resp)=>{
    try{
        const {nombre, genero, usuario, estado}=req.body
        const foto = req.file.filename
        const sql=`insert into mascotas (nombre, genero, usuario, estado, ) values(?,?,?,?)`
        const[rows]=await mysql.query(sql, [nombre,genero, usuario, estado])

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




export const actualizarMascotasfjbs=async(req,resp)=>{
    try{
        const {nombre, raza, genero, usuario, estado}=req.body
        const id=req.params.id_mascota
        const sql=`update mascotas set nombre=?, raza=?, genero=?, usuario=?, estado=? where id_mascota=?`
        const[rows]=await mysql.query(sql, [nombre, raza,genero, usuario, estado, id])

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

export const eliminarMascotasfjbs=async(req,resp)=>{
    try{
        const id=req.params.id_mascota
        const sql=`delete from mascotas where id_mascota=?`
        const[rows]=await mysql.query(sql, [id])

        if(rows.affectedRows>0)return resp.status(200).json({"message":"Mascota Eliminada"})
        else{
            return resp.status(404).json({"message":"Mascota NO eliminada"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({"message":"Error en el sistema"})
}
}
