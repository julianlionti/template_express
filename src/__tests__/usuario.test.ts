import app from '../index'
import chai from 'chai'
import chaiHttp from 'chai-http'
import {assertErrors} from './helpers/asserts'
import ErrorUsuario from '../errors/Usuario'
import {limpiarBase, llenarbase, BaseProps} from './helpers/database'
import {crearUsuario} from './helpers/generadores'
import dictum from 'dictum.js'
import {doesNotMatch} from 'assert'

chai.use(chaiHttp)
const {expect, request} = chai
const nombre = 'usuario'
const ruta = `/api/${nombre}`

describe(nombre, () => {
  let fakeData: BaseProps

  beforeEach(async () => {
    await limpiarBase()
    fakeData = await llenarbase()
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
        const nuevoUsuario = crearUsuario()

        request(app)
          .post(`${ruta}/nuevo`)
          .send(nuevoUsuario)
          .end(async (_, res) => {
            const {usuario} = res.body
            const {nombre, apellido, usuario: login, dni} = usuario

            expect(nombre).to.eq(nuevoUsuario.nombre)
            expect(apellido).to.eq(nuevoUsuario.apellido)
            expect(login).to.eq(nuevoUsuario.usuario)
            expect(dni).to.eq(nuevoUsuario.dni)

            await dictum.chai(res, 'Crea un nuevo Usuario')
            done()
          })
      })
    })

    describe('mandando duplicado', () => {
      it('debería devolver error', async () => {
        const [usuarioDuplicado] = fakeData?.usuarios
        const limpio = (await usuarioDuplicado).toJSON()

        request(app)
          .post(`${ruta}/nuevo`)
          .send(limpio)
          .end((_, res) => {
            assertErrors(res, [ErrorUsuario.DniDuplicado, ErrorUsuario.UsuarioDuplicado])
          })
      })
    })
  })
})
