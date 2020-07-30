import app from '../index'
import chai from 'chai'
import chaiHttp from 'chai-http'
import {assertErrors, assertError} from './helpers/asserts'
import ErrorUsuario from '../errors/Usuario'
import ApiUsuario from '../api/Usuario'
import Usuario, {UsuarioProps} from '../model/Usuario'
import {limpiarBase} from './helpers/database'
import {crearProductor, crearUsuario} from './helpers/generadores'
import dictum from 'dictum.js'

chai.use(chaiHttp)
const {expect, request} = chai
const nombre = 'usuario'
const ruta = `/api/${nombre}`

let fakeData: {Usuario: UsuarioProps[]} = {Usuario: []}

describe(nombre, () => {
  beforeEach(async () => {
    await limpiarBase()
  })

  describe(`POST ${ruta}`, () => {
    describe('sin mandar parametros', () => {
      it('debería devolver error', (done) => {
        request(app)
          .post(`${ruta}/nuevo`)
          .end((_, res) => {
            assertErrors(res, [
              ErrorUsuario.SinApellido,
              ErrorUsuario.SinDNI,
              ErrorUsuario.SinNombre,
              ErrorUsuario.SinUsuario,
            ])
            done()
          })
      })
    })

    describe('mandando bien los parametros', () => {
      it('debería devolver error', (done) => {
        request(app)
          .post(`${ruta}/nuevo`)
          .send(crearUsuario())
          .end(async (_, res) => {
            await dictum.chai(res, 'Crea un nuevo Usuario')
            done()
          })
      })
    })
  })
})
