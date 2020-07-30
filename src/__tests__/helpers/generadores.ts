import faker from 'faker'
import {UsuarioProps} from '../../model/Usuario'
import {ProductorProps} from '../../model/Productor'
faker.locale = 'es'

const generarDni = () =>
  Array.from(Array(8))
    .map(() => faker.random.number(9))
    .join('')

export const crearProductor = (): ProductorProps => ({
  nombre: faker.name.firstName(),
  apellido: faker.name.lastName(),
  dni: generarDni(),
})

export const crearUsuario = (): UsuarioProps => {
  const nombre = faker.name.firstName()
  const apellido = faker.name.lastName()
  const usuario = nombre.substring(1) + apellido
  return {
    nombre,
    apellido,
    dni: generarDni(),
    usuario,
    mail: usuario + '@magyp.gob.ar',
  }
}
