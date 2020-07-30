import mongoose from 'mongoose'
var Schema = mongoose.Schema

export interface Productor {
  nombre: string
  apellido: string
  dni: string
  lat?: number
  lng?: number
}

var productorSchema = new Schema<Productor>({
  nombre: {type: String, required: true, index: true},
  apellido: {type: String, required: true, index: true},
  dni: {type: String, required: true, index: true},
  token: String,
  lat: Number,
  lng: Number,
})

export default mongoose.model('Productor', productorSchema)
