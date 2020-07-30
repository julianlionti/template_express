import {body, check} from 'express-validator'

export enum Types {
  auth = 300,
  productor = 400,
}

export interface Error {
  mensaje: string
  codigo: number
}

export const crearBody = (id: string, codigo: number) =>
  body(id, {mensaje: `El campo '${id}' es obligatorio.`, codigo})

export const crearCheck = (id: string, mensaje: string, codigo: number) =>
  check(id, {mensaje, codigo})

export const crear = ({mensaje, codigo}: Error): Error => ({mensaje, codigo})
