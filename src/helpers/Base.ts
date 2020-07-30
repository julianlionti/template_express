import {errorPresent} from './errors'
import {NextFunction, Request, Response} from 'express'

type ErrorHandlerProps = (req: Request, res: Response, next: NextFunction) => void
const execute = (fx: ErrorHandlerProps) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const error = errorPresent(req, res)
    if (error) return error
    await fx(req, res, next)
  } catch (error) {
    res.status(500).json({mensaje: error.message, code: 500})
    next(error)
  }
}

export default {
  execute,
}
