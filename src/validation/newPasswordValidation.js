import * as yup from 'yup';

const newPasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .required('El password es obligatorio')
    .min(6, 'Debe tener al menos 6 caracteres'),
  confirmation: yup
    .string()
    .required('Necesitas confirmar tu passwors')
    .oneOf([yup.ref('password'), null], 'Las claves deben coincidir'),
});

export default newPasswordFormSchema;
