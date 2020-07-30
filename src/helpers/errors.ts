import {validationResult} from 'express-validator'
import {Response, Request} from 'express'

export const error = (res: Response, error: any, statusCode = 400) => {
  return res.status(statusCode).json({error})
}

export const errorPresent = (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return null
  }

  const arr = errors.array().map((e) => ({...e.msg}))
  if (arr.length === 1) {
    const [primero] = arr
    return error(res, primero)
  }
  return res.status(400).json({errores: arr})
}
