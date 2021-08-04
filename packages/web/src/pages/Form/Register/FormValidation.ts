import * as yup from 'yup';

export const registrationSchema = yup.object({
  name: yup.string().required('A name is required!'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'password must contain at least 6 characters')
});

export type IRegistration = yup.InferType<typeof registrationSchema>;

export const loginSchema = yup.object({
  name: yup.string(),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'password must contain at least 6 characters')
});

export type ILogin = yup.InferType<typeof loginSchema>;

export const initialValues = {
  name: '',
  email: '',
  password: ''
};
