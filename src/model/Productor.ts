import mongoose from 'mongoose'
var Schema = mongoose.Schema

export interface ProductorProps {
  nombre: string
  apellido: string
  dni: string
  token?: string
  lat?: number
  lng?: number
}

var schema = new Schema<ProductorProps>({
  nombre: {type: String, required: true, index: true},
  apellido: {type: String, required: true, index: true},
  dni: {type: String, required: true, index: true, unique: true},
  token: String,
  lat: Number,
  lng: Number,
})

export default mongoose.model('Productor', schema)
