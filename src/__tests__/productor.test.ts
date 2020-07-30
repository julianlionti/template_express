import app from '../index'
import chai from 'chai'
import chaiHttp from 'chai-http'
import {assertErrors} from './helpers/asserts'
import Productor from '../errors/Productor'
import {limpiarBase} from './helpers/database'
import {productor} from './helpers/generadores'
import dictum from 'dictum.js'

chai.use(chaiHttp)
const {expect, request} = chai

describe('productor', () => {
  beforeEach(async () => {
    await limpiarBase()
  })

  describe('POST /api/productor', () => {
    describe('mandando mal los parametros', () => {
      it('debería devolver error', (done) => {
        request(app)
          .post('/api/productor/nuevo')
          .end((_, res) => {
            assertErrors(res, [Productor.SinApellido, Productor.SinNombre, Productor.SinDNI])
            done()
          })
      })
    })

    describe('mandando bien los parametros', () => {
      it('debería devolver el prodcutor', (done) => {
        request(app)
          .post('/api/productor/nuevo')
          .send(productor)
          .end((_, res) => {
            dictum.chai(res, 'Crea un nuevo productor')
            done()
          })
      })
    })
  })
})
