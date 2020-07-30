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

const nuevo = (req: Request, res: Response) => {
  res.json({})
}

export default {
  nuevo,
  validarNuevo,
}
