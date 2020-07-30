import faker from 'faker'
faker.locale = 'es'

export const crearProductor = () => ({
  nombre: faker.name.firstName(),
  apellido: faker.name.lastName(),
  dni: Array.from(Array(8))
    .map(() => faker.random.number(9))
    .join(''),
})
