import {Request, Response} from 'express'
import Errores from '../errors/Usuario'
import Usuario from '../model/Usuario'

const validarNuevo: any = [
  Errores.SinNombre,
  Errores.SinApellido,
  Errores.SinUsuario,
  Errores.SinDNI,
  Errores.UsuarioDuplicado.custom(async (val) => {
    if (await Usuario.findOne({usuario: val})) {
      return Promise.reject()
    }
  }),
  Errores.DniDuplicado.custom(async (val) => {
    if (await Usuario.findOne({dni: val})) {
      return Promise.reject()
    }
  }),
]

const nuevo = async (req: Request, res: Response) => {
  const {nombre, apellido, usuario, dni, mail} = req.body
  const nuevo = await Usuario.create({nombre, apellido, usuario, dni, mail})
  res.json({usuario: nuevo.toJSON()})
}

export default {
  nuevo,
  validarNuevo,
}
