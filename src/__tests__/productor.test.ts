import app from '../index'
import chai from 'chai'
import chaiHttp from 'chai-http'
import {assertErrors, assertError} from './helpers/asserts'
import ErrorProductor from '../errors/Productor'
import {limpiarBase, llenarbase, BaseProps} from './helpers/database'
import {crearProductor} from './helpers/generadores'
import dictum from 'dictum.js'

chai.use(chaiHttp)
const {request} = chai

describe('productor', () => {
  let fakeData: BaseProps

  beforeEach(async () => {
    await limpiarBase()
    fakeData = await llenarbase()
  })

  describe('POST /api/productor', () => {
    describe('sin mandar parametros', () => {
      it('debería devolver error', (done) => {
        request(app)
          .post('/api/productor/nuevo')
          .end((_, res) => {
            assertErrors(res, [
              ErrorProductor.SinApellido,
              ErrorProductor.SinNombre,
              ErrorProductor.SinDNI,
            ])
            done()
          })
      })
    })

    describe('mandando bien los parametros', () => {
      it('debería devolver el prodcutor', (done) => {
        request(app)
          .post('/api/productor/nuevo')
          .send(crearProductor())
          .end(async (_, res) => {
            await dictum.chai(res, 'Crea un nuevo productor')
            done()
          })
      })
    })

    describe('mandando duplicado dni', () => {
      it('debería devolver error', async () => {
        const [prodDup] = fakeData.productores
        const {dni} = (await prodDup).toJSON()
        request(app)
          .post('/api/productor/nuevo')
          .send({...crearProductor(), dni})
          .end((_, res) => {
            assertError(res, ErrorProductor.DniDuplicado)
          })
      })
    })
  })
})
