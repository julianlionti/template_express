import {Router} from 'express'
import Base from '../helpers/base'
import Usuario from '../api/Usuario'
import {autenticarUsuario} from '../helpers/auth'

export default () => {
  const router = Router()

  router.post(
    '/nuevo',
    autenticarUsuario,
    Usuario.validarNuevo,
    Base.execute(Usuario.nuevo),
  )

  return router
}
