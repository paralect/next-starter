import React, { memo, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

import { path } from 'pages/routes';

import { forgotPassword } from 'resources/user/user.api';

import Input from 'components/Input';
import Button from 'components/Button';
import useHandleError from 'hooks/useHandleError';
import Link from 'components/Link';

import Head from 'next/head';
import styles from './styles.module.css';

const schema = yup.object().shape({
  email: yup.string().max(64).email('Email format is incorrect.').required('Field is required.'),
});

const ForgotPassword = () => {
  const handleError = useHandleError();

  const [values, setValues] = React.useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const {
    handleSubmit, formState: { errors }, control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(async (data) => {
    try {
      setValues(data);
      setLoading(true);

      await forgotPassword(data);

      setSubmitted(true);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  }, [handleError]);
  // submitted case
  return (
    <>
      <Head>
        <title>Forgot password</title>
      </Head>
      <div className={styles.container}>
        <h2>Forgot Password</h2>
        <p className={styles.subheading}>We’ll send a reset link to your email.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            type="email"
            label="Email address"
            placeholder="Your email address"
            control={control}
            error={errors.email}
          />
          <Button
            htmlType="submit"
            loading={loading}
            className={styles.button}
          >
            Send reset link
          </Button>
        </form>
        <div className={styles.description}>
          Have an account?
          <Link
            type="router"
            href={path.signIn}
            className={styles.signInLink}
          >
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default memo(ForgotPassword);
