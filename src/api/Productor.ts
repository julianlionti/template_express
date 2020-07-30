import {Request, Response} from 'express'
import jwt from 'jwt-simple'
import moment from 'moment'
import Errores from '../errors/Productor'

import Productor from '../model/Productor'
import Config from '../util/Config'

const validacionesNuevo = [Errores.SinNombre, Errores.SinApellido, Errores.SinDNI]

const generarToken = (id: string) => {
  return jwt.encode(
    {
      sub: id,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix(),
    },
    Config.SECRETA!!,
  )
}

const nuevo = async (req: Request, res: Response) => {
  const {nombre, apellido, dni} = req.body

  const productor = await Productor.create({
    nombre,
    apellido,
    dni,
  })

  const token = generarToken(productor._id)
  productor.set({token})
  await productor.save()

  res.json({productor})
}

export default {
  validacionesNuevo,
  nuevo,
}
