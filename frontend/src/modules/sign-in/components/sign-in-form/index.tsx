import { Formik, FormikHelpers } from 'formik';

import { Box, Button, Typography } from '@mui/material';
import { Alert, TextField } from './style';

import styles from '../../../common/scss/index.module.scss';
import { SignInFields } from 'modules/sign-in/types';
import signInFormValidation from 'modules/sign-in/validation';

import useSignIn from 'modules/sign-in/context/useSignIn';
import useNotification from 'modules/common/notifications/context/useNotification';

const SignInForm = () => {
  const { signIn } = useSignIn();
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
          Sign In
        </Typography>

        <Formik
          initialValues={
            {
              email: '',
              password: '',
            } as SignInFields
          }
          validationSchema={signInFormValidation}
          onSubmit={async (values: SignInFields) => {
            await signIn(values);
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
            <form noValidate onSubmit={handleSubmit}>
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
                sx={{ marginTop: 3 }}
                variant="contained"
                type="submit"
                size="large"
                className={styles.submitbtn}
                style={{
                  backgroundColor: '#FF3841',
                }}
                fullWidth
                disabled={isSubmitting}
              >
                Sign In
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default SignInForm;
