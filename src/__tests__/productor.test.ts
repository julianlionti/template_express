import app from '../index'
import chai from 'chai'
import chaiHttp from 'chai-http'
import {assertErrors, assertError} from './helpers/asserts'
import ErrorProductor from '../errors/Productor'
import Productor, {ProductorProps} from '../model/Productor'
import {limpiarBase} from './helpers/database'
import {crearProductor} from './helpers/generadores'
import dictum from 'dictum.js'

chai.use(chaiHttp)
const {request} = chai

let fakeData: {Productor: ProductorProps[]} = {Productor: []}

describe('productor', () => {
  beforeEach(async () => {
    await limpiarBase()

    fakeData.Productor = [crearProductor(), crearProductor()]
    fakeData.Productor.map((e) => Productor.create(e))
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
      it('debería devolver error', (done) => {
        request(app)
          .post('/api/productor/nuevo')
          .send({...crearProductor(), dni: fakeData.Productor[0].dni})
          .end((_, res) => {
            assertError(res, ErrorProductor.DniDuplicado)
            done()
          })
      })
    })
  })
})
