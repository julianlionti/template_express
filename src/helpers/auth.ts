import {error} from './errors'
import Auth from '../errors/Auth'
import {Request, Response, NextFunction} from 'express'
import jwt from 'jwt-simple'
import moment from 'moment'
import Config from '../util/Config'

export const generarToken = (generador: string) => {
  return jwt.encode(
    {
      sub: generador,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix(),
    },
    Config.SECRETA!!,
  )
}

export const autenticarProductor = (req: Request, res: Response, next: NextFunction) => {
  const {authorization} = req.headers
  if (authorization) {
    return error(res, Auth.SinToken)
  }

  next()
}

export const autenticarUsuario = (req: Request, res: Response, next: NextFunction) => {
  const {authorization} = req.headers
  if (authorization) {
    return error(res, Auth.SinToken)
  }

  next()
}
