import {Router} from 'express'
import Base from '../helpers/base'
import Productor from '../api/Productor'
import {autenticarProductor} from '../helpers/auth'

export default () => {
  const router = Router()
  
  router.post(
    '/nuevo',
    autenticarProductor,
    Productor.validacionesNuevo,
    Base.execute(Productor.nuevo),
  )

  return router
}
