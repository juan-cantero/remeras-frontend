import * as yup from 'yup';

const productFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre del producto es obligatorio')
    .min(4, 'debe tener al menos 4 letras'),

  description: yup
    .string()
    .required('La descripcion producto es obligatoria')
    .min(4, 'debe tener al menos 4 letras'),
  category: yup.string().required('Debe elegir por lo menos una categoria'),
  unitPrice: yup
    .number()
    .required('para vender hay que poner un precio')
    .moreThan(0, 'El precio tiene que ser mayor a 0'),
  s: yup
    .number()
    .required('debe ingresar el stock')
    .moreThan(-1, 'No se puede poner stock negativo'),
  m: yup
    .number()
    .required('debe ingresar el stock')
    .moreThan(-1, 'No se puede poner stock negativo'),
  l: yup
    .number()
    .required('debe ingresar el stock')
    .moreThan(-1, 'No se puede poner stock negativo'),
  xl: yup
    .number()
    .required('debe ingresar el stock')
    .moreThan(-1, 'No se puede poner stock negativo'),
});

export default productFormSchema;
