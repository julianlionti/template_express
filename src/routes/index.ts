import express, {Router} from 'express'
import productor from './productor'

export default () => {
  const router = Router()
  router.use((req, _, next) => {
    const {method, path, params} = req
    console.log('API', method, path, Object.keys(params).length > 0 ? params : '')
    next()
  })

  router.use('/productor', productor())
  router.use('/docs', express.static('docs'))

  return router
}
