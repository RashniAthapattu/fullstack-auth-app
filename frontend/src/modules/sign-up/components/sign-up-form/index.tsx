import { Form, Formik, FormikHelpers } from 'formik';
import { Box, Button, Typography } from '@mui/material';
import { Alert, TextField } from './style';

import { SignUpFields } from 'modules/sign-up/types';
import styles from '../../../common/scss/index.module.scss';
import signUpFormValidation from 'modules/sign-up/validations';

import useSignUp from 'modules/sign-up/context/useSignUp';
import useNotification from 'modules/common/notifications/context/useNotification';

const SignUpForm = () => {
  const { signUp } = useSignUp();
  const { isEnabled, message, type } = useNotification();

  return (
    <>
      <Box className={styles.cardBg}>
        <Typography
          className={styles.heading}
          component="h3"
          variant="h4"
          align="center"
          gutterBottom
        >
          Sign Up
        </Typography>
        <Formik
          initialValues={
            {
              name: '',
              email: '',
              password: '',
            } as SignUpFields
          }
          validationSchema={signUpFormValidation}
          onSubmit={async (values: SignUpFields) => {
            await signUp(values);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <TextField
                className={styles.textFields}
                type="name"
                name="name"
                value={values.name}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
                label="Name"
              />
              <TextField
                className={styles.textFields}
                type="email"
                name="email"
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
                label="Email"
              />
              <TextField
                className={styles.textFields}
                type="password"
                name="password"
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                fullWidth
                label="Password"
                my={2}
              />

              {isEnabled && (
                <Alert mt={2} mb={3} severity={type}>
                  {message}
                </Alert>
              )}

              <Button
                className={styles.submitbtn}
                style={{
                  width: '15rem',
                  fontWeight: 'bold',
                  borderRadius: '0',
                  border: 'none',
                  marginTop: '20px',
                  backgroundColor: '#FF3841',
                }}
                size="lg"
                type="submit"
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default SignUpForm;
