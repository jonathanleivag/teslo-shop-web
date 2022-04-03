import * as yup from 'yup'
import { TRegisterInputs } from '../pages/auth/register'

export const registerValidation: yup.SchemaOf<TRegisterInputs> = yup
  .object()
  .shape({
    name: yup.string().required('El nombre es requerido'),
    email: yup
      .string()
      .email('El email no es válido')
      .required('El email es requerido'),
    password: yup
      .string()
      .required('La contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    password0: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
      .required('La contraseña es requerida')
  })
  .required()
