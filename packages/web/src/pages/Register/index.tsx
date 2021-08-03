import React from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import registrationSchema, {
  initialValues,
  IRegistration
} from './FormValidation';
import useUser from '../../hooks/useUser';

const RegisterForm: React.FC = () => {
  const history = useHistory();
  const { createUser } = useUser();
  const submitForm = async (values: IRegistration) => {
    try {
      const user = await createUser(values);
      console.log(user);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container component="article" maxWidth="xs">
        <Typography variant="h3" component="h1" align="center">
          Sign Up
        </Typography>
        <Formik
          validationSchema={registrationSchema}
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
