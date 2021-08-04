import React from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import {
  ILogin,
  initialValues,
  IRegistration,
  loginSchema,
  registrationSchema
} from './FormValidation';
import useUser from '../../../hooks/useUser';

type FormProps = {
  login: boolean;
};

const RegisterForm: React.FC<FormProps> = ({ login }: FormProps) => {
  const history = useHistory();
  const { createUser, loginUser } = useUser();
  const formSchema = login ? loginSchema : registrationSchema;

  const submitRegistration = async (values: IRegistration) => {
    try {
      const user = await createUser(values);
      console.log(user);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const submitLogin = async (values: ILogin) => {
    try {
      const { email, password } = values;
      const authToken = await loginUser({ email, password });
      console.log(authToken);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  const submitForm = login ? submitLogin : submitRegistration;

  return (
    <>
      <Container component="article" maxWidth="xs">
        <Typography variant="h3" component="h1" align="center">
          Sign Up
        </Typography>
        <Formik
          validationSchema={formSchema}
          initialValues={initialValues}
          onSubmit={submitForm}
        >
          {({
            isSubmitting,
            errors,
            touched,
            values,
            handleChange,
            handleBlur
          }) => (
            <Form>
              {!login && (
                <TextField
                  id="name"
                  label="name"
                  name="name"
                  error={!!errors.name && touched.name}
                  helperText={touched.name ? errors.name : ''}
                  disabled={isSubmitting}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  fullWidth
                />
              )}
              <TextField
                id="email"
                label="email"
                name="email"
                error={!!errors.email && touched.email}
                helperText={touched.email ? errors.email : ''}
                disabled={isSubmitting}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                margin="normal"
                fullWidth
              />
              <TextField
                id="password"
                label="password"
                name="password"
                error={!!errors.password && touched.password}
                helperText={touched.password ? errors.password : ''}
                disabled={isSubmitting}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                margin="normal"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default RegisterForm;
