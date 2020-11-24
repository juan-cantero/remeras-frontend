import * as yup from 'yup';

const registerFormSchema = yup.object().shape({
  name: yup.string().required('Necesitas ingresar tu nombre'),
  email: yup
    .string()
    .required('El email es obligatorio')
    .email('Tiene que ser un email valido'),
  password: yup
    .string()
    .required('El password es obligatorio')
    .min(6, 'Debe tener al menos 6 caracteres'),
  confirmPassword: yup
    .string()
    .required('Necesitas confirmar tu passwors')
    .oneOf([yup.ref('password'), null], 'Las claves deben coincidir'),
});

export default registerFormSchema;
