import {Request, Response} from 'express'
import Errores from '../errors/Productor'
import Productor from '../model/Productor'
import {generarToken} from '../helpers/auth'

const validacionesNuevo = [
  Errores.SinNombre,
  Errores.SinApellido,
  Errores.SinDNI,
  Errores.DniDuplicado.custom(async (val) => {
    if (await Productor.findOne({dni: val})) {
      return Promise.reject()
    }
  }),
]

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
