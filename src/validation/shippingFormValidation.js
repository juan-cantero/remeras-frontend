import * as yup from 'yup';

const shippingFormSchema = yup.object().shape({
  address: yup
    .string()
    .required('Necesitamos la direccion para enviarte el producto'),
  city: yup
    .string()
    .required(
      'Necesitamos saber en que ciudad vivis para enviarte el producto'
    ),
  locality: yup.string().required('La localidad es obligatoria'),
  postalCode: yup.string().required('El codigo postal es obligatorio'),
});

export default shippingFormSchema;
