import * as yup from 'yup';

const signUpFormValidation = yup.object().shape({
  name: yup.string().trim().required('Name is a required field'),
  email: yup.string().trim().required('Email is a required field'),
  password: yup.string().trim().required('Password is a required field'),
});

export default signUpFormValidation;
