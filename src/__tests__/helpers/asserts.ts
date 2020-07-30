import chai from 'chai'

const {expect} = chai

export const assertError = (res: ChaiHttp.Response, err: any) => {
  const {error} = res.body
  if (err.builder) {
    const {mensaje, codigo} = err.builder.message
    expect(error.codigo).to.equal(codigo)
    expect(error.mensaje).to.equal(mensaje)
  } else {
  }
}

export const assertErrors = (res: ChaiHttp.Response, err: any) => {
  const {errores} = res.body
  err.forEach((error: any) => {
    if (error.builder) {
      const {mensaje, codigo} = error.builder.message
      const cual = errores.find((e: any) => e.codigo === codigo)
      expect(cual.mensaje).to.eq(mensaje)
    }
  })
  expect(errores.length).to.eq(err.length)
}
