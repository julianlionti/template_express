import {Types, crearBody, crearCheck} from './index'

let codigo = Types.auth
const agregar = <T>(que: T): T => {
  codigo += 1
  return que
}

export default {
  SinNombre: agregar(crearBody('nombre', codigo).exists()),
  SinApellido: agregar(crearBody('apellido', codigo).exists()),
  SinDNI: agregar(crearBody('dni', codigo).exists()),
  SinUsuario: agregar(crearBody('usuario', codigo).exists()),
  UsuarioDuplicado: agregar(crearCheck('dni', 'El Dni está duplicado', codigo)),
  DniDuplicado: agregar(crearCheck('usuario', 'El Usuario está duplicado', codigo)),
}
