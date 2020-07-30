import chai from 'chai'
import {Error} from '../../errors'

const {expect} = chai

export const assertError = (res: ChaiHttp.Response, err: Error) => {
  const {error} = res.body
  expect(error.codigo).to.equal(err.codigo)
  expect(error.mensaje).to.equal(err.mensaje)
}

export const assertErrors = (res: ChaiHttp.Response, err: any) => {
  const {errores} = res.body
  err.forEach((error: any) => {
    if (error.builder) {
      const {mensaje, codigo} = error.builder.message
      const cual = errores.find((e) => e.codigo === codigo)
      expect(cual.mensaje).to.eq(mensaje)
    }
  })
  expect(errores.length).to.eq(err.length)
}
