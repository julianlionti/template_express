import Productor, {ProductorProps} from '../../model/Productor'
import Usuario, {UsuarioProps} from '../../model/Usuario'
import {crearProductor, crearUsuario} from './generadores'
import {random} from 'faker'
import {Document} from 'mongoose'

const porTipo = async <T>(que: T, max?: number): Promise<T[]> => {
  let unoDiez = random.number({min: 1, max})
  return await Promise.all(Array.from({length: unoDiez}, () => que))
}

export const limpiarBase = async () => {
  await Productor.deleteMany({})
  await Usuario.deleteMany({})
}

export interface BaseProps {
  productores: Promise<Document>[]
  usuarios: Promise<Document>[]
}

export const llenarbase = async (): Promise<BaseProps> => {
  const productores = await porTipo(Productor.create(crearProductor()))
  const usuarios = await porTipo(Usuario.create(crearUsuario()))

  return {productores: productores, usuarios: usuarios}
}
