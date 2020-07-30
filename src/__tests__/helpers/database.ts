import Productor from '../../model/Productor'

export const limpiarBase = async () => {
  await Productor.deleteMany({})
}
