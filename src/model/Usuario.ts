import mongoose from 'mongoose'
var Schema = mongoose.Schema

export interface UsuarioProps {
  nombre: string
  apellido: string
  usuario: string
  dni: string
  mail: string
  token?: string
  admin?: boolean
}

var schema = new Schema<UsuarioProps>({
  nombre: {type: String, required: true},
  apellido: {type: String, required: true},
  dni: {type: String, required: true, index: true, unique: true},
  usuario: {type: String, required: true, index: true, unique: true},
  mail: String,
  token: String,
  admin: Boolean,
})

export default mongoose.model('Usuario', schema)
