import {Types, crear} from './index'

let codigo = Types.auth
const agregar = <T>(que: T): T => {
  codigo += 1
  return que
}

export default {
  SinToken: agregar(crear({mensaje: 'No se pasó ningún token', codigo})),
}
