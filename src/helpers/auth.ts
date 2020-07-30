import {error} from './errors'
import Auth from '../errors/Auth'
import {Request, Response, NextFunction} from 'express'

export const autenticarProductor = (req: Request, res: Response, next: NextFunction) => {
  const {authorization} = req.headers
  if (authorization) {
    return error(res, Auth.SinToken)
  }

  next()
}
