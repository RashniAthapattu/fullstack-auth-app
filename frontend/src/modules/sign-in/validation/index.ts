import * as yup from 'yup';

const signInFormValidation = yup.object().shape({
  email: yup.string().trim().required('Email is a required field'),
  password: yup.string().trim().required('Password is a required field'),
});

export default signInFormValidation;
