import { Formik } from 'formik';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ConditionalError from '../components/ui-layout/ConditionalError';
import FormContainer from '../components/ui-layout/FormContainer';
import Message from '../components/ui-layout/Message';
import isEmptyObject from '../helpers/object/isEmptyObject';
import { setNewPassword } from '../state/user/actions';
import newPasswordFormSchema from '../validation/newPasswordValidation';

const NewPasswordScreen = () => {
  const dispatch = useDispatch();
  const { resetLink } = useParams();
  const { error, success } = useSelector((state) => state.setNewPassword);

  return (
    <Formik
      initialValues={{
        password: '',
        confirmation: '',
      }}
      validationSchema={newPasswordFormSchema}
      onSubmit={(values) => {
        dispatch(setNewPassword(values.password, resetLink));
      }}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        touched,
        handleBlur,
        errors,
      }) => {
        return (
          <FormContainer>
            <h1>Cambiar mi Password</h1>
            <Form onSubmit={handleSubmit}>
              {error && <Message variant="error">{error}</Message>}
              {success && (
                <Message variant="success">
                  Tu password ha sido cambiado con exito
                </Message>
              )}
              <FormGroup controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Ingresa tu nuevo password"
                  value={values.password}
                  onBlur={handleBlur}
                  name="password"
                  isValid={touched.password && !errors.password}
                  onChange={handleChange}
                />
                <ConditionalError
                  errors={errors}
                  errorProp="password"
                  isTouched={touched.password}
                />
              </FormGroup>
              <FormGroup controlId="confirmation">
                <FormLabel>Repite tu password</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Ingresa tu nuevo password"
                  onBlur={handleBlur}
                  value={values.confirmation}
                  name="confirmation"
                  isValid={touched.confirmation && !errors.confirmation}
                  onChange={handleChange}
                />
                <ConditionalError
                  errors={errors}
                  errorProp="confirmation"
                  isTouched={touched.confirmation}
                />
              </FormGroup>

              <Button
                type="submit"
                variant="primary"
                disabled={!isEmptyObject(errors)}
              >
                Resetear Password
              </Button>
            </Form>
          </FormContainer>
        );
      }}
    </Formik>
  );
};

export default NewPasswordScreen;
