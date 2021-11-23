/* eslint-disable jsx-a11y/label-has-associated-control */
import * as yup from 'yup';
import React, { memo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import useHandleError from 'hooks/useHandleError';
import { updateProfile } from 'resources/user/user.api';
import { toastActions } from 'resources/toast/toast.slice';
import { userSelectors } from 'resources/user/user.slice';

import Input from 'components/Input';
import Button from 'components/Button';
import PhotoUpload from './components/PhotoUlpoad';

import styles from './styles.module.css';

const schema = yup.object().shape({
  email: yup.string().max(64).email('Email format is incorrect.').required('Field is required.'),
  password: yup.string().matches(/^$|^(?=.*[a-z])(?=.*\d)[A-Za-z\d\W]{6,}$/g, 'The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).'),
});

const Profile = () => {
  const handleError = useHandleError();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { email } = useSelector(userSelectors.selectUser);

  const {
    handleSubmit, formState: { errors }, setError, control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(async ({ password }) => {
    try {
      setLoading(true);

      await updateProfile({ password });

      dispatch(toastActions.success('Your password have been successfully updated.'));
    } catch (e) {
      handleError(e, setError);
    } finally {
      setLoading(false);
    }
  }, [handleError, setError, dispatch]);

  return (
    <div className={styles.uploadContainer}>
      <span>
        <h1 className={styles.heading}>Profile</h1>
        <PhotoUpload />
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            name="email"
            label="Email Address"
            defaultValue={email}
            control={control}
            error={errors.email}
            disabled
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Your password"
            control={control}
            error={errors.password}
          />
          <Button
            htmlType="submit"
            loading={loading}
          >
            Update Profile
          </Button>
        </form>
      </span>
    </div>
  );
};

export default memo(Profile);
